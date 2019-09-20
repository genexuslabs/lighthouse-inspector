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

When an expected score isn't met, a message explaining which category or audit didn't meet the expected score is shown.

## Running the tests

```sh
npm test
```

## Built With

* [Lighthouse](https://github.com/GoogleChrome/lighthouse)

## License

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
