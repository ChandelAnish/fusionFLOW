import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import './ExpenseManagement.css'; // Import the custom purple theme

const ExpenseManagement = () => {
  const [expenses, setExpenses] = useState([]);
  const [expense, setExpense] = useState({ name: "", amount: "", date: "" });

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expense.name && expense.amount && expense.date) {
      setExpenses([...expenses, expense]);
      setExpense({ name: "", amount: "", date: "" });
    }
  };

  const totalAmount = expenses.reduce((total, exp) => total + parseFloat(exp.amount), 0);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 text-white">Expense Management</h2>

      {/* Expense Form */}
      <Form onSubmit={handleSubmit} className="bg-purple p-5 rounded shadow-lg">
        <Form.Group controlId="formName">
          <Form.Label className="text-white">Expense Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter expense name"
            name="name"
            value={expense.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formAmount" className="mt-3">
          <Form.Label className="text-white">Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            name="amount"
            value={expense.amount}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDate" className="mt-3">
          <Form.Label className="text-white">Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={expense.date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="light" type="submit" className="mt-3">
          Add Expense
        </Button>
      </Form>

      {/* Expense Table */}
      {expenses.length > 0 && (
        <Table striped bordered hover variant="dark" className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Expense Name</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{exp.name}</td>
                <td>${exp.amount}</td>
                <td>{exp.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Total Amount */}
      <h3 className="text-center text-white mt-4">Total: ${totalAmount.toFixed(2)}</h3>
    </div>
  );
};

export default ExpenseManagement;
