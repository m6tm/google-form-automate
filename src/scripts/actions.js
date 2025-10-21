/**
 * Find best match for the title over the MIN_SIMILARITY_THRESHOLD
 * TODO: make formData to more generic data type
 */
function findBestMatchingQuestion(title, formData) {
  const MIN_SIMILARITY_THRESHOLD = 79; // TODO: Not calculated best treshold.
  let bestMatchingQuestionKey = null;
  let bestSimilarityScore = 0;

  formData.forEach((item) => {
    const score = calculateQuestionSimilarity(
      title.trim().toLowerCase(),
      item.name.trim().toLowerCase()
    );
    if (score > MIN_SIMILARITY_THRESHOLD && score > bestSimilarityScore) {
      bestSimilarityScore = score;
      bestMatchingQuestionKey = item;
    }
  });

  return bestMatchingQuestionKey;
}

/**
 * Calculate similarity percent
 */
function calculateQuestionSimilarity(a, b) {
  const distance = computeLevenshteinDistance(a, b);
  const maxLength = Math.max(a.length, b.length);
  return (1 - distance / maxLength) * 100;
}

/**
 * Find levenshtein Distance of two string
 * TODO: Might optimizing or caching needed. O(n * m)
 */
function computeLevenshteinDistance(a, b) {
  const dp = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
    }
  }

  return dp[a.length][b.length];
}

const form = document.querySelector("form");
const QuestionHandlers = {
  text: {
    selector:
      "input[type='text'], input[type='email'], input[type='number'], input[type='tel'], input[type='url']",
    fill: (element, answer) => {
      element.value = answer;
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
    },
  },
  textarea: {
    selector: "textarea",
    fill: (element, answer) => {
      element.value = answer;
      element.dispatchEvent(new Event("input", { bubbles: true }));
      element.dispatchEvent(new Event("change", { bubbles: true }));
    },
  },
  date: {
    selector: "input[type='date']",
    fill: (element, answer) => {
      // Format answer as YYYY-MM-DD for date inputs
      const date = new Date(answer);
      if (!isNaN(date)) {
        const formattedDate = date.toISOString().split("T")[0];
        element.value = formattedDate;
        element.dispatchEvent(new Event("input", { bubbles: true }));
        element.dispatchEvent(new Event("change", { bubbles: true }));
      }
    },
  },
  time: {
    selector: "div[role='group']",
    fill: (container, answer) => {
      const timeParts = answer.split(":");
      if (timeParts.length !== 2) return;

      const inputs = container.querySelectorAll("input[type='text']");
      if (inputs.length >= 2) {
        inputs[0].value = timeParts[0];
        inputs[0].dispatchEvent(new Event("input", { bubbles: true }));
        inputs[0].dispatchEvent(new Event("change", { bubbles: true }));

        inputs[1].value = timeParts[1];
        inputs[1].dispatchEvent(new Event("input", { bubbles: true }));
        inputs[1].dispatchEvent(new Event("change", { bubbles: true }));
      }
    },
  },
  multiple_choice: {
    selector: "div[role='list']",
    fill: (container, answer) => {
      answer = JSON.parse(answer);
      const selectedAnswers = Array.isArray(answer) ? answer : [answer];
      console.log(selectedAnswers);

      // Extract predefined options and other answers
      const predefinedAnswers = [];
      let otherAnswer = null;

      selectedAnswers.forEach((item) => {
        if (typeof item === "string") {
          predefinedAnswers.push(item);
        } else if (item && typeof item === "object" && item.Autre) {
          otherAnswer = item.Autre;
        }
      });

      const options = container.querySelectorAll("div[role='listitem']");
      options.forEach((option) => {
        const label = option.querySelector("span[class*='snByac']");
        if (label) {
          const labelText = label.textContent.trim();
          const shouldBeChecked = predefinedAnswers.includes(labelText);
          const checkbox = option.querySelector("div[role='checkbox']");
          if (checkbox) {
            const isChecked = checkbox.getAttribute("aria-checked") === "true";
            if (shouldBeChecked !== isChecked) {
              checkbox.click();
            }
          }
        }

        // Handle 'other' option
        const otherLabel = option.querySelector("span[class*='snByac']");
        if (otherLabel && otherLabel.textContent.trim() === "Autre :") {
          const otherCheckbox = option.querySelector("div[role='checkbox']");
          const otherInput = option.querySelector("input[type='text']");
          if (otherCheckbox && otherInput) {
            if (otherAnswer) {
              // Check the 'other' checkbox if not already checked
              if (otherCheckbox.getAttribute("aria-checked") !== "true") {
                otherCheckbox.click();
              }
              // Fill the input
              otherInput.value = otherAnswer;
              otherInput.dispatchEvent(new Event("input", { bubbles: true }));
              otherInput.dispatchEvent(new Event("change", { bubbles: true }));
            }
          }
        }
      });
    },
  },
};

/**
 * Fills inputs on forms page with the data
 */
function GoogleFormFiller() {
  chrome.storage.sync.get("formData", (result) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }
    if (!result["formData"]) {
      console.log("No form data found in storage.");
      return;
    }
    OnDataFetch(result["formData"]);
  });
}

function OnDataFetch(formData) {
  console.log("OnDataFetch running ...", formData);
  Object.values(QuestionHandlers).forEach((handler) => {
    const fields = form.querySelectorAll(handler.selector);
    fields.forEach((field) => {
      const formTitleElement = field
        .closest("div[role='listitem']")
        ?.querySelector("div[role='heading']");
      if (!formTitleElement || !formTitleElement.firstChild) return;

      const formTitle = formTitleElement.firstChild.textContent.trim();
      const bestMatch = findBestMatchingQuestion(formTitle, formData);
      if (bestMatch) {
        console.log("bestMatch", bestMatch);
        if (
          ["text", "email", "number", "date", "time"].includes(bestMatch.type)
        ) {
          handler.fill(field, bestMatch.value);
        }
      }
    });
  });
}

// Add listener for popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case "FillGoogleForms":
      GoogleFormFiller();
      sendResponse({ status: "Function executed" });
      break;
    case "fillForm":
      GoogleFormFiller();
      sendResponse({ status: "Form filled" });
      break;
    default:
      break;
  }
});
