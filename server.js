import dotenv from "dotenv";
dotenv.config();
import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 20; // or more

import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
