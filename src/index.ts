import * as express from "express";
import {csgoServerRoute} from "./routes/csgoServer";
import {csgoClientRoute} from "./routes/csgoClient";

const app = express();

app.use(csgoServerRoute);
app.use(csgoClientRoute);

app.listen(3000, () => {
    console.log("app listening on port 3000!");
});

