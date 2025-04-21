import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

export default async function handler() {
    try {
        const browser = await puppeteer.launch({
            headless: "new", // or true
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });

        const page = await browser.newPage();

        // Target your running map page
        const mapURL = "http://localhost:3000/mainPage"; // Or deployed URL
        await page.goto(mapURL, { waitUntil: "networkidle2" });

        await page.setViewport({ width: 1280, height: 720 });
        await page.waitForSelector("#map"); // Your map container
        await page.waitForTimeout(3000); // ensure tiles load

        const mapElement = await page.$("#map");
        if (!mapElement) {
            return res.status(404).json({ error: "Map container not found" });
        }

        // Save screenshot locally
        const screenshotPath = path.join(process.cwd(), "public", "map-screenshot.png");
        await mapElement.screenshot({ path: screenshotPath });

        await browser.close();

        // Send back the image URL (from /public folder)
        return res.status(200).json({ success: true, url: "/map-screenshot.png" });

    } catch (error) {
        console.error("Screenshot error:", error);
        return res.status(500).json({ error: "Failed to capture map screenshot" });
    }
}
