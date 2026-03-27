import React from "react";

const IncidentDetail = ({
  placeOfIncident, setPlaceOfIncident,
  typeOfIncident, setTypeOfIncident,
  isDateTimeKnown, setIsDateTimeKnown,
  incidentDateFrom, setIncidentDateFrom,
  incidentTimeFrom, setIncidentTimeFrom,
  incidentDateTo, setIncidentDateTo,
  incidentTimeTo, setIncidentTimeTo,
  incidentFileUpload, setIncidentFileUpload,
}) => {
  const handleClear = () => {
    setPlaceOfIncident(""); setTypeOfIncident("");
    setIsDateTimeKnown("yes"); setIncidentDateFrom("");
    setIncidentTimeFrom(""); setIncidentDateTo("");
    setIncidentTimeTo(""); setIncidentFileUpload("");
  };

  return (
    <div className="incident-detail-section">
      <div className="form-two-columns">
        {/* ─── Left Column ─── */}
        <div className="form-column">
          <div className="form-row form-row-textarea">
            <label className="form-label">Place of Incident <span className="required">*</span></label>
            <textarea className="form-textarea" rows="3" value={placeOfIncident} onChange={(e) => setPlaceOfIncident(e.target.value)} />
          </div>
          <div className="form-row form-row-textarea">
            <label className="form-label">Type of Incident</label>
            <textarea className="form-textarea" rows="3" value={typeOfIncident} onChange={(e) => setTypeOfIncident(e.target.value)} />
          </div>
        </div>

        {/* ─── Right Column ─── */}
        <div className="form-column">
          <div className="form-row">
            <label className="form-label">Is Date / Time of Incident Known? <span className="required">*</span></label>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name="isDateTimeKnown" value="yes" checked={isDateTimeKnown === "yes"} onChange={(e) => setIsDateTimeKnown(e.target.value)} />
                Yes
              </label>
              <label className="radio-label">
                <input type="radio" name="isDateTimeKnown" value="no" checked={isDateTimeKnown === "no"} onChange={(e) => setIsDateTimeKnown(e.target.value)} />
                No
              </label>
            </div>
          </div>
          <div className="form-row">
            <label className="form-label">Date of Incident (From) <span className="required">*</span></label>
            <div className="datetime-group">
              <input type="date" className="form-input form-input-date" value={incidentDateFrom} onChange={(e) => setIncidentDateFrom(e.target.value)} />
              <span className="time-label">HH:MM</span>
              <input type="text" className="form-input form-input-time" value={incidentTimeFrom} onChange={(e) => setIncidentTimeFrom(e.target.value)} placeholder="" />
            </div>
          </div>
          <div className="form-row">
            <label className="form-label">Date of Incident (To) <span className="required">*</span></label>
            <div className="datetime-group">
              <input type="date" className="form-input form-input-date" value={incidentDateTo} onChange={(e) => setIncidentDateTo(e.target.value)} />
              <span className="time-label">HH:MM</span>
              <input type="text" className="form-input form-input-time" value={incidentTimeTo} onChange={(e) => setIncidentTimeTo(e.target.value)} placeholder="" />
            </div>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button className="btn-clear" onClick={handleClear}>Clear</button>
      </div>

      {/* ─── File Upload ─── */}
      <fieldset className="file-upload-panel">
        <legend>File Upload</legend>
        <div className="file-upload-row">
          <input type="text" className="form-input form-input-file" value={incidentFileUpload} readOnly />
          <button className="btn-browse">🔍</button>
        </div>
      </fieldset>
    </div>
  );
};

export default IncidentDetail;
