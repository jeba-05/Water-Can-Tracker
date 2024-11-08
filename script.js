// Select elements
const minusButton = document.getElementById("minusButton");
const plusButton = document.getElementById("plusButton");
const canCountDisplay = document.getElementById("canCount");
const doneButton = document.getElementById("doneButton");
const dateInput = document.getElementById("date");

let canCount = 0;

// Increase can count
plusButton.addEventListener("click", () => {
    canCount++;
    canCountDisplay.textContent = canCount;
});

// Decrease can count
minusButton.addEventListener("click", () => {
    if (canCount > 0) {
        canCount--;
        canCountDisplay.textContent = canCount;
    }
});

// Handle "Done" button click
doneButton.addEventListener("click", () => {
    const date = dateInput.value;
    if (date === "") {
        alert("Please select a date.");
        return;
    }
    
    // Save the data to localStorage
    const record = {
        date: date,
        cans: canCount,
    };

    // Get existing records
    const records = JSON.parse(localStorage.getItem("records")) || [];
    records.push(record);
    localStorage.setItem("records", JSON.stringify(records));

    // Reset the counter
    canCount = 0;
    canCountDisplay.textContent = canCount;
    alert("Data saved!");

});
// Function to add a new record (called when you click "Done")
function addRecord() {
    // Get the input values for date and can count
    const date = document.getElementById("dateInput").value;
    let cans = document.getElementById("canCountInput").value;

    // Convert can count to a number for validation
    cans = Number(cans);

    // Check if can count is zero, empty, or not a valid number
    if (!cans || cans <= 0) {
        alert("Warning: Please enter a can count greater than zero.");
        return; // Stops the function if the count is zero or invalid
    }

    // If the count is valid, proceed with saving the record
    const newRecord = { date, cans };
    records.push(newRecord);

    // Sort the records by date
    records.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Save the updated records list to local storage
    localStorage.setItem("records", JSON.stringify(records));

    // Update the display to show the new record
    displayRecords();
}
// Function to format date to dd/mm/yyyy
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

// Function to add a new record
function addRecord() {
    const date = document.getElementById("dateInput").value;
    let cans = document.getElementById("canCountInput").value;

    // Convert can count to a number for validation
    cans = Number(cans);

    // Check if can count is zero, empty, or not valid
    if (!cans || cans <= 0) {
        alert("Warning: Please enter a can count greater than zero.");
        return; // Stops the function if the count is zero or invalid
    }

    // Create a new record object with formatted date
    const newRecord = { date, cans };
    records.push(newRecord);

    // Sort the records by date in ascending order
    records.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Save the updated records list to local storage
    localStorage.setItem("records", JSON.stringify(records));

    // Update the display to show the new record
    displayRecords();
}

// Function to display all records
function displayRecords() {
    const recordsContainer = document.getElementById("recordsContainer");
    recordsContainer.innerHTML = ""; // Clear previous records

    // Loop through each record and create table rows
    records.forEach((record, index) => {
        const totalAmount = record.cans * canPrice;
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${formatDate(record.date)}</td> <!-- Display date in dd/mm/yyyy format -->
            <td>${record.cans}</td>
            <td>₹${totalAmount}</td>
            <td><button class="delete-button" onclick="deleteRecord(${index})">Delete</button></td>
        `;

        recordsContainer.appendChild(row);
    });
}
