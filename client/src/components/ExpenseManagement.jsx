import React, { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";

const ExpenseManagement = () => {
  const [friends, setFriends] = useState([
    { name: "Alice", balance: 0 },
    { name: "Bob", balance: 0 },
    { name: "Charlie", balance: 0 },
  ]);

  const [expense, setExpense] = useState({ description: "", amount: "", paidBy: "", sharedWith: [] });
  const [expenseHistory, setExpenseHistory] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setExpense((prevExpense) => ({
      ...prevExpense,
      sharedWith: checked
        ? [...prevExpense.sharedWith, value]
        : prevExpense.sharedWith.filter((friend) => friend !== value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amountPerFriend = expense.amount / expense.sharedWith.length;

    const updatedFriends = friends.map((friend) => {
      if (friend.name === expense.paidBy) {
        return { ...friend, balance: friend.balance + parseFloat(expense.amount) - amountPerFriend };
      } else if (expense.sharedWith.includes(friend.name)) {
        return { ...friend, balance: friend.balance - amountPerFriend };
      } else {
        return friend;
      }
    });

    setFriends(updatedFriends);
    setExpenseHistory([...expenseHistory, expense]);
    setExpense({ description: "", amount: "", paidBy: "", sharedWith: [] });
  };

  return (
    <div className="container my-5 p-4 bg-light rounded shadow-lg" style={{ maxWidth: "900px" }}>
      <h2 className="text-center mb-4 text-purple">Expenses </h2>

      {/* Add Expense Form */}
      <Form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                name="description"
                value={expense.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>
        </div>

        <Form.Group controlId="formPaidBy" className="mb-3">
          <Form.Label>Paid by</Form.Label>
          <Form.Control
            as="select"
            name="paidBy"
            value={expense.paidBy}
            onChange={handleChange}
            required
          >
            <option value="">Select a friend</option>
            {friends.map((friend, index) => (
              <option key={index} value={friend.name}>
                {friend.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Shared with</Form.Label>
          <div>
            {friends.map((friend, index) => (
              <Form.Check
                key={index}
                type="checkbox"
                label={friend.name}
                value={friend.name}
                checked={expense.sharedWith.includes(friend.name)}
                onChange={handleCheckboxChange}
                className="form-check-purple"
              />
            ))}
          </div>
        </Form.Group>

        <Button variant="primary" type="submit" className="btn-purple w-100">
          Add Expense
        </Button>
      </Form>

      {/* Friends Balances */}
      <h3 className="text-center mt-5">Balances</h3>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Friend</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {friends.map((friend, index) => (
            <tr key={index}>
              <td>{friend.name}</td>
              <td>{friend.balance >= 0 ? `$${friend.balance.toFixed(2)} owed` : `$${Math.abs(friend.balance).toFixed(2)} to pay`}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Expense History */}
      {expenseHistory.length > 0 && (
        <>
          <h3 className="text-center mt-5">Expense History</h3>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Paid By</th>
                <th>Shared With</th>
              </tr>
            </thead>
            <tbody>
              {expenseHistory.map((exp, index) => (
                <tr key={index}>
                  <td>{exp.description}</td>
                  <td>${exp.amount}</td>
                  <td>{exp.paidBy}</td>
                  <td>{exp.sharedWith.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default ExpenseManagement;
