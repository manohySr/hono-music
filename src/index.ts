import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { stream } from "hono/streaming";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello test!");
});

app.get("/audio", (c) => {
  const audioFile = path.join(__dirname, "../", "static", "audio.mp3");
  const fileStream = fs.createReadStream(audioFile);

  // Return the readStream as the response body => like readStream.pipe(res) for nodejs
  return c.body(fileStream);
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
