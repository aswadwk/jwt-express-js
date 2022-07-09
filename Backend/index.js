import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/database.js";
import cookieParser from "cookie-parser";
import Users from "./models/userModel.js";
import router from "./routes/index.js";

dotenv.config();
const app = express();

try {
    await db.authenticate()
    await Users.sync();
    console.log("Connection has been established successfully.");
} catch (err) {
    console.log(err);
}
app.use(cors({ credentials: true, origin: '*' }));
// app.use(cors({ credentials: true, origin: 'https://localhost:3000' }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(5000, () => console.log("Server started on port 5000"));