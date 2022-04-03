import colors from '../../colors';
import HWBColorSpace from './types/hwb-color-space';
import rgbaConverter from '../utils/converter/rgba-converter';
import hexConverter from '../utils/converter/hex-converter';
import { ExtendedHWBSpace } from '../extensions';

export const fromHex = (hex: string): ExtendedHWBSpace =>
    new ExtendedHWBSpace(rgbaConverter.toHWB(hexConverter.toRGBA(hex)));

export const fromCssColor = (color: keyof typeof colors): ExtendedHWBSpace =>
    fromHex(colors[color]);

export const fromHWB = (
    hue: number,
    whiteness: number,
    blackness: number
): ExtendedHWBSpace => new ExtendedHWBSpace({ hue, whiteness, blackness });

export const fromHWBColorSpace = (space: HWBColorSpace): ExtendedHWBSpace =>
    new ExtendedHWBSpace(space);
