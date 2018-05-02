import * as fs from "fs";
import {BroadcastManager} from "../broadcastManager";
import {FrameType} from "../consts";
import * as express from "express";
import {getFragmentFileName} from "../util/getFragmentFileName";
export const csgoServerRoute = express.Router();

const broadcastManager = new BroadcastManager();
csgoServerRoute.post("/:token/:fragmentNumber/:frameType", async (req, res) => {
    console.log(`received params. req.params: ${JSON.stringify(req.params)} req.query: ${JSON.stringify(req.query)}`);
    // frameの種類が start でない && マネージャーに登録されていない場合は 205 を返す
    if (req.params.frameType !== FrameType.Start) {
        // 指定された token の start frame を取得する
        const broadcast = await broadcastManager.getBroadcast(req.params.token, FrameType.Start);
        console.log(`broadcast: ${JSON.stringify(broadcast)}`);
        // start frame がない場合は 205 を返して start frame を要求する
        if (broadcast === null) {
            console.log("broadcast data is not ready. we respond that we need start frame.");
            return res.status(205).send("reset");
        }
    }
    // start の場合はマネージャーに登録する
    if (req.params.frameType === FrameType.Start) {
        console.log(`received start frame ${req.params.token} with fragmentNumber: ${req.params.fragmentNumber}`);
        await broadcastManager.setBroadcast({
            token: req.params.token as string,
            fragmentNumber: req.params.fragmentNumber as string,
            auth: req.headers["x-origin-auth"] as string,
            type: req.params.frameType as FrameType,
            protocol: parseInt(req.query.protocol, 10),
            map: req.query.map,
            tick: parseInt(req.query.tick, 10),
            tps: parseInt(req.query.tps, 10),
        });
    } else if (req.params.frameType === FrameType.Full) {
        // frame_buffer_put(req.params.token, req.params.fragmentNumber, req.query.tick);
        console.log("Fragment", req.params.fragmentNumber, "for tick", req.query.tick);
    }
    const fileName = getFragmentFileName(req);
    console.log(`saving file as ${fileName}`);
    const stream = fs.createWriteStream(`data/${fileName}`);
    console.log("piping");
    // write stream
    req.pipe(stream);
    console.log("returning response");
    return res.status(200).send("OK");
});