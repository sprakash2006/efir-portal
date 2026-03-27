import React, { useState } from "react";
import MainTabs from "./components/MainTabs";
import ComplainantDetail from "./components/ComplainantDetail";
import AccusedDetail from "./components/AccusedDetail";
import IncidentDetail from "./components/IncidentDetail";
import ComplaintSubmissionDetails from "./components/ComplaintSubmissionDetails";
import ComplaintDetail from "./components/ComplaintDetail";
import "./style.css";

const Form = () => {
  // ─── Main tab state ───
  const [activeMainTab, setActiveMainTab] = useState("complainantDetail");

  // ─── Complainant Detail → Sub-tab state ───
  const [activeSubTab, setActiveSubTab] = useState("personalInformation");

  // ─── Personal Information state ───
  const [uid, setUid] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [relationType, setRelationType] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [natureOfComplaint, setNatureOfComplaint] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileCountryCode, setMobileCountryCode] = useState("91");
  const [mobileNo, setMobileNo] = useState("");
  const [landlineStd, setLandlineStd] = useState("");
  const [landlineCode, setLandlineCode] = useState("");
  const [landlineNo, setLandlineNo] = useState("");
  const [relativeName, setRelativeName] = useState("");

  // ─── Address state ───
  const [addressHouseNo, setAddressHouseNo] = useState("");
  const [addressStreetName, setAddressStreetName] = useState("");
  const [addressColony, setAddressColony] = useState("");
  const [addressVillage, setAddressVillage] = useState("");
  const [addressTehsil, setAddressTehsil] = useState("");
  const [addressCountry, setAddressCountry] = useState("INDIA");
  const [addressState, setAddressState] = useState("MAHARASHTRA");
  const [addressDistrict, setAddressDistrict] = useState("");
  const [addressPoliceStation, setAddressPoliceStation] = useState("");
  const [addressPincode, setAddressPincode] = useState("");

  // ─── Identification state ───
  const [countryOfNationality, setCountryOfNationality] = useState("INDIA");
  const [identificationType, setIdentificationType] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [identificationRecords, setIdentificationRecords] = useState([]);

  // ─── Accused Detail state ───
  const [accusedRecords, setAccusedRecords] = useState([]);

  // ─── Incident Detail state ───
  const [placeOfIncident, setPlaceOfIncident] = useState("");
  const [typeOfIncident, setTypeOfIncident] = useState("");
  const [isDateTimeKnown, setIsDateTimeKnown] = useState("yes");
  const [incidentDate, setIncidentDate] = useState("");
  const [incidentTime, setIncidentTime] = useState("");
  const [incidentFileUpload, setIncidentFileUpload] = useState("");

  // ─── Complaint Submission Details state ───
  const [knowPoliceStation, setKnowPoliceStation] = useState("yes");
  const [submissionDistrict, setSubmissionDistrict] = useState("");
  const [submissionPoliceStation, setSubmissionPoliceStation] = useState("");

  // ─── Complaint Detail state ───
  const [dateOfComplaint, setDateOfComplaint] = useState("");
  const [complaintDescription, setComplaintDescription] = useState("");
  const [remarks, setRemarks] = useState("");
  const [complaintFileUpload, setComplaintFileUpload] = useState("");

  // ─── Render active main tab content ───
  const renderMainTabContent = () => {
    switch (activeMainTab) {
      case "complainantDetail":
        return (
          <ComplainantDetail
            activeSubTab={activeSubTab}
            setActiveSubTab={setActiveSubTab}
            // Personal Information
            uid={uid} setUid={setUid}
            firstName={firstName} setFirstName={setFirstName}
            middleName={middleName} setMiddleName={setMiddleName}
            lastName={lastName} setLastName={setLastName}
            relationType={relationType} setRelationType={setRelationType}
            dateOfBirth={dateOfBirth} setDateOfBirth={setDateOfBirth}
            natureOfComplaint={natureOfComplaint} setNatureOfComplaint={setNatureOfComplaint}
            emailId={emailId} setEmailId={setEmailId}
            mobileCountryCode={mobileCountryCode} setMobileCountryCode={setMobileCountryCode}
            mobileNo={mobileNo} setMobileNo={setMobileNo}
            landlineStd={landlineStd} setLandlineStd={setLandlineStd}
            landlineCode={landlineCode} setLandlineCode={setLandlineCode}
            landlineNo={landlineNo} setLandlineNo={setLandlineNo}
            relativeName={relativeName} setRelativeName={setRelativeName}
            // Address
            addressHouseNo={addressHouseNo} setAddressHouseNo={setAddressHouseNo}
            addressStreetName={addressStreetName} setAddressStreetName={setAddressStreetName}
            addressColony={addressColony} setAddressColony={setAddressColony}
            addressVillage={addressVillage} setAddressVillage={setAddressVillage}
            addressTehsil={addressTehsil} setAddressTehsil={setAddressTehsil}
            addressCountry={addressCountry} setAddressCountry={setAddressCountry}
            addressState={addressState} setAddressState={setAddressState}
            addressDistrict={addressDistrict} setAddressDistrict={setAddressDistrict}
            addressPoliceStation={addressPoliceStation} setAddressPoliceStation={setAddressPoliceStation}
            addressPincode={addressPincode} setAddressPincode={setAddressPincode}
            // Identification
            countryOfNationality={countryOfNationality} setCountryOfNationality={setCountryOfNationality}
            identificationType={identificationType} setIdentificationType={setIdentificationType}
            identificationNumber={identificationNumber} setIdentificationNumber={setIdentificationNumber}
            identificationRecords={identificationRecords} setIdentificationRecords={setIdentificationRecords}
          />
        );
      case "accusedDetail":
        return (
          <AccusedDetail
            accusedRecords={accusedRecords}
            setAccusedRecords={setAccusedRecords}
          />
        );
      case "incidentDetail":
        return (
          <IncidentDetail
            placeOfIncident={placeOfIncident} setPlaceOfIncident={setPlaceOfIncident}
            typeOfIncident={typeOfIncident} setTypeOfIncident={setTypeOfIncident}
            isDateTimeKnown={isDateTimeKnown} setIsDateTimeKnown={setIsDateTimeKnown}
            incidentDate={incidentDate} setIncidentDate={setIncidentDate}
            incidentTime={incidentTime} setIncidentTime={setIncidentTime}
            incidentFileUpload={incidentFileUpload} setIncidentFileUpload={setIncidentFileUpload}
          />
        );
      case "complaintSubmissionDetails":
        return (
          <ComplaintSubmissionDetails
            knowPoliceStation={knowPoliceStation} setKnowPoliceStation={setKnowPoliceStation}
            submissionDistrict={submissionDistrict} setSubmissionDistrict={setSubmissionDistrict}
            submissionPoliceStation={submissionPoliceStation} setSubmissionPoliceStation={setSubmissionPoliceStation}
          />
        );
      case "complaintDetail":
        return (
          <ComplaintDetail
            dateOfComplaint={dateOfComplaint} setDateOfComplaint={setDateOfComplaint}
            complaintDescription={complaintDescription} setComplaintDescription={setComplaintDescription}
            remarks={remarks} setRemarks={setRemarks}
            complaintFileUpload={complaintFileUpload} setComplaintFileUpload={setComplaintFileUpload}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    const formData = {
      personalInfo: { uid, firstName, middleName, lastName, relationType, dateOfBirth, natureOfComplaint, emailId, mobileCountryCode, mobileNo, landlineStd, landlineCode, landlineNo, relativeName },
      address: { addressHouseNo, addressStreetName, addressColony, addressVillage, addressTehsil, addressCountry, addressState, addressDistrict, addressPoliceStation, addressPincode },
      identification: { countryOfNationality, identificationType, identificationNumber, identificationRecords },
      accusedRecords,
      incident: { placeOfIncident, typeOfIncident, isDateTimeKnown, incidentDate, incidentTime },
      submission: { knowPoliceStation, submissionDistrict, submissionPoliceStation },
      complaint: { dateOfComplaint, complaintDescription, remarks },
    };
    console.log("Form Data:", formData);
  };

  return (
    <div className="form-page">
      {/* ─── Top Bar ─── */}
      <table width="100%" cellPadding="0" cellSpacing="0" style={{ borderBottom: "2px solid #003399" }}>
        <tbody>
          <tr>
            <td style={{ padding: "5px 10px", verticalAlign: "middle", width: "220px" }}>
              <img src="/cctns-logo.jpg" alt="CCTNS Logo" style={{ height: 60 }} />
            </td>
            <td style={{ textAlign: "center", verticalAlign: "middle" }}></td>
            <td style={{ width: "120px", textAlign: "right", verticalAlign: "middle", paddingRight: "10px" }}>
              <img src="/maha-pol-logo.png" alt="Maha Police Logo" style={{ height: 54 }} />
            </td>
          </tr>
        </tbody>
      </table>

      {/* ─── Navigation Bar ─── */}
      <div className="nav-bar">
        <div className="nav-item">Home</div>
        <div className="nav-separator">|</div>
        <div className="nav-item">Complaint</div>
        <div className="nav-separator">|</div>
        <div className="nav-item">Citizen Tip</div>
        <div className="nav-separator">|</div>
        <div className="nav-item">Search Status</div>
      </div>

      {/* ─── Breadcrumb ─── */}
      <div className="breadcrumb-row">
        <div className="breadcrumb">
          <a href="#" className="breadcrumb-link">Home</a>
          <span className="breadcrumb-sep">»</span>
          <a href="#" className="breadcrumb-link">Complaint</a>
          <span className="breadcrumb-sep">»</span>
          <span className="breadcrumb-current">Add New Complaint Details</span>
        </div>
        <div className="breadcrumb-icons">
          <span className="icon-btn" title="Help">❓</span>
          <span className="icon-btn" title="Print">🖨️</span>
          <span className="icon-btn" title="Lock">🔒</span>
        </div>
      </div>

      <div className="form-header">
        <span className="form-title">Register New Complaint</span>
        <span className="mandatory-note">* Mandatory Fields</span>
      </div>
      <MainTabs activeMainTab={activeMainTab} setActiveMainTab={setActiveMainTab} />
      <div className="form-body">
        {renderMainTabContent()}
      </div>
    </div>
  );
};

export default Form;