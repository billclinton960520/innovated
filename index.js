const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

const filesDir = path.join(__dirname, "public");

// Serve files at root
app.use(express.static(filesDir));

app.get("/", (req, res) => {
  fs.readdir(filesDir, (err, files) => {
    if (err) {
      return res.status(500).send("Unable to read directory");
    }

    const links = files
      .map(file => `<li><a href="/${encodeURIComponent(file)}">${file}</a></li>`)
      .join("");

    res.send(`
      <html>
        <body>
          <h1>Attached Files</h1>
          <ul>${links}</ul>
        </body>
      </html>
    `);
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});