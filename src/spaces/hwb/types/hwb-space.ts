import { HueColorSpace } from '../../base';

export default interface HWBColorSpace extends HueColorSpace {
    whiteness: number;
    blackness: number;
}
