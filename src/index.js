document.addEventListener("DOMContentLoaded", function () {
  window.fetchPoem = function () {
    const title = document.getElementById("titleInput").value;
    if (!title) {
      alert("Please enter a title.");
      return;
    }
    const loadingIndicator = document.getElementById("loading");
    const poemDisplay = document.getElementById("poemDisplay");

    loadingIndicator.classList.remove("hidden");
    poemDisplay.innerText = "";

    fetch(`https://poetrydb.org/title/${title}`)
      .then((response) => response.json())
      .then((data) => {
        loadingIndicator.classList.add("hidden");
        if (data.status === 404) {
          poemDisplay.innerText = "No poem found for this title.";
        } else {
          const poem = data[0].lines.join("\n");
          poemDisplay.innerText = poem;
        }
      })
      .catch((error) => {
        loadingIndicator.classList.add("hidden");
        console.error("Error fetching poem:", error);
        poemDisplay.innerText = "An error occurred while fetching the poem.";
      });
  };
});
