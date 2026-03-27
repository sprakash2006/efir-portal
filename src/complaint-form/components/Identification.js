import React from "react";

const Identification = ({
  countryOfNationality, setCountryOfNationality,
  identificationType, setIdentificationType,
  identificationNumber, setIdentificationNumber,
  identificationRecords, setIdentificationRecords,
}) => {
  const handleAdd = () => {
    if (!identificationType || !identificationNumber) return;
    const newRecord = {
      id: Date.now(),
      type: identificationType,
      number: identificationNumber,
      passportIssuePlace: "",
      passportIssueDate: "",
    };
    setIdentificationRecords([...identificationRecords, newRecord]);
    setIdentificationType("");
    setIdentificationNumber("");
  };

  const handleDelete = (id) => {
    setIdentificationRecords(identificationRecords.filter((r) => r.id !== id));
  };

  const handleClear = () => {
    setCountryOfNationality("INDIA");
    setIdentificationType("");
    setIdentificationNumber("");
  };

  return (
    <div className="identification-section">
      <div className="form-column">
        <div className="form-row">
          <label className="form-label" htmlFor="id-country-nationality">Country of Nationality <span className="required">*</span></label>
          <select id="id-country-nationality" className="form-select" value={countryOfNationality} onChange={(e) => setCountryOfNationality(e.target.value)}>
            <option value="INDIA">INDIA</option>
          </select>
        </div>
        <div className="form-row">
          <label className="form-label" htmlFor="id-type">Identification Type</label>
          <select id="id-type" className="form-select" value={identificationType} onChange={(e) => setIdentificationType(e.target.value)}>
            <option value="">Select</option>
            <option value="Aadhaar">Aadhaar</option>
            <option value="PAN">PAN Card</option>
            <option value="Passport">Passport</option>
            <option value="Driving License">Driving License</option>
            <option value="Voter ID">Voter ID</option>
          </select>
        </div>
        <div className="form-row">
          <label className="form-label" htmlFor="id-number">Identification Number</label>
          <input id="id-number" type="text" className="form-input form-input-wide" value={identificationNumber} onChange={(e) => setIdentificationNumber(e.target.value)} />
        </div>
      </div>

      <div className="form-actions" style={{ justifyContent: "flex-end" }}>
        <button id="id-btn-add" className="btn-add" onClick={handleAdd}>Add</button>
      </div>

      {/* ─── Table ─── */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: "8%" }}>S.No</th>
              <th style={{ width: "22%" }}>Identification Type</th>
              <th style={{ width: "25%" }}>Identification Number</th>
              <th style={{ width: "20%" }}>Passport Issue Place</th>
              <th style={{ width: "20%" }}>Passport Issue Date (DD/MM/YYYY)</th>
              <th style={{ width: "5%" }}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {identificationRecords.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-records">No Records Available</td>
              </tr>
            ) : (
              identificationRecords.map((record, index) => (
                <tr key={record.id}>
                  <td>{index + 1}</td>
                  <td>{record.type}</td>
                  <td>{record.number}</td>
                  <td>{record.passportIssuePlace}</td>
                  <td>{record.passportIssueDate}</td>
                  <td>
                    <button id={`id-btn-delete-${index}`} className="btn-delete-row" onClick={() => handleDelete(record.id)}>✕</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="form-actions">
        <button id="id-btn-clear" className="btn-clear" onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default Identification;
