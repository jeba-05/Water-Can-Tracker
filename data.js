// Select the record list container
const recordList = document.getElementById("recordList");
const recordTable = document.getElementById("recordTable");

// Retrieve records from localStorage
let records = JSON.parse(localStorage.getItem("records")) || [];

// Fixed price per can (₹35)
const pricePerCan = 35; // ₹35 per can

// Function to display records in a table
function displayRecords() {
    recordList.innerHTML = ""; // Clear current display

    // Sort records by date in ascending order (oldest first)
    records.sort((a, b) => new Date(a.date) - new Date(b.date));

    if (records.length === 0) {
        recordList.innerHTML = "<tr><td colspan='6'>No records found.</td></tr>";
        return;
    }

    // Loop through the records and display them in the table
    records.forEach((record, index) => {
        // Calculate total amount and payable amount
        const totalAmount = record.cans * pricePerCan;
        const payableAmount = totalAmount; // Modify this if you want to calculate a split between roommates

        // Create table row for each record
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${record.date}</td>
            <td>${record.cans}</td>
            <td>₹${totalAmount}</td>
            <td>₹${payableAmount}</td>
            <td><button onclick="deleteRecord(${index})" class="deleteButton">Delete</button></td>
        `;

        recordList.appendChild(row);
    });
}

// Function to delete a record
function deleteRecord(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        // Remove the record from the array
        records.splice(index, 1);
        // Save the updated records to localStorage
        localStorage.setItem("records", JSON.stringify(records));
        // Re-display the records
        displayRecords();
    }
}

// Function to add a new record (this will be used when entering data)
function addRecord(date, cans) {
    // Create a new record object
    const newRecord = { date, cans };
    
    // Add the new record to the records array
    records.push(newRecord);

    // Sort the records by date in ascending order (oldest first)
    records.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Save the updated records to localStorage
    localStorage.setItem("records", JSON.stringify(records));

    // Re-display the records
    displayRecords();
}

// Initial display of records when the page loads
displayRecords();
