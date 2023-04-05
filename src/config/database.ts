import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config();
mongoose.set("strictQuery", false);
const databaseURL = process.env.DATABASE_URL;

export default mongoose.connect(databaseURL!);