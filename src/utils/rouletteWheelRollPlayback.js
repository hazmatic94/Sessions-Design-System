let sharedAudioContext = null;
let cachedRollBuffer = null;
let cachedRollUrl = null;

function getAudioContext() {
  if (typeof window === "undefined") {
    return null;
  }

  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor) {
    return null;
  }

  if (!sharedAudioContext) {
    sharedAudioContext = new AudioContextCtor();
  }

  return sharedAudioContext;
}

async function loadAudioBuffer(url) {
  const context = getAudioContext();
  if (!context) {
    return null;
  }

  if (cachedRollBuffer && cachedRollUrl === url) {
    return cachedRollBuffer;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to load roulette roll sound: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  cachedRollBuffer = await context.decodeAudioData(arrayBuffer);
  cachedRollUrl = url;
  return cachedRollBuffer;
}

function sliceBuffer(context, buffer, startSample, endSample) {
  const length = endSample - startSample;
  const sliced = context.createBuffer(buffer.numberOfChannels, length, buffer.sampleRate);

  for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
    const input = buffer.getChannelData(channel);
    const output = sliced.getChannelData(channel);
    for (let index = 0; index < length; index += 1) {
      output[index] = input[startSample + index];
    }
  }

  return sliced;
}

function reverseBuffer(context, buffer) {
  const reversed = context.createBuffer(buffer.numberOfChannels, buffer.length, buffer.sampleRate);

  for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
    const input = buffer.getChannelData(channel);
    const output = reversed.getChannelData(channel);
    for (let index = 0; index < buffer.length; index += 1) {
      output[index] = input[buffer.length - 1 - index];
    }
  }

  return reversed;
}

function playBuffer(context, buffer) {
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start();
  return source;
}

function createRollHalves(context, buffer) {
  const midpoint = Math.floor(buffer.length / 2);
  const firstHalf = sliceBuffer(context, buffer, 0, midpoint);
  const reversedSecondHalf = reverseBuffer(context, sliceBuffer(context, buffer, midpoint, buffer.length));
  return { firstHalf, reversedSecondHalf };
}

/**
 * Loop roll audio as first half forward, then second half reversed, until `stop()` is called.
 * @returns {Promise<(() => void) | null>}
 */
export async function startRouletteRollPingPong(url) {
  const context = getAudioContext();
  if (!context) {
    return null;
  }

  await context.resume().catch(() => {});

  let buffer;
  try {
    buffer = await loadAudioBuffer(url);
  } catch {
    return null;
  }

  if (!buffer) {
    return null;
  }

  const { firstHalf, reversedSecondHalf } = createRollHalves(context, buffer);
  let stopped = false;
  let activeSource = null;

  const stop = () => {
    stopped = true;
    if (activeSource) {
      try {
        activeSource.stop();
      } catch {
        // Already stopped.
      }
      activeSource.disconnect();
      activeSource = null;
    }
  };

  const playForwardThenReversed = () => {
    if (stopped) {
      return;
    }

    activeSource = playBuffer(context, firstHalf);
    activeSource.onended = () => {
      activeSource = null;
      if (stopped) {
        return;
      }

      activeSource = playBuffer(context, reversedSecondHalf);
      activeSource.onended = () => {
        activeSource = null;
        playForwardThenReversed();
      };
    };
  };

  playForwardThenReversed();
  return stop;
}
