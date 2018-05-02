export enum FrameType {
    Start = "start",
    Full = "full",
    Delta = "delta",
}
export interface Broadcast {
    token: string;
    fragmentNumber: string;
    auth: string;
    type: FrameType;
}
