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
  // Address
  addressHouseNo, setAddressHouseNo, addressStreetName, setAddressStreetName,
  addressColony, setAddressColony, addressVillage, setAddressVillage,
  addressTehsil, setAddressTehsil, addressCountry, setAddressCountry,
  addressState, setAddressState, addressDistrict, setAddressDistrict,
  addressPoliceStation, setAddressPoliceStation, addressPincode, setAddressPincode,
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
            id={`subtab-${tab.key}`}
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
