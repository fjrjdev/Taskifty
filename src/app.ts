import "express-async-errors";
import express from "express";
import cors from "cors";
import routes from "./routers";
import connection from "./config/database";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorMiddleware);

const port = 3000;
connection
  .then(() => {
    console.log("Database connected with success");
    app.listen(port, () => {
      console.log("Server running in port", port);
    });
  })
  .catch((err) => console.log(err));
