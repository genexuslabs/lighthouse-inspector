#! /usr/bin/env node

const cli = require("cli");
const inspector = require(".");

const options = cli.parse({
  config: ["c", "Config file path. (required)", "file", ""]
});

if (!options.config) {
  cli.fatal(`A config file must be specified. Type -h for help.`);
  return;
}

inspector(options.config);
