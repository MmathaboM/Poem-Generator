document.addEventListener("DOMContentLoaded", function () {
  window.fetchPoem = function () {
    const title = document.getElementById("titleInput").value;
    if (!title) {
      alert("Please enter a title.");
      return;
    }

    const poemDisplay = document.getElementById("poemDisplay");
    poemDisplay.innerHTML = "";

    let loadingIndicator = document.getElementById("loading");
    if (!loadingIndicator) {
      loadingIndicator = document.createElement("div");
      loadingIndicator.id = "loading";
      loadingIndicator.innerHTML = `⏳ Generating a poem about ${title}`;
      loadingIndicator.className = "loading";
      poemDisplay.parentNode.insertBefore(loadingIndicator, poemDisplay);
    } else {
      loadingIndicator.classList.remove("hidden");
      loadingIndicator.innerHTML = `⏳ Generating a poem about ${title}`;
    }

    const apiKey = "2046c535afeb092fo82f1d306d8a2b2t";
    const context =
      "You are a romantic Poem expert and love to write short poems. You mission is to generate a 4 line poem in basic HTML and separate each line with a <br />. Make sure to follow the user instructions. Do not include a title to the poem. Sign the poem with 'SheCodes AI' inside a <strong> element at the end of the poem and NOT at the beginning";
    const prompt = `User instructions: Generate an English poem about ${title}`;
    const apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

    axios
      .get(apiURL)
      .then((response) => {
        if (loadingIndicator) {
          loadingIndicator.remove();
        }

        poemDisplay.classList.remove("hidden");
        new Typewriter(poemDisplay, {
          strings: response.data.answer,
          autoStart: true,
          delay: 1,
          cursor: "",
        });
      })
      .catch((error) => {
        if (loadingIndicator) {
          loadingIndicator.remove();
        }

        console.error("Error generating poem:", error);
        poemDisplay.innerHTML = "An error occurred while generating the poem.";
      });
  };
});
