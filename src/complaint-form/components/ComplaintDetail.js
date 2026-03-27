import React from "react";

const ComplaintDetail = ({
  dateOfComplaint, setDateOfComplaint,
  complaintDescription, setComplaintDescription,
  remarks, setRemarks,
  complaintFileUpload, setComplaintFileUpload,
}) => {
  const descMaxChars = 8000;
  const remarksMaxChars = 8000;
  const descRemaining = descMaxChars - complaintDescription.length;
  const remarksRemaining = remarksMaxChars - remarks.length;

  const handleClear = () => {
    setComplaintDescription("");
    setRemarks("");
    setComplaintFileUpload("");
  };

  return (
    <div className="complaint-detail-section">
      <div className="form-row">
        <label className="form-label form-label-wide" htmlFor="cd-date">Date of Complaint</label>
        <input
          id="cd-date"
          type="date"
          className="form-input form-input-date"
          value={dateOfComplaint}
          onChange={(e) => setDateOfComplaint(e.target.value)}
        />
      </div>

      <div className="form-row form-row-textarea">
        <label className="form-label form-label-wide" htmlFor="cd-description">Complaint Description <span className="required">*</span></label>
        <div className="textarea-with-counter">
          <textarea
            id="cd-description"
            className="form-textarea form-textarea-large"
            rows="5"
            maxLength={descMaxChars}
            value={complaintDescription}
            onChange={(e) => setComplaintDescription(e.target.value)}
          />
          <span className="char-counter">Character Count Remaining : <span className="char-count-number">{descRemaining}</span></span>
        </div>
      </div>

      <div className="form-row form-row-textarea">
        <label className="form-label form-label-wide" htmlFor="cd-remarks">Remarks</label>
        <div className="textarea-with-counter">
          <textarea
            id="cd-remarks"
            className="form-textarea form-textarea-large"
            rows="5"
            maxLength={remarksMaxChars}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
          <span className="char-counter">Character Count Remaining : <span className="char-count-number">{remarksRemaining}</span></span>
        </div>
      </div>

      {/* ─── File Upload ─── */}
      <fieldset className="file-upload-panel">
        <legend>File Upload</legend>
        <div className="file-upload-row">
          <input id="cd-file-upload" type="text" className="form-input form-input-file" value={complaintFileUpload} readOnly />
          <button id="cd-btn-browse" className="btn-browse">🔍</button>
        </div>
      </fieldset>

      <div className="form-actions">
        <button id="cd-btn-clear" className="btn-clear" onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default ComplaintDetail;
