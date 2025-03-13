import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const EditBatch = () => {
  const { id } = useParams();
  const [batch, setBatch] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBatch = async () => {
      try {
        const res = await API.get(`/Batch/${id}`);
        setBatch(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch batch");
      }
    };

    fetchBatch();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const userId = 1; // Replace with actual logged-in user ID
    const updatedDate = new Date();

    const updatedBatch = {
      ...batch,
      updatedBy: userId,
      updatedOn: updatedDate,
    };

    try {
      await API.put(`/Batch/${id}`, updatedBatch);
      navigate("/batches");
    } catch (err) {
      console.error(err);
      alert("Failed to update batch");
    }
  };

  if (!batch) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Batch</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={batch.name}
          onChange={(e) => setBatch({ ...batch, name: e.target.value })}
          required
        />
        <br />

        <input
          type="date"
          value={batch.startDate.slice(0, 10)}
          onChange={(e) => setBatch({ ...batch, startDate: e.target.value })}
          required
        />
        <br />

        <input
          type="number"
          value={batch.seats}
          onChange={(e) => setBatch({ ...batch, seats: e.target.value })}
          required
        />
        <br />

        <button type="submit">Update Batch</button>
      </form>
    </div>
  );
};

export default EditBatch;
