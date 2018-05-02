import * as fs from "fs";

export const loadFile = (path: string): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error: any, data: Buffer) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(data);
            }
        });
    });
};