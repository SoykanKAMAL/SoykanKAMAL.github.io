document.addEventListener("DOMContentLoaded", function () {
    const raffleButton = document.getElementById("raffle-button");
    const locationsButton = document.getElementById("locations-button");
    const raffleSection = document.getElementById("raffle-section");
    const locationsSection = document.getElementById("locations-section");

    const raffleBtn = document.getElementById("raffle-btn");
    const winners = document.getElementById("winners");
    const reRaffleBtn = document.getElementById("re-raffle-btn");

    const locationList = document.getElementById("location-list");
    const addLocationBtn = document.getElementById("add-location-btn");
    const addLocationForm = document.getElementById("add-location-form");
    const newLocationInput = document.getElementById("new-location");
    const submitLocationBtn = document.getElementById("submit-location-btn");

    // Function to fetch and display data
    function fetchDataAndDisplay() {
        fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSbfnBm16ADpWvuBLcJPuPPkXGOImoFaGSPD1B3SwijkHRoCp8lGfpa742QFpDAjURmpevHr4JcCH_c/pub?output=csv')
            .then((response) => response.text())
            .then((data) => {
                // Split the data into rows
                const rows = data.split('\n');
                const dataArray = [];

                // Iterate through each row
                for (let i = 1; i < rows.length; i++) {
                    const columns = rows[i].split(',');
                    const senderId = columns[0];
                    const locationName = columns[1];

                    // Create an object with senderId and location name
                    const locationData = {
                        senderId,
                        locationName,
                    };

                    dataArray.push(locationData);
                }

                // Now, dataArray contains all the data from your Google Sheet
                // You can process or display the data as needed
                displayData(dataArray);
            });
    }

    // Function to display data (you can customize this function)
    function displayData(dataArray) {
        // For this example, let's display the data in the console
        console.log(dataArray);
    }

    // Call the fetch function when the page loads
    fetchDataAndDisplay();

    // Event listeners for top bar buttons
    raffleButton.addEventListener("click", () => {
        raffleSection.classList.remove("hidden");
        locationsSection.classList.add("hidden");
    });

    locationsButton.addEventListener("click", () => {
        raffleSection.classList.add("hidden");
        locationsSection.classList.remove("hidden");
    });

    // Event listener for the "RAFFLE!" button
    raffleBtn.addEventListener("click", () => {
        const locationItems = locationList.children;
        const locationCount = locationItems.length;

        // Ensure there are enough locations for a raffle
        if (locationCount < 3) {
            alert("You need at least 3 locations for a raffle.");
            return;
        }

        // Generate random indices for the winners
        const winnerIndices = [];
        while (winnerIndices.length < 3) {
            const randomIndex = Math.floor(Math.random() * locationCount);
            if (!winnerIndices.includes(randomIndex)) {
                winnerIndices.push(randomIndex);
            }
        }

        // Display the winners
        const winnerNames = [];
        winnerIndices.forEach((index, position) => {
            const locationName = locationItems[index].textContent;
            winnerNames.push(`${position + 1}st Winner: ${locationName}`);
        });

        // Update the winner elements
        winners.innerHTML = winnerNames.join("<br>");
        winners.classList.remove("hidden");

        // Hide the "RAFFLE!" button and show the "Re-raffle" button
        raffleBtn.classList.add("hidden");
        reRaffleBtn.classList.remove("hidden");
    });

    // Event listener for the "Re-raffle" button
    reRaffleBtn.addEventListener("click", () => {
        const locationItems = locationList.children;
        const locationCount = locationItems.length;

        // Ensure there are enough locations for a raffle
        if (locationCount < 3) {
            alert("En az 3 yer lazım :)");
            return;
        }

        // Generate random indices for the winners
        const winnerIndices = [];
        while (winnerIndices.length < 3) {
            const randomIndex = Math.floor(Math.random() * locationCount);
            if (!winnerIndices.includes(randomIndex)) {
                winnerIndices.push(randomIndex);
            }
        }

        // Display the winners
        const winnerNames = [];
        winnerIndices.forEach((index, position) => {
            const locationName = locationItems[index].textContent;
            winnerNames.push(`${position + 1}st Winner: ${locationName}`);
        });

        // Update the winner elements
        winners.innerHTML = winnerNames.join("<br>");

        // Hide the "RAFFLE!" button and show the "Re-raffle" button
        raffleBtn.classList.add("hidden");
        reRaffleBtn.classList.remove("hidden");
    });

    // Event listener for the "Add New Location" button
    addLocationBtn.addEventListener("click", () => {
        addLocationForm.classList.remove("hidden");
        newLocationInput.focus();
    });

    // Event listener for submitting a new location
    submitLocationBtn.addEventListener("click", () => {
        const locationName = newLocationInput.value.trim();
        if (locationName !== "") {
            // Create a new location element
            const locationItem = document.createElement("div");
            locationItem.textContent = locationName;

            // Append the location element to the list
            locationList.appendChild(locationItem);

            // Clear the input field
            newLocationInput.value = "";
        }

        // Hide the location input form
        addLocationForm.classList.add("hidden");
    });
});
