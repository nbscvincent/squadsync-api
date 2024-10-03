import express from "express";
import pool from "./db.js"; 
import bodyParser from "body-parser";
import cors from "cors";
import tournamentRouter from "./routes/tournamentRoutes.js";
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(tournamentRouter);
const port = 5001;

app.get('/', async (req, res) => {
    res.send("Hello World! and hello philippines");
});

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});
