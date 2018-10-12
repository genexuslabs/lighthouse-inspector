function evalExpectation(expectedScore, score) {
  return typeof score === "number"
    ? score >= expectedScore
    : score == expectedScore;
}

function getFailedExpectationMessage(type, name, score, expectedScore) {
  const text = typeof score === "number" ? "minimum" : "expected";
  return `${type} '${name}' score is ${score} (${text} value is ${expectedScore})`;
}

function normalizeScore(score) {
	return score * 100;
}
module.exports = function({ lhr: results }, expectations = {}) {
  let error = false;
  const messages = [];
  const { categories, audits } = expectations;

  if (categories) {
    for (const r in results.categories) {
      if (categories[r]) {
        const expectedScore = categories[r];
        const { score, title: name } = results.categories[r];
		const normalizedScore = normalizeScore(score);
        if (!evalExpectation(expectedScore, normalizedScore)) {
          error = true;
          messages.push(
            getFailedExpectationMessage("Category", name, normalizedScore, expectedScore)
          );
        }
      }
    }
  }

  if (audits) {
    for (const a of Object.keys(audits)) {
      const expectedScore = audits[a];
      const { score, title: name } = results.audits[a];
      const normalizedScore = normalizeScore(score);
      if (!evalExpectation(expectedScore, normalizedScore)) {
        error = true;
        messages.push(
          getFailedExpectationMessage("Audit", name, normalizedScore, expectedScore)
        );
      }
    }
  }

  return {
    error,
    messages
  };
};
