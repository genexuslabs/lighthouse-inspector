function evalExpectation(expectedScore, score) {
  return typeof score === "number"
    ? score >= expectedScore
    : score == expectedScore;
}

function getFailedExpectationMessage(type, name, score, expectedScore) {
  const text = typeof score === "number" ? "minimum" : "expected";
  return `${type} '${name}' score is ${score} (${text} value is ${expectedScore})`;
}

module.exports = function(results, expectations = {}) {
  let error = false;
  const messages = [];
  const { categories, audits } = expectations;

  if (categories) {
    for (const r of results.reportCategories) {
      if (categories[r.id]) {
        const expectedScore = categories[r.id];
        const { score, name } = r;
        if (!evalExpectation(expectedScore, score)) {
          error = true;
          messages.push(
            getFailedExpectationMessage("Category", name, score, expectedScore)
          );
        }
      }
    }
  }

  if (audits) {
    for (const a of Object.keys(audits)) {
      const expectedScore = audits[a];
      const { score, name } = results.audits[a];
      if (!evalExpectation(expectedScore, score)) {
        error = true;
        messages.push(
          getFailedExpectationMessage("Audit", name, score, expectedScore)
        );
      }
    }
  }

  return {
    error,
    messages
  };
};
