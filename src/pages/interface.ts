import { EEndType, EWind, EDeskType } from "./enum";

//base
export interface IPlayer {
    id?: number;
    name: string;
    createdAt?: Date;
};
export interface IPlayers {
    east: IPlayer;
    south: IPlayer;
    west: IPlayer;
    north: IPlayer;
};

export interface IRound {
    roundUid: string;
    deskType: EDeskType;
    base: number;
    point: number;
    players: IPlayers;
    circle: EWind;
    dealer: EWind;
    dealerCount: number;
};
export interface IEndTypeOption {
    label: string;
    value: EEndType;
};

//comopnent


export interface IRecordForm {
    endType: EEndType;
    winner: string;
    loser: string[];
    point: number;
};

export interface IWinningForm {
    players: IPlayers;
};