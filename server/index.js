import mongoose from "mongoose";
import 'dotenv/config'
import app from './app.js'
const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log("listening on port" + `http://localhost:${port}`);
    });
    console.log("connected with database");

  })
  .catch((err) => console.log(err));
