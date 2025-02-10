
document.getElementById("bannerButton").addEventListener("click", () => {
    alert("Redirecting to sign-up page...");

    window.location.href = "https://www.discoveryplus.com";
});


document.getElementById("searchButton").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.trim();
    if (query) {
        alert(`Searching for: ${query}`);
    } else {
        alert("Please enter a search term!");
    }
});
// script.js

// Highlight the 'live' button on the schedule card dynamically
const liveButton = document.querySelector(".live-button");
liveButton.addEventListener("click", () => {
    alert("Redirecting to live TV...");
    window.location.href = "#"; // Replace with actual URL for live TV
});
