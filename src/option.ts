import { IRadioOption } from "./interface";
import { EWind } from "./enum";

export const windOptions: IRadioOption[] = [
    { label: '東', value: EWind.EAST },
    { label: '南', value: EWind.SOUTH },
    { label: '西', value: EWind.WEST },
    { label: '北', value: EWind.NORTH }
];