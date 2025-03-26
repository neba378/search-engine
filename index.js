const documents = [
  "AI is transforming tech. AI tools are everywhere.",
  "AI powers machine learning. Learn AI today.",
  "Data science uses AI a bit. Focus is broader.",
  "No AI here, just code.",
];

// Function to count keyword frequency in a text
function countKeyword(text, keyword) {
  const words = text.toLowerCase().split(/\W+/);
  const keywordLower = keyword.toLowerCase();
  return words.filter((word) => word === keywordLower).length;
}

// Search and rank function
function searchAndRank(docs, query) {
  return docs
    .map((doc, index) => {
      const frequency = countKeyword(doc, query);
      return { id: index + 1, content: doc, score: frequency };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score);
}

// Display results on the page
function displayResults(results, query) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // Clear previous results

  if (results.length === 0) {
    resultsDiv.innerHTML = `<p class="no-results">No documents found containing "${query}".</p>`;
    return;
  }

  results.forEach((doc, rank) => {
    const resultItem = document.createElement("div");
    resultItem.className = "result-item";
    resultItem.innerHTML = `
          <h3>${rank + 1}. [ID: ${doc.id}] Score: ${doc.score}</h3>
          <p>${doc.content}</p>
        `;
    resultsDiv.appendChild(resultItem);
  });
}

// Function to handle search
function runSearch() {
  const userQuery = document.getElementById("searchInput").value;
  if (!userQuery || userQuery.trim() === "") {
    alert("Please enter a keyword.");
    return;
  }
  const rankedResults = searchAndRank(documents, userQuery);
  displayResults(rankedResults, userQuery);
}

// Optional: Trigger search on Enter key
document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    runSearch();
  }
});
