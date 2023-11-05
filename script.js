document.getElementById("search").addEventListener("click", function () {
    const word = document.getElementById("word").value;
    


// Fetch the word definition from the API.
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => response.json())
        .then((data) => {
            if (data && data.length > 0) {
                const definition = data[0].meanings[0].definitions[0].definition;
                document.getElementById("definition").innerHTML = `<b>${word}:</b> ${definition}`;
            } else {
                document.getElementById("definition").innerHTML = "Word not found.";
            }
            


// Add the new search term to the history.
            let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
            searchHistory.push(word);
            localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

            
// Call the function to display search history.

            displaySearchHistory();
        })
        .catch((error) => {
            document.getElementById("definition").innerHTML = "An error occurred.";
        });
});



// Function to display search history on the page.

function displaySearchHistory() {
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory"));

    if (searchHistory && searchHistory.length > 0) {
        const historyList = document.getElementById("search-history");
        historyList.innerHTML = "<strong>Search History:</strong><br>";
        
        searchHistory.forEach((term) => {
            const listItem = document.createElement("li");
            listItem.textContent = term;
            historyList.appendChild(listItem);
        });
    }
}



// Call the function to display search history when the page loads.
displaySearchHistory();



