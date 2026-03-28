import React from "react";

const Address = ({
  addressHouseNo, setAddressHouseNo, addressStreetName, setAddressStreetName,
  addressColony, setAddressColony, addressVillage, setAddressVillage,
  addressTehsil, setAddressTehsil, addressCountry, setAddressCountry,
  addressState, setAddressState, addressDistrict, setAddressDistrict,
  addressPoliceStation, setAddressPoliceStation, addressPincode, setAddressPincode,
}) => {
  const handleClear = () => {
    setAddressHouseNo(""); setAddressStreetName(""); setAddressColony("");
    setAddressVillage(""); setAddressTehsil(""); setAddressCountry("INDIA");
    setAddressState("MAHARASHTRA"); setAddressDistrict(""); setAddressPoliceStation("");
    setAddressPincode("");
  };


  return (
    <div className="address-section">
      {/* ─── Address ─── */}
      <div className="address-heading">Address Details</div>
      <div className="form-two-columns">
        <div className="form-column">
          <div className="form-row">
            <label className="form-label" htmlFor="addr-house">House No.</label>
            <input id="addr-house" type="text" className="form-input" value={addressHouseNo} onChange={(e) => setAddressHouseNo(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-street">Street Name</label>
            <input id="addr-street" type="text" className="form-input form-input-wide" value={addressStreetName} onChange={(e) => setAddressStreetName(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-colony">Colony / Locality / Area</label>
            <input id="addr-colony" type="text" className="form-input form-input-wide" value={addressColony} onChange={(e) => setAddressColony(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-village">Village/Town/City <span className="required">*</span></label>
            <input id="addr-village" type="text" className="form-input form-input-wide" value={addressVillage} onChange={(e) => setAddressVillage(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-tehsil">Tehsil / Block / Mandal</label>
            <input id="addr-tehsil" type="text" className="form-input form-input-wide" value={addressTehsil} onChange={(e) => setAddressTehsil(e.target.value)} />
          </div>
        </div>

        <div className="form-column">
          <div className="form-row">
            <label className="form-label" htmlFor="addr-country">Country <span className="required">*</span></label>
            <input id="addr-country" type="text" className="form-input" value={addressCountry} onChange={(e) => setAddressCountry(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-state">State <span className="required">*</span></label>
            <input id="addr-state" type="text" className="form-input" value={addressState} onChange={(e) => setAddressState(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-district">District <span className="required">*</span></label>
            <input id="addr-district" type="text" className="form-input" value={addressDistrict} onChange={(e) => setAddressDistrict(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-police-station">Police Station</label>
            <select id="addr-police-station" className="form-select" value={addressPoliceStation} onChange={(e) => setAddressPoliceStation(e.target.value)}>
              <option value="">Select</option>
              <option value="station1">Station 1</option>
              <option value="station2">Station 2</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-pincode">Pincode</label>
            <input id="addr-pincode" type="text" className="form-input form-input-pincode" value={addressPincode} onChange={(e) => setAddressPincode(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button id="addr-btn-clear" className="btn-clear" onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default Address;
