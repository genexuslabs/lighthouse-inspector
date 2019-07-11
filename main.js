const inspector = require("./index");

const path = process.argv[2] || "./config.json";

console.log(`Processing configuration file ${path}`);
inspector(path);
