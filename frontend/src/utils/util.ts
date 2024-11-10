export const getDebounceFunc = (): ((
  func: () => void,
  time?: number
) => void) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (func: () => void, time: number = 200): void => {
    clearTimeout(timeout);
    timeout = setTimeout(func, time);
  };
};

export const getThrottlingFunc = (): ((
  func: () => void,
  time?: number
) => void) => {
  let isThrottling = false;

  return (func: () => void, time: number = 200): void => {
    if (isThrottling) return;
    isThrottling = true;
    func();

    setTimeout(() => {
      isThrottling = false;
    }, time);
  };
};

export const getUniqueId = (idLength: number = 15): string => {
  const timeDigitsToKeep = Math.floor(idLength / 2);

  return (
    Date.now()
      .toString(16)
      .slice(-1 * timeDigitsToKeep) +
    parseInt((Math.random() * 9999999999).toString()).toString(16)
  ).slice(0, idLength);
};

export function sleep(time: number = 1000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export function formatTime(seconds: number): string {
  seconds = parseInt(seconds + "") || 0;

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const hrsDisplay = hrs > 0 ? `${hrs}:` : "";
  const minsDisplay = `${hrs > 0 && mins < 10 ? "0" : ""}${mins}:`;
  const secsDisplay = `${secs < 10 ? "0" : ""}${secs}`;

  return `${hrsDisplay}${minsDisplay}${secsDisplay}`;
}
