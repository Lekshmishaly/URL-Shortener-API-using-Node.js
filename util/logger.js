import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFile = path.join(__dirname, "../logs/activity.log");

function logActivity(ip, action) {
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  const logEntry = `${timestamp} - ${ip} - ${action}\n`;
  fs.appendFile(logFile, logEntry, (err) => {
    if (err) console.error("Log error:", err);
  });
}

export default logActivity;
