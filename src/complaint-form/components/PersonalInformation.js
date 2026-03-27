import React from "react";

const PersonalInformation = ({
  uid, setUid, firstName, setFirstName, middleName, setMiddleName,
  lastName, setLastName, relationType, setRelationType,
  dateOfBirth, setDateOfBirth, natureOfComplaint, setNatureOfComplaint,
  emailId, setEmailId, mobileCountryCode, setMobileCountryCode,
  mobileNo, setMobileNo, landlineStd, setLandlineStd,
  landlineCode, setLandlineCode, landlineNo, setLandlineNo,
  relativeName, setRelativeName,
}) => {
  const handleClear = () => {
    setUid(""); setFirstName(""); setMiddleName(""); setLastName("");
    setRelationType(""); setDateOfBirth(""); setNatureOfComplaint("");
    setEmailId(""); setMobileCountryCode("91"); setMobileNo("");
    setLandlineStd(""); setLandlineCode(""); setLandlineNo("");
    setRelativeName("");
  };

  return (
    <div className="personal-info-section">
      <div className="form-two-columns">
        {/* ─── Left Column ─── */}
        <div className="form-column">
          <div className="form-row">
            <label className="form-label">UID</label>
            <input type="text" className="form-input" value={uid} onChange={(e) => setUid(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label">First Name <span className="required">*</span></label>
            <input type="text" className="form-input form-input-wide" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label">Middle Name</label>
            <input type="text" className="form-input form-input-wide" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-input form-input-wide" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label">Relation Type</label>
            <select className="form-select" value={relationType} onChange={(e) => setRelationType(e.target.value)}>
              <option value="">Select</option>
              <option value="father">Father</option>
              <option value="mother">Mother</option>
              <option value="spouse">Spouse</option>
              <option value="guardian">Guardian</option>
            </select>
          </div>
        </div>

        {/* ─── Right Column ─── */}
        <div className="form-column">
          <div className="form-row">
            <label className="form-label">Nature of Complaint <span className="required">*</span></label>
            <select className="form-select" value={natureOfComplaint} onChange={(e) => setNatureOfComplaint(e.target.value)}>
              <option value="">Select</option>
              <option value="theft">Theft</option>
              <option value="fraud">Fraud</option>
              <option value="assault">Assault</option>
              <option value="cybercrime">Cybercrime</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Email ID</label>
            <input type="email" className="form-input form-input-wide" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label">Mobile No. <span className="required">*</span></label>
            <div className="phone-group">
              <span className="phone-prefix">+</span>
              <input type="text" className="form-input form-input-code" value={mobileCountryCode} onChange={(e) => setMobileCountryCode(e.target.value)} />
              <input type="text" className="form-input form-input-phone" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <label className="form-label">Landline No.</label>
            <div className="phone-group">
              <span className="phone-prefix">+</span>
              <input type="text" className="form-input form-input-landline" value={landlineStd} onChange={(e) => setLandlineStd(e.target.value)} />
              <input type="text" className="form-input form-input-landline" value={landlineCode} onChange={(e) => setLandlineCode(e.target.value)} />
              <input type="text" className="form-input form-input-landline" value={landlineNo} onChange={(e) => setLandlineNo(e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <label className="form-label">Relative Name</label>
            <input type="text" className="form-input form-input-wide" value={relativeName} onChange={(e) => setRelativeName(e.target.value)} />
          </div>
        </div>
      </div>

      {/* ─── Age Panel ─── */}
      <fieldset className="age-panel">
        <legend>Age Panel</legend>
        <div className="form-row">
          <label className="form-label">Date of Birth</label>
          <div className="date-input-group">
            <input type="date" className="form-input form-input-date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
          </div>
        </div>
      </fieldset>

      <div className="form-actions">
        <button className="btn-clear" onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default PersonalInformation;
