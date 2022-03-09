const normalizePercent = (
    percent: number,
    allowNegatives = false
): number => {
    if (percent >= 0 && percent <= 1) {
        return percent
    }
        if (allowNegatives && percent < 0 && percent >= -1) {
            return percent
        } if(allowNegatives) {
            return Math.max(Math.min(percent, 100), -100) / 100
        }
        return Math.max(Math.min(percent, 100), 0) / 100;
};

export default normalizePercent
