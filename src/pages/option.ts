import { IEndTypeOption } from "./interface";
import { EWind, EEndType } from "./enum";

export const OWind = [
    { label: '東', value: EWind.EAST },
    { label: '南', value: EWind.SOUTH },
    { label: '西', value: EWind.WEST },
    { label: '北', value: EWind.NORTH }
];

export const OEndType: IEndTypeOption[] = [
    { label: '胡', value: EEndType.WINNING },
    { label: '摸', value: EEndType.SELF_DRAWN },
    { label: '流', value: EEndType.DRAW },
    { label: '詐', value: EEndType.FAKE }
];