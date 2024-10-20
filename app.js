let url = 'http://localhost:3000/api/expenses';

const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total-display');

let expenses = [];
let editingExpenseId = null;

// Fetch existing expenses
fetch(url)
.then(response => response.json())
.then(data => {
   expenses = data;
   renderExpenses(expenses);
});

// Render expenses in the UI
function renderExpenses(expenses) {
   expenseList.innerHTML = '';
   let total = 0;

   expenses.forEach(expense => {
      total += expense.amount; // Calculate total amount
      const li = document.createElement('li');
      li.className = 'expense-item'; // Add class for styling
      li.setAttribute('data-id', expense._id); // Store ID for reference

      li.innerHTML = `
         <span class="expense-details">${expense.name} - $${expense.amount} (${expense.category})</span>
         <button class="edit-button">Edit</button>
         <button class="delete-button">Delete</button>
      `;

      // Add event listeners for buttons
      li.querySelector('.edit-button').onclick = () => editExpense(expense._id, expense.name, expense.amount, expense.category);
      li.querySelector('.delete-button').onclick = () => deleteExpense(expense._id);

      expenseList.appendChild(li);
   });

   // Update total display
   totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
}

// Edit an existing expense
function editExpense(id, name, amount, category) {
   editingExpenseId = id; // Set the ID of the expense being edited
   document.getElementById('name').value = name;
   document.getElementById('amount').value = amount;
   document.getElementById('category').value = category;
}

// Add or Edit an expense
async function saveExpense(event) {
   event.preventDefault(); // Prevent form submission

   const name = document.getElementById('name').value;
   const amount = parseFloat(document.getElementById('amount').value);
   const category = document.getElementById('category').value;

   let response;

   if (editingExpenseId) {
      // Update existing expense
      response = await fetch(`${url}/${editingExpenseId}`, {
         method:'PUT',
         headers:{'Content-Type':'application/json'},
         body: JSON.stringify({ name, amount, category }),
      });

      if (response.ok) {
         const updatedExpense = await response.json();
         expenses = expenses.map(exp => (exp._id === editingExpenseId ? updatedExpense : exp));
         editingExpenseId = null; // Reset editing ID
         clearForm(); // Clear form fields after editing
      }

   } else {
      // Add new expense
      response = await fetch(url, {
         method:'POST',
         headers:{'Content-Type':'application/json'},
         body : JSON.stringify({ name , amount , category }),
      });

      if (response.ok) {
         const newExpense = await response.json();
         expenses.push(newExpense);
         clearForm(); // Clear form fields after adding
      }
   }

   renderExpenses(expenses); // Refresh the list and update total
}

// Delete an existing expense
async function deleteExpense(id) {
   const response = await fetch(`${url}/${id}`, { method:'DELETE' });

   if (response.ok) {
      expenses = expenses.filter(exp => exp._id !== id);
      renderExpenses(expenses); // Refresh the list and update total
   } else {
      alert('Error deleting expense');
   }
}

// Clear form fields
function clearForm() {
   document.getElementById('name').value = '';
   document.getElementById('amount').value = '';
   document.getElementById('category').value = '';
}

// Add event listener for form submission
expenseForm.addEventListener('submit', saveExpense);