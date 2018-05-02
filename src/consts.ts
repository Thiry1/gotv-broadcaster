export enum FrameType {
    Start = "start",
    Full = "full",
    Delta = "delta",
}
export interface Broadcast {
    /**
     * token.
     * @example s845489096165654t8799308478907
     */
    token: string;
    /**
     * フラグメントの番号.
     */
    fragmentNumber: string;
    /**
     * auth key.
     * tv_broadcast_origin_auth に設定された値.
     */
    auth: string;
    /**
     * フレームの種類.
     */
    type: FrameType;
    /**
     * protocol version.
     * @example 4
     */
    protocol?: number;
    /**
     * tick per second.
     */
    tps?: number;
    /**
     * tick.
     */
    tick?: number;
    /**
     * map 名.
     */
    map?: string;
}
