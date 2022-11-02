import path from "path";
import fs from "fs";

import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";

import App from "../src/App";

const PORT = process.env.PORT || 3006;
const app = express();

app.get("/", (req, res) => {
  const app1 = ReactDOMServer.renderToString(
    // <App /> (wrong reactjs not define. Because server side)
    <div>Cong Dat</div>
  );
  const indexFile = path.resolve("./build/index.html");

  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }
    console.log("datnc", data);

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app1}</div>`)
    );
  });
});

app.use(express.static("./build"));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
