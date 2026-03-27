import React from "react";

const ComplaintSubmissionDetails = ({
  knowPoliceStation, setKnowPoliceStation,
  submissionDistrict, setSubmissionDistrict,
  submissionPoliceStation, setSubmissionPoliceStation,
}) => {
  const handleClear = () => {
    setKnowPoliceStation("yes");
    setSubmissionDistrict("");
    setSubmissionPoliceStation("");
  };

  const districtOptions = ["DHARASHIV", "PUNE", "MUMBAI", "NAGPUR", "NASHIK", "SOLAPUR"];

  return (
    <div className="submission-details-section">
      <div className="form-row">
        <label className="form-label">Do you know your Police Station? <span className="required">*</span></label>
        <div className="radio-group">
          <label className="radio-label">
            <input id="sub-know-ps-yes" type="radio" name="knowPoliceStation" value="yes" checked={knowPoliceStation === "yes"} onChange={(e) => setKnowPoliceStation(e.target.value)} />
            Yes
          </label>
          <label className="radio-label">
            <input id="sub-know-ps-no" type="radio" name="knowPoliceStation" value="no" checked={knowPoliceStation === "no"} onChange={(e) => setKnowPoliceStation(e.target.value)} />
            No
          </label>
        </div>
      </div>
      <div className="form-two-columns">
        <div className="form-column">
          <div className="form-row">
            <label className="form-label" htmlFor="sub-district">District <span className="required">*</span></label>
            <select id="sub-district" className="form-select" value={submissionDistrict} onChange={(e) => setSubmissionDistrict(e.target.value)}>
              <option value="">Select</option>
              {districtOptions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div className="form-column">
          <div className="form-row">
            <label className="form-label" htmlFor="sub-police-station">Police Station <span className="required">*</span></label>
            <select id="sub-police-station" className="form-select" value={submissionPoliceStation} onChange={(e) => setSubmissionPoliceStation(e.target.value)}>
              <option value="">Select</option>
              <option value="station1">Station 1</option>
              <option value="station2">Station 2</option>
            </select>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button id="sub-btn-clear" className="btn-clear" onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default ComplaintSubmissionDetails;
