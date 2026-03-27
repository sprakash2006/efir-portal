import React from "react";
import PersonalInformation from "./PersonalInformation";
import Address from "./Address";
import Identification from "./Identification";

const ComplainantDetail = ({
  activeSubTab, setActiveSubTab,
  // Personal Information
  uid, setUid, firstName, setFirstName, middleName, setMiddleName,
  lastName, setLastName, relationType, setRelationType,
  dateOfBirth, setDateOfBirth, natureOfComplaint, setNatureOfComplaint,
  emailId, setEmailId, mobileCountryCode, setMobileCountryCode,
  mobileNo, setMobileNo, landlineStd, setLandlineStd,
  landlineCode, setLandlineCode, landlineNo, setLandlineNo,
  relativeName, setRelativeName,
  // Address Present
  presentHouseNo, setPresentHouseNo, presentStreetName, setPresentStreetName,
  presentColony, setPresentColony, presentVillage, setPresentVillage,
  presentTehsil, setPresentTehsil, presentCountry, setPresentCountry,
  presentState, setPresentState, presentDistrict, setPresentDistrict,
  presentPoliceStation, setPresentPoliceStation, presentPincode, setPresentPincode,
  sameForPermanent, setSameForPermanent,
  // Address Permanent
  permanentHouseNo, setPermanentHouseNo, permanentStreetName, setPermanentStreetName,
  permanentColony, setPermanentColony, permanentVillage, setPermanentVillage,
  permanentTehsil, setPermanentTehsil, permanentCountry, setPermanentCountry,
  permanentState, setPermanentState, permanentDistrict, setPermanentDistrict,
  permanentPoliceStation, setPermanentPoliceStation, permanentPincode, setPermanentPincode,
  // Identification
  countryOfNationality, setCountryOfNationality, identificationType, setIdentificationType,
  identificationNumber, setIdentificationNumber, identificationRecords, setIdentificationRecords,
}) => {
  const subTabs = [
    { key: "personalInformation", label: "Personal Information" },
    { key: "address", label: "Address" },
    { key: "identification", label: "Identification" },
  ];

  const renderSubTabContent = () => {
    switch (activeSubTab) {
      case "personalInformation":
        return (
          <PersonalInformation
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
          />
        );
      case "address":
        return (
          <Address
            presentHouseNo={presentHouseNo} setPresentHouseNo={setPresentHouseNo}
            presentStreetName={presentStreetName} setPresentStreetName={setPresentStreetName}
            presentColony={presentColony} setPresentColony={setPresentColony}
            presentVillage={presentVillage} setPresentVillage={setPresentVillage}
            presentTehsil={presentTehsil} setPresentTehsil={setPresentTehsil}
            presentCountry={presentCountry} setPresentCountry={setPresentCountry}
            presentState={presentState} setPresentState={setPresentState}
            presentDistrict={presentDistrict} setPresentDistrict={setPresentDistrict}
            presentPoliceStation={presentPoliceStation} setPresentPoliceStation={setPresentPoliceStation}
            presentPincode={presentPincode} setPresentPincode={setPresentPincode}
            sameForPermanent={sameForPermanent} setSameForPermanent={setSameForPermanent}
            permanentHouseNo={permanentHouseNo} setPermanentHouseNo={setPermanentHouseNo}
            permanentStreetName={permanentStreetName} setPermanentStreetName={setPermanentStreetName}
            permanentColony={permanentColony} setPermanentColony={setPermanentColony}
            permanentVillage={permanentVillage} setPermanentVillage={setPermanentVillage}
            permanentTehsil={permanentTehsil} setPermanentTehsil={setPermanentTehsil}
            permanentCountry={permanentCountry} setPermanentCountry={setPermanentCountry}
            permanentState={permanentState} setPermanentState={setPermanentState}
            permanentDistrict={permanentDistrict} setPermanentDistrict={setPermanentDistrict}
            permanentPoliceStation={permanentPoliceStation} setPermanentPoliceStation={setPermanentPoliceStation}
            permanentPincode={permanentPincode} setPermanentPincode={setPermanentPincode}
          />
        );
      case "identification":
        return (
          <Identification
            countryOfNationality={countryOfNationality} setCountryOfNationality={setCountryOfNationality}
            identificationType={identificationType} setIdentificationType={setIdentificationType}
            identificationNumber={identificationNumber} setIdentificationNumber={setIdentificationNumber}
            identificationRecords={identificationRecords} setIdentificationRecords={setIdentificationRecords}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="complainant-detail">
      <div className="sub-tabs">
        {subTabs.map((tab) => (
          <div
            key={tab.key}
            className={`sub-tab ${activeSubTab === tab.key ? "sub-tab-active" : ""}`}
            onClick={() => setActiveSubTab(tab.key)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="sub-tab-content">
        {renderSubTabContent()}
      </div>
    </div>
  );
};

export default ComplainantDetail;
