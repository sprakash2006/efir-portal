import React, { useState } from "react";

const AccusedDetail = ({ accusedRecords, setAccusedRecords }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const handleAddNew = () => {
    setShowAddForm(true);
  };

  const handleSave = () => {
    if (!newName) return;
    const newRecord = {
      id: Date.now(),
      name: newName,
      address: newAddress,
    };
    setAccusedRecords([...accusedRecords, newRecord]);
    setNewName("");
    setNewAddress("");
    setShowAddForm(false);
  };

  const handleDelete = (id) => {
    setAccusedRecords(accusedRecords.filter((r) => r.id !== id));
  };

  return (
    <div className="accused-detail-section">
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: "6%" }}>S.No.</th>
              <th style={{ width: "40%" }}>Name</th>
              <th style={{ width: "38%" }}>Address</th>
              <th style={{ width: "8%" }}>Edit</th>
              <th style={{ width: "8%" }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {accusedRecords.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-records">No Record Found</td>
              </tr>
            ) : (
              accusedRecords.map((record, index) => (
                <tr key={record.id}>
                  <td>{index + 1}</td>
                  <td>{record.name}</td>
                  <td>{record.address}</td>
                  <td><button className="btn-edit-row">Edit</button></td>
                  <td><button className="btn-delete-row" onClick={() => handleDelete(record.id)}>Delete</button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showAddForm && (
        <div className="add-accused-form">
          <div className="form-row">
            <label className="form-label">Name</label>
            <input type="text" className="form-input form-input-wide" value={newName} onChange={(e) => setNewName(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label">Address</label>
            <input type="text" className="form-input form-input-wide" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />
          </div>
          <div className="form-actions">
            <button className="btn-add" onClick={handleSave}>Save</button>
          </div>
        </div>
      )}

      <div className="form-actions" style={{ justifyContent: "flex-end" }}>
        <button className="btn-add" onClick={handleAddNew}>Add New</button>
      </div>
    </div>
  );
};

export default AccusedDetail;
