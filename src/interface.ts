import { EWind, EEndType } from "./enum";

export interface IRadioOption {
    label: string;
    value: EWind
};

export interface IRecordForm {
    endType: EEndType;
    winner: number;
    loser: any;
    point: number;
    dealer: number;
    dealerCount: number;
    circle: number;
}