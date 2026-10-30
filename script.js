let expenses = [];
let totalExpense = 0;

// Add Expense
function addExpense() {

    const title = document.getElementById("title").value.trim();
    const amount = document.getElementById("amount").value;
    const category = document.getElementById("category").value;

    // Validation
    if (title === "" || amount === "" || category === "") {
        alert("Please fill all fields");
        return;
    }

    if (Number(amount) <= 0) {
        alert("Amount must be greater than 0");
        return;
    }

    const expense = {
        id: Date.now(),
        title,
        amount: Number(amount),
        category
    };

    expenses.push(expense);

    displayExpenses();
    updateTotal();

    // Clear Inputs
    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
}

// Display Expenses
function displayExpenses() {

    const tableBody =
        document.getElementById("expenseTableBody");

    tableBody.innerHTML = "";

    expenses.forEach(expense => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.title}</td>
            <td>₹${expense.amount}</td>
            <td>${expense.category}</td>
            <td>
                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteExpense(${expense.id})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Delete Expense
function deleteExpense(id) {

    expenses =
        expenses.filter(expense => expense.id !== id);

    displayExpenses();
    updateTotal();
}

// Update Total Expense
function updateTotal() {

    totalExpense = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    document.getElementById("totalAmount").innerText =
        `Total Expense: ₹${totalExpense}`;
}

// Search Expense
function searchExpense() {

    const searchText =
        document.getElementById("search")
        .value
        .toLowerCase();

    const rows =
        document.querySelectorAll("#expenseTableBody tr");

    rows.forEach(row => {

        if (
            row.textContent
                .toLowerCase()
                .includes(searchText)
        ) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}