import dotenv from "dotenv";
dotenv.config();
import Url from "../models/url.js";
import { nanoid } from "nanoid";
import validator from "validator";
import logActivity from "../util/logger.js";

const BASE_URL = process.env.BASE_URL;

/////////////////////////////////////////////////////// Shorten Url /////////////////////////////////////////////////////////

export async function shortenUrl(req, res) {
  const { originalUrl } = req.body;
  const ip = req.ip;

  if (!validator.isURL(originalUrl, { require_protocol: true })) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  try {
    const existing = await Url.findOne({ originalUrl });
    if (existing) {
      logActivity(ip, "Returned existing shortened URL");
      return res.json({
        message: "This URL is already shortened.",
        shortUrl: existing.shortUrl,
      });
    }

    const shortId = nanoid(6);
    const shortUrl = `${BASE_URL}/${shortId}`;
    const newUrl = await Url.create({ originalUrl, shortId, shortUrl });

    logActivity(ip, "Shortened new URL");

    return res
      .status(201)
      .json({ message: "URL shortened successfully", shortUrl });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}

/////////////////////////////////////////////////////// Redirect To Original /////////////////////////////////////////////////////////

export async function redirectToOriginal(req, res) {
  const { shortId } = req.params;
  const ip = req.ip;

  try {
    const found = await Url.findOne({ shortId });
    if (found) {
      logActivity(ip, "Redirected to original URL");
      return res.redirect(found.originalUrl);
    } else {
      return res.status(404).json({ message: "Short URL not found." });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}

//////////////////////////////////////////////////////////// Get All Urls///////////////////////////////////////////////////////////

export async function getAllUrls(req, res) {
  const ip = req.ip;
  try {
    const urls = await Url.find().select("-__v");
    logActivity(ip, "Listed all URLs");
    return res.json(urls);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}
