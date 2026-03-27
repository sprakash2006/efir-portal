import React from "react";

const IncidentDetail = ({
  placeOfIncident, setPlaceOfIncident,
  typeOfIncident, setTypeOfIncident,
  isDateTimeKnown, setIsDateTimeKnown,
  incidentDate, setIncidentDate,
  incidentTime, setIncidentTime,
  incidentFileUpload, setIncidentFileUpload,
}) => {
  const handleClear = () => {
    setPlaceOfIncident(""); setTypeOfIncident("");
    setIsDateTimeKnown("yes"); setIncidentDate("");
    setIncidentTime(""); setIncidentFileUpload("");
  };

  return (
    <div className="incident-detail-section">
      <div className="form-two-columns">
        {/* ─── Left Column ─── */}
        <div className="form-column">
          <div className="form-row form-row-textarea">
            <label className="form-label" htmlFor="incident-place">Place of Incident <span className="required">*</span></label>
            <textarea id="incident-place" className="form-textarea" rows="3" value={placeOfIncident} onChange={(e) => setPlaceOfIncident(e.target.value)} />
          </div>
          <div className="form-row form-row-textarea">
            <label className="form-label" htmlFor="incident-type">Type of Incident</label>
            <textarea id="incident-type" className="form-textarea" rows="3" value={typeOfIncident} onChange={(e) => setTypeOfIncident(e.target.value)} />
          </div>
        </div>

        {/* ─── Right Column ─── */}
        <div className="form-column">
          <div className="form-row">
            <label className="form-label">Is Date / Time of Incident Known? <span className="required">*</span></label>
            <div className="radio-group">
              <label className="radio-label">
                <input id="incident-datetime-known-yes" type="radio" name="isDateTimeKnown" value="yes" checked={isDateTimeKnown === "yes"} onChange={(e) => setIsDateTimeKnown(e.target.value)} />
                Yes
              </label>
              <label className="radio-label">
                <input id="incident-datetime-known-no" type="radio" name="isDateTimeKnown" value="no" checked={isDateTimeKnown === "no"} onChange={(e) => setIsDateTimeKnown(e.target.value)} />
                No
              </label>
            </div>
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="incident-date">Date of Incident <span className="required">*</span></label>
            <div className="datetime-group">
              <input id="incident-date" type="date" className="form-input form-input-date" value={incidentDate} onChange={(e) => setIncidentDate(e.target.value)} />
              <span className="time-label">HH:MM</span>
              <input id="incident-time" type="text" className="form-input form-input-time" value={incidentTime} onChange={(e) => setIncidentTime(e.target.value)} placeholder="" />
            </div>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button id="incident-btn-clear" className="btn-clear" onClick={handleClear}>Clear</button>
      </div>

      {/* ─── File Upload ─── */}
      <fieldset className="file-upload-panel">
        <legend>File Upload</legend>
        <div className="file-upload-row">
          <input id="incident-file-upload" type="text" className="form-input form-input-file" value={incidentFileUpload} readOnly />
          <button id="incident-btn-browse" className="btn-browse">🔍</button>
        </div>
      </fieldset>
    </div>
  );
};

export default IncidentDetail;
