import { ModelType } from '../base';
import HSVSpace from '../hsv/hsv-space';
import HWBSpace from '../hwb/hwb-space';
import RGBASpace from '../rgba/rgba-space';
import { HSLSpace } from '../hsl';

type KeyedSpace<
    T extends ModelType,
    H = null,
    W = null,
    L = null,
    R = null
> = T extends 'hsv'
    ? H extends null
        ? HSVSpace
        : H
    : T extends 'hwb'
    ? W extends null
        ? HWBSpace
        : W
    : T extends 'hsl'
    ? L extends null
        ? HSLSpace
        : L
    : T extends 'rgb'
    ? R extends null
        ? RGBASpace
        : R
    : null;

export default KeyedSpace;
