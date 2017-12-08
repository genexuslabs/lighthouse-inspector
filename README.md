# lighthouse-inspector

A CLI for running Google Lighthouse on a set of URLs, specifying expected scores for audits and categories.

The goal of this CLI is to ease automating tests on a set of pages, using Lighthouse.

## Prerequisites

Node 6.10.0 or higher, together with NPM 3 or higher.

## Installing

```sh
npm install -g @genexus/lighthouse-inspector
# or
npm install --save-dev @genexus/lighthouse-inspector
```

## Usage

```sh
lighthouse-inspector --config /path/to/config
```

The config option lets you specify the path to the [configuration file](docs/configuration.md). This JSON file lets you specify the set of URLs to be tested, the expected scores and, if needed, the Lighthouse configuration. Check the [configuration file documentation](docs/configuration.md) for more information.

When an expected score isn't met, a message explaining which category or audit didn't meet the expected score.

## Running the tests

```sh
npm test
```

## Built With

* [Lighthouse](https://github.com/GoogleChrome/lighthouse)

## License

MIT
