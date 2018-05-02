import { Db } from "./db";
import {Broadcast, FrameType} from "./consts";

export class BroadcastManager {
    private db = new Db();
    public getBroadcast = (token: string, type: FrameType): Promise<Broadcast> => this.db.get<Broadcast>(`${token}-${type}`);
    public setBroadcast = (broadcast: Broadcast): Promise<void> => this.db.set(`${broadcast.token}-${broadcast.type}`, broadcast);
}
