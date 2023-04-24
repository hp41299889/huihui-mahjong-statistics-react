import { EEndType, EWind, EDeskType } from "./enum";

//base
export interface IPlayer {
    id?: number;
    createdAt?: Date;
    name: string;
    win: number;
    lose: number;
    selfDrawn: number;
    beSelfDrawn: number;
    draw: number;
    fake: number;
    amount: number;
};
export interface IPlayers {
    east: IPlayer;
    south: IPlayer;
    west: IPlayer;
    north: IPlayer;
};

export interface ICurrentRound {
    roundUid: string;
    deskType: EDeskType;
    base: number;
    point: number;
    players: {
        [key: string]: IPlayer;
        east: IPlayer
        south: IPlayer
        west: IPlayer
        north: IPlayer
    };
    circle: EWind;
    dealer: EWind;
    dealerCount: number;
    records: number;
    draws: number;
}

export interface IEndTypeOption {
    label: string;
    value: EEndType;
};