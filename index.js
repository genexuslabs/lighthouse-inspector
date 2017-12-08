const path = require('path');
const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const analyzer = require('./analyzer');

function logAnalyzerResult({ error, messages }) {
  for (const msg of messages) {
    console.log('  ' + msg);
  }
  if (!error) {
    console.log(`  No issues found`);
  }
  console.log(`--------------------------------------------------------`);
}

function launchChromeAndRunLighthouse(url, flags = {}, config = null) {
  return chromeLauncher.launch(flags).then(chrome => {
    flags.port = chrome.port;
    return lighthouse(url, flags, config).then(results =>
      chrome.kill().then(() => results));
  });
}

function inspectPages (pending, opts) {
  if (pending.length > 0) {
    const [url] = pending;
    const { expectations, lighthouseParams = {} } = opts;

    console.log(`Running lighthouse test on ${url}`);
    launchChromeAndRunLighthouse(url, lighthouseParams.flags, lighthouseParams.config).then(results => {
      const analyzerResult = analyzer(results, expectations);
      if (opts.failOnUnmetExpectation && analyzerResult.error) {
        process.exitCode = 1;
      }
      logAnalyzerResult(analyzerResult);
      inspectPages(pending.slice(1), opts);
    });
  }
}

module.exports = (configPath) => {
  const opts = JSON.parse(fs.readFileSync(configPath));
  const { pages } = opts;

  if (pages.length === 0) {
    console.error("At least one URL must be specified in the pages property of the config JSON file.");
    return;
  }
  return inspectPages(pages, opts);
};
