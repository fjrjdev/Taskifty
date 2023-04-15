import mongoose from "mongoose";
import config from ".";

mongoose.set("strictQuery", false);

export default mongoose.connect(config.databaseURL!);
