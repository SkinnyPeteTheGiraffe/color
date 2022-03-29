/**
 * Normalizes values into a percent allowing for use of both `[0,1]` and `(1,100]`,
 * converted the value if needed to fit within the `[0,1]` domain. Has an optional
 * parameter that allows for negative values increasing the domain by adding
 * ranges `[-100,-1)` and `[-1,0]`
 *
 * @remarks This currently does not support [0,100] as it intersects with [0,1)
 *
 * @example ```ts
 * console.log(normalizePercent(0.75))          // 0.75
 * console.log(normalizePercent(75))            // 0.75
 * console.log(normalizePercent(-75))           // 0
 * console.log(normalizePercent(-0.75), false)  // 0
 * console.log(normalizePercent(-75), true)     // -0.75
 * console.log(normalizePercent(-0.75), true)   // -0.75
 * ```
 *
 * @param percent the percent value to be normalized
 * @param allowNegatives will allow negative results if `true`, otherwise will return 0 for negative value if `false`; default is `false`
 *
 * @return {number} the normalized value within the range of `[0,1]` or `[-1,0]` if `allowNegatives` is `true`
 */
const normalizePercent = (percent: number, allowNegatives = false): number => {
    if (percent >= 0 && percent <= 1) {
        return percent;
    }
    if (allowNegatives && percent < 0 && percent >= -1) {
        return percent;
    }
    if (allowNegatives) {
        return Math.max(Math.min(percent, 100), -100) / 100;
    }
    return Math.max(Math.min(percent, 100), 0) / 100;
};

export default normalizePercent;
