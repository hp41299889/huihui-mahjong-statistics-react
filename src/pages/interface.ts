export interface IPlayer {
    id: number;
    name: string;
    createdAt: Date;
};


export interface IRound {
    roundUid: string;
    players?: {
        east: IPlayer,
        south: IPlayer,
        west: IPlayer,
        north: IPlayer
    };
    base: number;
    point: number;
    deskType: string;
};
