import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./BatchList.css";

const BatchList = () => {
  const [batches, setBatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = () => {
    const token = localStorage.getItem('token');
    axios.get('https://localhost:7195/api/Batch', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log(response.data);
      setBatches(response.data);
    })
    .catch(error => {
      console.error('Error fetching batches:', error);
    });
  };

  const handleDelete = async (batchId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this batch?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://localhost:7195/api/Batch/${batchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Batch deleted successfully!");
      setBatches(batches.filter(batch => batch.batchId !== batchId)); // Remove from UI
    } catch (error) {
      console.error('Error deleting batch:', error);
      alert("Failed to delete batch.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    <div className="batch-list-container">
      <h2>Batch List</h2>
      <div className="button-group">
        <button onClick={() => navigate('/add')}>Add Batch</button>
      </div>

      {batches.length === 0 ? (
        <p>No batches found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Start Date</th>
              <th>Seats</th>
              {/*<th>Created By</th>
              <th>Created On</th>
              <th>Is Active</th>*/}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch) => (
              <tr key={batch.batchId}>
                <td>{batch.batchId}</td>
                <td>{batch.name}</td>
                <td>{new Date(batch.startDate).toLocaleDateString()}</td>
                <td>{batch.seats}</td>
                {/*<td>{batch.createdBy}</td>
                <td>{new Date(batch.createdOn).toLocaleDateString()}</td>
                <td>{batch.isActive ? 'Yes' : 'No'}</td>*/}
                <td>
                  <button className="edit-button" onClick={() => navigate(`/edit/${batch.batchId}`)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDelete(batch.batchId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default BatchList;
