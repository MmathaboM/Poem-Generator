document.addEventListener("DOMContentLoaded", function () {
  window.fetchPoem = function () {
    const title = document.getElementById("titleInput").value;
    if (!title) {
      alert("Please enter a title.");
      return;
    }

    const poemDisplay = document.getElementById("poemDisplay");
    poemDisplay.innerText = "";

    // Create loading indicator dynamically
    let loadingIndicator = document.getElementById("loading");
    if (!loadingIndicator) {
      loadingIndicator = document.createElement("div");
      loadingIndicator.id = "loading";
      loadingIndicator.innerText = "⏳ Loading...";
      loadingIndicator.className = "loading";
      // Insert the loading indicator before the poemDisplay
      poemDisplay.parentNode.insertBefore(loadingIndicator, poemDisplay);
    } else {
      // If it already exists, just make sure it's visible
      loadingIndicator.classList.remove("hidden");
    }

    fetch(`https://poetrydb.org/title/${title}`)
      .then((response) => response.json())
      .then((data) => {
        // Remove loading indicator after data is received
        if (loadingIndicator) {
          loadingIndicator.remove();
        }

        if (data.status === 404 || data.length === 0) {
          poemDisplay.innerText = "No poem found for this title.";
        } else {
          const poem = data[0].lines.join("\n");
          poemDisplay.innerText = poem;
        }
      })
      .catch((error) => {
        // Remove loading indicator if there's an error
        if (loadingIndicator) {
          loadingIndicator.remove();
        }

        console.error("Error fetching poem:", error);
        poemDisplay.innerText = "An error occurred while fetching the poem.";
      });
  };
});
