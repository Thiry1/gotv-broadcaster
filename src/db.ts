const level = require("level");
const db = level("./db", { valueEncoding: "json" });

export class Db {
    async get<T>(key: string): Promise<T> {
        return db.get(key)
            .then((result: any) => {
                console.log(`DB#get: success. result: ${JSON.stringify(result)}`);
                return result;
            })
            .catch((error: any) => {
                if (error.notFound) {
                    return Promise.resolve(null);
                }
                console.error(`DB#get: unknown error occurred. error: ${error}`);
                throw error;
            });
    }
    async set(key: string, value: any): Promise<void> {
        return db.put(key, value)
            .then(() => {
                console.log(`DB#set: success. key: ${key} value: ${JSON.stringify(value)}`);
                return Promise.resolve();
            })
            .catch((error: any) => {
                console.error(`DB#set: unknown error occurred. error: ${error}`);
                return Promise.reject(error);
            });
    }
}