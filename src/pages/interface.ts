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

interface IRound {
    //generate
    uid: string;
    createdAt: Date | String;
    //column
    deskType: EDeskType;
    base: number;
    point: number;
    //relation
    east?: IPlayer;
    south?: IPlayer;
    west?: IPlayer;
    north?: IPlayer;
    records: IRecord[];
    // updatedAt: Date;
};

interface IAddRecord {
    winner: string;
    losers: string[];
    endType: EEndType;
    point: number;
};

interface IRecord {
    //generate
    uid: string;
    createdAt: Date | String;
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
    win: number;
    lose: number;
    selfDrawn: number;
    draw: number;
    beSelfDrawn: number;
    fake: number;
    amount: number;
};

export interface ICurrentRound {
    round: IRound;
    records: IAddRecord[];
    players: {
        [key: string]: IPlayerStatistics;
        east: IPlayerStatistics;
        south: IPlayerStatistics;
        west: IPlayerStatistics;
        north: IPlayerStatistics;
    };
    circle: EWind;
    dealer: EWind;
    dealerCount: number;
};

export interface IEndTypeOption {
    label: string;
    value: EEndType;
};