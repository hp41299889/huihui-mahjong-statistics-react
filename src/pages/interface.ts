import { EEndType, EWind } from "./enum";

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
    players: IPlayers;
    base: number;
    point: number;
    circle: EWind;
    dealer: EWind;
    deskType: string;
};
export interface IEndTypeOption {
    label: string;
    value: EEndType;
};

//comopnent
export interface IPlayerList {
    players: IPlayers;
    dealer: EWind;
};

export interface IRecordForm {
    endType: EEndType;
    winner: string;
    loser: string[];
    point: number;
    circle: EWind;
    dealer: EWind;
    dealerCount: number;
};

export interface IWinningForm {
    players: IPlayers;
};