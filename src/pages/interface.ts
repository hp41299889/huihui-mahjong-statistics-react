import { EEndType, EWind, EDeskType, ERoundStatus } from "./enum";

export interface ICurrentRound {
    status: ERoundStatus;
    round: IRound;
    records: IAddRecord[];
    players: IPlayers;
    circle: EWind;
    dealer: EWind;
    dealerCount: number;
    venue: IAddRecord[];
};

export interface IPlayers {
    [key: string]: IPlayerScore;
    east: IPlayerScore;
    south: IPlayerScore;
    west: IPlayerScore;
    north: IPlayerScore;
};

export interface IAddRecord {
    circle: EWind;
    dealer: EWind;
    dealerCount: number;
    winner: string;
    losers: string[];
    endType: EEndType;
    point: number;
    createdAt: Date;
};

interface IPlayerScore {
    id: number;
    name: string;
    win: number;
    lose: number;
    selfDrawn: number;
    draw: number;
    beSelfDrawn?: number;
    fake: number;
    amount: number;
};

export interface IStatistics {
    [key: string]: IPlayerStatistics;
};

export interface IPlayerStatistics {
    id: number;
    name: string;
    createdAt?: Date;
    winds: {
        [key: string]: IWindStatistics;
        east: IWindStatistics;
        south: IWindStatistics;
        west: IWindStatistics;
        north: IWindStatistics;
    };
};

interface IWindStatistics {
    round: number;
    record: number;
    win: number;
    lose: number;
    selfDrawn: number;
    draw: number;
    beSelfDrawn: number;
    fake: number;
    amount: number;
};

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



export interface IEndTypeOption {
    label: string;
    value: EEndType;
};
