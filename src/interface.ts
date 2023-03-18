import { EWind, EEndType } from "./enum";

export interface IRadioOption {
    label: string;
    value: EWind
};

export interface IRecordForm {
    endType: EEndType;
    winner: EWind;
    loser: any;
    point: number;
    dealer: EWind;
    dealerCount: number;
    circle: EWind;
}