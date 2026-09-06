const SWAP_SECONDS = 1 / 60;
function prepareVideo(video) {
    video.muted = true;
    video.playsInline = true;
    video.loop = false;
    video.preload = "auto";
    video.disablePictureInPicture = true;
    video.setAttribute("playsinline", "");
}
function playVideo(video) {
    const attempt = video.play();
    if (attempt?.catch) {
        attempt.catch(() => {
            // Autoplay can be blocked until the document has user interaction.
        });
    }
}
function seekVideo(video, time) {
    if (typeof video.fastSeek === "function") {
        video.fastSeek(time);
        return;
    }
    video.currentTime = time;
}
export function setupSeamlessVideoLoop(primaryVideo, { container = primaryVideo.parentElement, readyKey = "seamlessVideoReady", activeClass = "seamless-video--active", standbyClass = "seamless-video--standby", deferPlayback = false, } = {}) {
    if (!container || container.dataset[readyKey] === "true") {
        return {
            getActive: () => primaryVideo,
            destroy() { },
        };
    }
    container.dataset[readyKey] = "true";
    const secondaryVideo = primaryVideo.cloneNode(true);
    secondaryVideo.removeAttribute("autoplay");
    secondaryVideo.removeAttribute("data-home-hero-grid-video");
    container.appendChild(secondaryVideo);
    prepareVideo(primaryVideo);
    prepareVideo(secondaryVideo);
    let active = primaryVideo;
    let standby = secondaryVideo;
    let swapping = false;
    let activeWatchId = null;
    primaryVideo.classList.add(activeClass);
    secondaryVideo.classList.add(standbyClass);
    function resetStandby() {
        standby.pause();
        seekVideo(standby, 0);
    }
    function swapVideos() {
        if (swapping)
            return;
        swapping = true;
        playVideo(standby);
        standby.classList.replace(standbyClass, activeClass);
        active.classList.replace(activeClass, standbyClass);
        active.pause();
        seekVideo(active, 0);
        const previousActive = active;
        active = standby;
        standby = previousActive;
        swapping = false;
        startActiveWatch();
    }
    function handleFrame() {
        if (swapping)
            return;
        if (!Number.isFinite(active.duration) || active.duration <= 0)
            return;
        if (active.duration - active.currentTime <= SWAP_SECONDS) {
            swapVideos();
        }
    }
    function startActiveWatch() {
        if (activeWatchId !== null && active.cancelVideoFrameCallback) {
            active.cancelVideoFrameCallback(activeWatchId);
            activeWatchId = null;
        }
        if (!active.requestVideoFrameCallback)
            return;
        const onFrame = () => {
            handleFrame();
            if (active.requestVideoFrameCallback) {
                activeWatchId = active.requestVideoFrameCallback(onFrame);
            }
        };
        activeWatchId = active.requestVideoFrameCallback(onFrame);
    }
    function onTimeUpdate() {
        handleFrame();
    }
    function beginPlayback(video) {
        seekVideo(video, 0);
        playVideo(video);
    }
    const videos = [primaryVideo, secondaryVideo];
    videos.forEach((video) => {
        video.addEventListener("timeupdate", onTimeUpdate);
        video.addEventListener("loadeddata", () => {
            if (video === active && video.paused && !deferPlayback) {
                beginPlayback(video);
            }
        });
        video.addEventListener("ended", () => {
            if (video === active) {
                swapVideos();
            }
        });
    });
    resetStandby();
    if (!deferPlayback) {
        beginPlayback(active);
        startActiveWatch();
    }
    return {
        getActive: () => active,
        start() {
            if (active.paused) {
                resetStandby();
                beginPlayback(active);
                startActiveWatch();
            }
        },
        destroy() {
            videos.forEach((video) => {
                video.removeEventListener("timeupdate", onTimeUpdate);
                video.pause();
            });
            if (activeWatchId !== null && active.cancelVideoFrameCallback) {
                active.cancelVideoFrameCallback(activeWatchId);
            }
            if (secondaryVideo.parentElement === container) {
                secondaryVideo.remove();
            }
            primaryVideo.classList.remove(activeClass, standbyClass);
            delete container.dataset[readyKey];
        },
    };
}
