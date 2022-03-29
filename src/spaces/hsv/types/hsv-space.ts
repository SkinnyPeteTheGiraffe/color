import { HueColorSpace } from '../../base';

export default interface HSVColorSpace extends HueColorSpace {
    saturation: number;
    value: number;
}
