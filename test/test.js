const assert = require('assert');
const analyzer = require('../analyzer');
const fs = require('fs');

const expectations = {
  "categories": {
    "pwa": 85,
    "best-practices": 85,
    "performance": 85,
    "accessibility": 90
  },
  "audits": {
    "first-meaningful-paint": 30,
    "load-fast-enough-for-pwa": true,
    "service-worker": true
  }
};

describe('google.com.uy', function() {
  describe('analyzer', function() {
    const result = JSON.parse(fs.readFileSync("./test/google_com.json"));
    it('should fail', function() {
      const { error } = analyzer(result, expectations);
      assert.equal(true, error);
    });

    it('should return 4 error messages', function() {
      const { messages } = analyzer(result, expectations);
      assert.equal(4, messages.length);
    });
  });
});

describe('airhorner.com', function() {
  describe('analyzer', function() {
    const result = JSON.parse(fs.readFileSync("./test/airhorner_com.json"));
    it('should pass', function() {
      const { error } = analyzer(result, expectations);
      assert.equal(false, error);
    });

    it('should return 0 error messages', function() {
      const { messages } = analyzer(result, expectations);
      assert.equal(0, messages.length);
    });
  });
});
