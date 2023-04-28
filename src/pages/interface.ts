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

interface IRecord {
    //generate
    uid: string;
    createdAt: Date;
    //column
    circle: EWind;
    dealer: EWind;
    dealerCount: number;
    endType: EEndType;
    point: number;
    //relation
    winner: IPlayer;
    losers: IPlayer[];
};

interface IPlayerStatistics {
    id: number;
    name: string;
    win?: number;
    lose?: number;
    selfDrawn?: number;
    beSelfDrawn?: number;
    draw?: number;
    fake?: number;
    amount?: number;
};

export interface ICurrentRound {
    roundUid: string;
    deskType: EDeskType;
    base: number;
    point: number;
    records: IRecord[];
    players: {
        east: IPlayer;
        south: IPlayer;
        west: IPlayer;
        north: IPlayer;
    };
    circle: EWind;
    dealer: EWind;
    dealerCount: number;
}

export interface IEndTypeOption {
    label: string;
    value: EEndType;
};