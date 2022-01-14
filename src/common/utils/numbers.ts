export const normalizePercent = (
    percent: number,
    allowNegatives = false
): number =>
    percent >= 0 && percent <= 1
        ? percent
        : allowNegatives && percent < 0 && percent >= -1
        ? percent
        : allowNegatives
        ? Math.max(Math.min(percent, 100), -100) / 100
        : Math.max(Math.min(percent, 100), 0) / 100;
