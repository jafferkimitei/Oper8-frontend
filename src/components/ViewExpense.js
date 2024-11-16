
import React, { useEffect, useState } from 'react';
import { fetchExpenses, deleteExpense } from '../services/expense-api'; 

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const data = await fetchExpenses();
        setExpenses(data);
        setFilteredExpenses(data);
      } catch (error) {
        console.error('Error loading expenses', error);
      }
    };

    loadExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      const updatedExpenses = expenses.filter((expense) => expense._id !== id);
      setExpenses(updatedExpenses);
      setFilteredExpenses(updatedExpenses);
    } catch (error) {
      console.error('Error deleting expense', error);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredExpenses(expenses);
    } else {
      const filtered = expenses.filter((expense) =>
        expense._id &&
        (
          expense.from_location.toLowerCase().includes(term) ||
          expense.to_location.toLowerCase().includes(term)
        )
      );
      setFilteredExpenses(filtered);
    }
  };

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-6">Miscellaneous Expenses</h2>
      <input
        type="text"
        placeholder="Search by location"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full mb-4 p-3 rounded-lg border border-gray-600 dark:border-border text-[#0A1128] dark:bg-[#374151] dark:text-[#FEFCFB]"
      />
      <ul className="space-y-6">
        {filteredExpenses.map((expense) => (
          <li key={expense._id} className="p-4 bg-[#F5F1ED] dark:bg-dark-background rounded-lg shadow-md flex flex-col md:flex-row md:justify-between md:items-start">
            <div className="flex-1 mb-4 md:mb-0">
              <p className="text-lg font-semibold">
                {expense._id ? (
                  `From: ${expense.from_location} → To: ${expense.to_location}`
                ) : (
                  'No load information available'
                )}
              </p>
              <p className="text-sm text-light-text dark:text-dark-text mt-2"><strong>Type:</strong> {expense.type}</p>
              <p className="text-sm text-light-text dark:text-dark-text"><strong>Description:</strong> {expense.description}</p>
              <p className="text-sm text-light-text dark:text-dark-text"><strong>Amount:</strong> ${expense.amount}</p>
              <p className="text-sm text-light-text dark:text-dark-text"><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
              <button 
                onClick={() => handleDelete(expense._id)} 
                className="bg-red-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
            {expense.images.length > 0 && (
              <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:ml-6">
                {expense.images.map((img, index) => (
                  <img
                    key={index}
                     src={`${process.env.REACT_APP_BASE_URL}/${img}`}
                    alt={`Expense Image ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-6 border-t border-[#0A1128]/70 dark:border-border pt-4">
        <p className="text-xl"><strong>Total Amount:</strong> ${totalAmount}</p>
      </div>
    </div>
  );
};

export default ExpenseList;
