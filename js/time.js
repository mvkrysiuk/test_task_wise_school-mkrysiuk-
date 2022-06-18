const MS_DAY = 86400000;
const MS_HOUR = 3600000;
const MS_MINUTE = 60000;

export function calculateTimeDiff(firstDate, secondDate) {
    let startTime = new Date(firstDate);
    let finishTime = new Date(secondDate);

    return finishTime - startTime;
}

export function renderTime(ms) {
    if (ms < 0) ms = -ms;
    const time = {
      d: Math.floor(ms / MS_DAY),
      h: Math.floor(ms / MS_HOUR) % 24,
      m: Math.floor(ms / MS_MINUTE) % 60
    };
    return Object.entries(time)
      .filter(val => val[1] !== 0)
      .map(val => val[1] + val[0])
      .join(' ');
}

export function calculateSpeed(distance, time) {
    return distance / (time / MS_HOUR);
}

export function renderSpeed(speed) {
    return speed.toFixed(1) + " km/hour";
}