import { normalizePercent } from '../../common';
import { HSVColorSpace } from './types';

export const adjustHsvRelativeValue = (
    space: HSVColorSpace,
    key: keyof Omit<HSVColorSpace, 'hue'>,
    ratio: number,
    increase: boolean
): HSVColorSpace => {
    const adjusted = { ...space };
    const normalized = normalizePercent(ratio, true);
    adjusted[key] += Math.round(
        adjusted[key] * normalized * (increase ? 1 : -1)
    );
    /* istanbul ignore next */ // Can't get this to trigger
    if (adjusted[key] < 0) adjusted[key] = 0;
    if (adjusted[key] > 100) adjusted[key] = 100;
    return adjusted;
};
