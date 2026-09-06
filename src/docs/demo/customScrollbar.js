const MIN_THUMB_HEIGHT = 40;
const TRACK_PADDING = 2;
const instances = new Map();

export function setupCustomScrollbars() {
  setupScrollbarInstance({
    id: "sidebar",
    scroller: document.querySelector(".sidebar-scroll"),
    track: document.querySelector(".custom-scrollbar--sidebar"),
    thumb: document.querySelector(".custom-scrollbar--sidebar .custom-scrollbar-thumb"),
    observe: [
      document.querySelector(".sidebar-scroll"),
      document.querySelector("#primary-nav"),
    ],
  });

  setupScrollbarInstance({
    id: "workspace",
    scroller: document.documentElement,
    track: document.querySelector(".custom-scrollbar--workspace"),
    thumb: document.querySelector(".custom-scrollbar--workspace .custom-scrollbar-thumb"),
    useWindow: true,
    observe: [document.querySelector("#content")],
  });
}

export function updateCustomScrollbars() {
  instances.forEach((instance) => updateScrollbar(instance));
}

function setupScrollbarInstance({ id, scroller, track, thumb, useWindow = false, observe = [] }) {
  if (!scroller || !thumb) return;

  const existing = instances.get(id);
  if (existing) {
    updateScrollbar(existing);
    return;
  }

  const instance = { id, scroller, track, thumb, useWindow };
  instances.set(id, instance);

  const onScroll = () => updateScrollbar(instance);
  const scrollTarget = useWindow ? window : scroller;
  scrollTarget.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  if (typeof ResizeObserver !== "undefined") {
    const observer = new ResizeObserver(onScroll);
    observe.filter(Boolean).forEach((node) => observer.observe(node));
    if (useWindow) observer.observe(document.body);
  }

  thumb.addEventListener("mousedown", (event) => startThumbDrag(event, instance));
  updateScrollbar(instance);
}

function getScrollMetrics(instance) {
  if (instance.useWindow) {
    return {
      scrollTop: window.scrollY,
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: window.innerHeight,
    };
  }

  const { scroller } = instance;
  return {
    scrollTop: scroller.scrollTop,
    scrollHeight: scroller.scrollHeight,
    clientHeight: scroller.clientHeight,
  };
}

function setScrollTop(instance, value) {
  if (instance.useWindow) {
    window.scrollTo({ top: value });
    return;
  }

  instance.scroller.scrollTop = value;
}

function updateScrollbar(instance) {
  const { thumb, track } = instance;
  const { scrollTop, scrollHeight, clientHeight } = getScrollMetrics(instance);
  const trackHeight = track?.clientHeight || clientHeight;
  const usableTrackHeight = Math.max(trackHeight - TRACK_PADDING * 2, 0);
  const scrollable = scrollHeight > clientHeight + 1;
  const thumbHeight = scrollable
    ? Math.max(MIN_THUMB_HEIGHT, (clientHeight / scrollHeight) * usableTrackHeight)
    : usableTrackHeight;
  const maxTop = Math.max(usableTrackHeight - thumbHeight, 0);
  const top = scrollable
    ? TRACK_PADDING + (scrollTop / (scrollHeight - clientHeight)) * maxTop
    : TRACK_PADDING;

  thumb.style.height = `${thumbHeight}px`;
  thumb.style.transform = `translateY(${top}px)`;
}

function startThumbDrag(event, instance) {
  event.preventDefault();

  const startY = event.clientY;
  const { scrollTop, scrollHeight, clientHeight } = getScrollMetrics(instance);
  const trackHeight = instance.track?.clientHeight || clientHeight;
  const usableTrackHeight = Math.max(trackHeight - TRACK_PADDING * 2, 0);
  const thumbHeight = instance.thumb.getBoundingClientRect().height;
  const maxScroll = scrollHeight - clientHeight;
  const maxThumbTravel = usableTrackHeight - thumbHeight;
  const startThumbTop = TRACK_PADDING + (scrollTop / maxScroll) * maxThumbTravel;

  const onMove = (moveEvent) => {
    if (maxThumbTravel <= 0 || maxScroll <= 0) return;
    const delta = moveEvent.clientY - startY;
    const nextThumbTop = Math.min(
      Math.max(startThumbTop + delta, TRACK_PADDING),
      TRACK_PADDING + maxThumbTravel
    );
    const scrollRatio = (nextThumbTop - TRACK_PADDING) / maxThumbTravel;
    setScrollTop(instance, scrollRatio * maxScroll);
  };

  const onUp = () => {
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onUp);
  };

  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);
}
