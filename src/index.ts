import { serve } from "@hono/node-server";
import { Hono } from "hono";
import fs from "fs";
import path from "path";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello test!");
});

app.get("/audio", (c) => {
  const audioFile = path.join(__dirname, "../", "static", "audio.mp3");
  const fileStream = fs.createReadStream(audioFile);

  // creating readableStream for web adaptation
  const readableStream = new ReadableStream({
    start(controller) {
      fileStream.on("data", (chunk) => {
        controller.enqueue(chunk);
      });

      fileStream.on("end", () => {
        controller.close();
      });
      fileStream.on("error", (err) => {
        controller.error(err);
      });
    },
    cancel() {
      fileStream.destroy(); 
    },
  });
  // Return the ReadableStream as the response body => like readStream.pipe(res) for nodejs
  return c.body(readableStream);
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
