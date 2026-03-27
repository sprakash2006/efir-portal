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
            <label className="form-label" htmlFor="pi-uid">UID</label>
            <input id="pi-uid" type="text" className="form-input" value={uid} onChange={(e) => setUid(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="pi-first-name">First Name <span className="required">*</span></label>
            <input id="pi-first-name" type="text" className="form-input form-input-wide" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="pi-middle-name">Middle Name</label>
            <input id="pi-middle-name" type="text" className="form-input form-input-wide" value={middleName} onChange={(e) => setMiddleName(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="pi-last-name">Last Name</label>
            <input id="pi-last-name" type="text" className="form-input form-input-wide" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="pi-relation-type">Relation Type</label>
            <select id="pi-relation-type" className="form-select" value={relationType} onChange={(e) => setRelationType(e.target.value)}>
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
            <label className="form-label" htmlFor="pi-nature-of-complaint">Nature of Complaint <span className="required">*</span></label>
            <select id="pi-nature-of-complaint" className="form-select" value={natureOfComplaint} onChange={(e) => setNatureOfComplaint(e.target.value)}>
              <option value="">Select</option>
              <option value="theft">Theft</option>
              <option value="fraud">Fraud</option>
              <option value="assault">Assault</option>
              <option value="cybercrime">Cybercrime</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="pi-email">Email ID</label>
            <input id="pi-email" type="email" className="form-input form-input-wide" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="pi-mobile-cc">Mobile No. <span className="required">*</span></label>
            <div className="phone-group">
              <span className="phone-prefix">+</span>
              <input id="pi-mobile-cc" type="text" className="form-input form-input-code" value={mobileCountryCode} onChange={(e) => setMobileCountryCode(e.target.value)} />
              <input id="pi-mobile-no" type="text" className="form-input form-input-phone" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="pi-landline-std">Landline No.</label>
            <div className="phone-group">
              <span className="phone-prefix">+</span>
              <input id="pi-landline-std" type="text" className="form-input form-input-landline" value={landlineStd} onChange={(e) => setLandlineStd(e.target.value)} />
              <input id="pi-landline-code" type="text" className="form-input form-input-landline" value={landlineCode} onChange={(e) => setLandlineCode(e.target.value)} />
              <input id="pi-landline-no" type="text" className="form-input form-input-landline" value={landlineNo} onChange={(e) => setLandlineNo(e.target.value)} />
            </div>
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="pi-relative-name">Relative Name</label>
            <input id="pi-relative-name" type="text" className="form-input form-input-wide" value={relativeName} onChange={(e) => setRelativeName(e.target.value)} />
          </div>
        </div>
      </div>

      {/* ─── Age Panel ─── */}
      <fieldset className="age-panel">
        <legend>Age Panel</legend>
        <div className="form-row">
          <label className="form-label" htmlFor="pi-dob">Date of Birth</label>
          <div className="date-input-group">
            <input id="pi-dob" type="date" className="form-input form-input-date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
          </div>
        </div>
      </fieldset>

      <div className="form-actions">
        <button id="pi-btn-clear" className="btn-clear" onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default PersonalInformation;
