// const http = require("http");

// const server = http.createServer((req, res) => {
//   if (req.method === "POST") {
//     const chunks = [];

//     req.on("data", (chunk) => {
//       const buf = Buffer.from(chunk);
//       const str = buf.toString();
//       chunks.push(str);
//       const obj = JSON.parse(chunks);
//       const value = obj.num1;

//       // Write the code here to check if the number is odd or even
//     });
//   }
// });

// module.exports = server;

const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "POST") {
    const chunks = [];

    req.on("data", (chunk) => {
      const buf = Buffer.from(chunk);
      const str = buf.toString();
      chunks.push(str);
      try {
        const obj = JSON.parse(str);
        if (typeof obj.num1 !== "number") {
          res.statusCode = 400;
          res.setHeader("Content-Type", "text/plain");
          res.end("Error: num1 must be a number");
        } else {
          const value = obj.num1;
          if (value % 2 === 0) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain");
            res.end(`The number ${value} is even`);
          } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "text/plain");
            res.end(`The number ${value} is odd`);
          }
        }
      } catch (err) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "text/plain");
        res.end("Error: Invalid JSON");
      }
    });
  } else {
    res.statusCode = 405;
    res.setHeader("Content-Type", "text/plain");
    res.end("Error: Only POST requests are allowed");
  }
});

module.exports = server;
