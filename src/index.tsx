import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from 'hono/logger';
import fs from "fs";
import path from "path";
import Top from "./components/Top";

const app = new Hono();

app.use(logger());

app.get("/", (c) => {
  return c.text("Hello, Hono!");
});

app.get('/tsx', (c) => {
  const messages = ['Good Morning', 'Good Evening', 'Good Night']
  return c.html(<Top messages={messages} />)
})

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
