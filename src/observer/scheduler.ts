import type Watcher from './Watcher';

let queue: Watcher[] = [];
let watcherIdsInQueue: Record<string, boolean> = {};

export function queueWatcher(watcher: Watcher) {
  if (watcher.id in watcherIdsInQueue) {
    return;
  }

  queue.push(watcher);
  watcherIdsInQueue[watcher.id] = true;

  runNext(flushSchedulerQueue);
}

export function runNext(cb: () => void) {
  // 일단 두 가지 경우만 대응
  if (typeof Promise !== undefined) {
    Promise.resolve().then(cb);
  } else {
    setTimeout(cb, 0);
  }
}

export function flushSchedulerQueue() {
  for (const watcher of queue) {
    watcher.run();
  }

  queue = [];
  watcherIdsInQueue = {};
}
