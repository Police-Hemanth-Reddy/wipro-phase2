import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AddBatch.css";

const AddBatch = () => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [seats, setSeats] = useState('');
  const [error, setError] = useState(''); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const seatCount = parseInt(seats);
    if (isNaN(seatCount) || seatCount <= 0) {
      setError("Seats must be a positive number greater than zero.");
      return;
    }
    setError(""); // Clear error when valid

    // Retrieve token from local storage
    const token = localStorage.getItem('token');

    if (!token) {
      setError('No token found. Please login again.');
      navigate('/');
      return;
    }

    // Construct batch object
    const batch = {
      name: name,
      startDate: startDate,
      seats: seatCount,
      createdBy: 1,
      createdOn: new Date().toISOString(),
      updatedBy: null,
      updatedOn: null,
      isActive: true
    };

    console.log('Submitting batch:', batch);

    try {
      const response = await axios.post('https://localhost:7195/api/Batch', batch, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Batch added:', response.data);
      navigate('/batches');
    } catch (error) {
      console.error('Error adding batch:', error.response || error.message);
      setError(error.response ? `Error: ${error.response.data}` : 'Failed to add batch.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="add-batch-container">
      <h2>Add New Batch</h2>

      <div>
        <button onClick={() => navigate('/batches')}>Back to Batches</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name: </label><br />
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter batch name"
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Start Date: </label><br />
          <input
            type="date"
            value={startDate}
            required
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Seats: </label><br />
          <input
            type="number"
            value={seats}
            required
            min="1"  // Prevents entering negative values
            onChange={(e) => setSeats(e.target.value)}
            placeholder="Enter number of seats"
          />
          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
        </div>

        <button type="submit">Add Batch</button>
      </form>
    </div>
  );
};

export default AddBatch;
