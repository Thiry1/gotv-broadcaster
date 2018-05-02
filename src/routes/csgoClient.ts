import * as express from "express";
import * as fsUtil from "../util/fsUtil";
import {getFragmentFileName} from "../util/getFragmentFileName";
export const csgoClientRoute = express.Router();

csgoClientRoute.get("/match/:token/:fragmentNumber/:frameType", async (req, res) => {
    const filePath = `data/${getFragmentFileName(req)}`;
    return fsUtil.loadFile(filePath)
        .then((data) => {
            console.log(`response file. fileName: ${filePath}`);
            res.setHeader("Content-Type", "application/octet-stream");
            return res.status(200).send(data);
        })
        .catch((error) => res.status(404).send("not found"));
});
csgoClientRoute.get("/match/:token/sync", async (req, res) => {
    // TODO: implement
    res.status(200).send("OK");
});