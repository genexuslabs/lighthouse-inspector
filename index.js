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

function inspectPages (pending, expectations = {}, lighthouseParams = {}) {
  if (pending.length > 0) {
    const [url] = pending;
    const { flags, config } = lighthouseParams;

    console.log(`Running lighthouse test on ${url}`);
    launchChromeAndRunLighthouse(url, flags, config).then(results => {
      const analyzerResult = analyzer(results, expectations);
      if (analyzerResult.error) {
        process.exitCode = 1;
      }
      logAnalyzerResult(analyzerResult);
      inspectPages(pending.slice(1), expectations, lighthouseParams);
    });
  }
}

module.exports = (configPath) => {
  const config = JSON.parse(fs.readFileSync(configPath));
  const { pages, expectations, lighthouseParams } = config;

  if (pages.length === 0) {
    console.error("At least one URL must be specified in the pages property of the config JSON file.");
    return;
  }
  return inspectPages(pages, expectations, lighthouseParams);
};
