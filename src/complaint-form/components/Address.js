import React from "react";

const Address = ({
  presentHouseNo, setPresentHouseNo, presentStreetName, setPresentStreetName,
  presentColony, setPresentColony, presentVillage, setPresentVillage,
  presentTehsil, setPresentTehsil, presentCountry, setPresentCountry,
  presentState, setPresentState, presentDistrict, setPresentDistrict,
  presentPoliceStation, setPresentPoliceStation, presentPincode, setPresentPincode,
  sameForPermanent, setSameForPermanent,
  permanentHouseNo, setPermanentHouseNo, permanentStreetName, setPermanentStreetName,
  permanentColony, setPermanentColony, permanentVillage, setPermanentVillage,
  permanentTehsil, setPermanentTehsil, permanentCountry, setPermanentCountry,
  permanentState, setPermanentState, permanentDistrict, setPermanentDistrict,
  permanentPoliceStation, setPermanentPoliceStation, permanentPincode, setPermanentPincode,
}) => {
  const handleClear = () => {
    setPresentHouseNo(""); setPresentStreetName(""); setPresentColony("");
    setPresentVillage(""); setPresentTehsil(""); setPresentCountry("INDIA");
    setPresentState("MAHARASHTRA"); setPresentDistrict(""); setPresentPoliceStation("");
    setPresentPincode(""); setSameForPermanent("no");
    setPermanentHouseNo(""); setPermanentStreetName(""); setPermanentColony("");
    setPermanentVillage(""); setPermanentTehsil(""); setPermanentCountry("INDIA");
    setPermanentState("MAHARASHTRA"); setPermanentDistrict(""); setPermanentPoliceStation("");
    setPermanentPincode("");
  };

  const countryOptions = ["INDIA"];
  const stateOptions = ["MAHARASHTRA", "GOA", "KARNATAKA", "GUJARAT", "RAJASTHAN"];
  const districtOptions = ["DHARASHIV", "PUNE", "MUMBAI", "NAGPUR", "NASHIK", "SOLAPUR"];

  return (
    <div className="address-section">
      {/* ─── Present Address ─── */}
      <div className="address-heading">Present Address</div>
      <div className="form-two-columns">
        <div className="form-column">
          <div className="form-row">
            <label className="form-label" htmlFor="addr-present-house">House No.</label>
            <input id="addr-present-house" type="text" className="form-input" value={presentHouseNo} onChange={(e) => setPresentHouseNo(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-present-street">Street Name</label>
            <input id="addr-present-street" type="text" className="form-input form-input-wide" value={presentStreetName} onChange={(e) => setPresentStreetName(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-present-colony">Colony / Locality / Area</label>
            <input id="addr-present-colony" type="text" className="form-input form-input-wide" value={presentColony} onChange={(e) => setPresentColony(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-present-village">Village/Town/City <span className="required">*</span></label>
            <input id="addr-present-village" type="text" className="form-input form-input-wide" value={presentVillage} onChange={(e) => setPresentVillage(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-present-tehsil">Tehsil / Block / Mandal</label>
            <input id="addr-present-tehsil" type="text" className="form-input form-input-wide" value={presentTehsil} onChange={(e) => setPresentTehsil(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label">Same for Permanent</label>
            <div className="radio-group">
              <label className="radio-label">
                <input id="addr-same-permanent-yes" type="radio" name="sameForPermanent" value="yes" checked={sameForPermanent === "yes"} onChange={(e) => setSameForPermanent(e.target.value)} />
                Yes
              </label>
              <label className="radio-label">
                <input id="addr-same-permanent-no" type="radio" name="sameForPermanent" value="no" checked={sameForPermanent === "no"} onChange={(e) => setSameForPermanent(e.target.value)} />
                No
              </label>
            </div>
          </div>
        </div>

        <div className="form-column">
          <div className="form-row">
            <label className="form-label" htmlFor="addr-present-country">Country <span className="required">*</span></label>
            <select id="addr-present-country" className="form-select" value={presentCountry} onChange={(e) => setPresentCountry(e.target.value)}>
              {countryOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-present-state">State <span className="required">*</span></label>
            <select id="addr-present-state" className="form-select" value={presentState} onChange={(e) => setPresentState(e.target.value)}>
              {stateOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-present-district">District <span className="required">*</span></label>
            <select id="addr-present-district" className="form-select" value={presentDistrict} onChange={(e) => setPresentDistrict(e.target.value)}>
              <option value="">Select</option>
              {districtOptions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-present-police-station">Police Station</label>
            <select id="addr-present-police-station" className="form-select" value={presentPoliceStation} onChange={(e) => setPresentPoliceStation(e.target.value)}>
              <option value="">Select</option>
              <option value="station1">Station 1</option>
              <option value="station2">Station 2</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-present-pincode">Pincode</label>
            <input id="addr-present-pincode" type="text" className="form-input form-input-pincode" value={presentPincode} onChange={(e) => setPresentPincode(e.target.value)} />
          </div>
        </div>
      </div>

      {/* ─── Permanent Address ─── */}
      <div className="address-heading">Permanent Address</div>
      <div className="form-two-columns">
        <div className="form-column">
          <div className="form-row">
            <label className="form-label" htmlFor="addr-perm-house">House No.</label>
            <input id="addr-perm-house" type="text" className="form-input" value={permanentHouseNo} onChange={(e) => setPermanentHouseNo(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-perm-street">Street Name</label>
            <input id="addr-perm-street" type="text" className="form-input form-input-wide" value={permanentStreetName} onChange={(e) => setPermanentStreetName(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-perm-colony">Colony / Locality / Area</label>
            <input id="addr-perm-colony" type="text" className="form-input form-input-wide" value={permanentColony} onChange={(e) => setPermanentColony(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-perm-village">Village/Town/City <span className="required">*</span></label>
            <input id="addr-perm-village" type="text" className="form-input form-input-wide" value={permanentVillage} onChange={(e) => setPermanentVillage(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-perm-tehsil">Tehsil / Block / Mandal</label>
            <input id="addr-perm-tehsil" type="text" className="form-input form-input-wide" value={permanentTehsil} onChange={(e) => setPermanentTehsil(e.target.value)} />
          </div>
        </div>

        <div className="form-column">
          <div className="form-row">
            <label className="form-label" htmlFor="addr-perm-country">Country <span className="required">*</span></label>
            <select id="addr-perm-country" className="form-select" value={permanentCountry} onChange={(e) => setPermanentCountry(e.target.value)}>
              {countryOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-perm-state">State <span className="required">*</span></label>
            <select id="addr-perm-state" className="form-select" value={permanentState} onChange={(e) => setPermanentState(e.target.value)}>
              {stateOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-perm-district">District <span className="required">*</span></label>
            <select id="addr-perm-district" className="form-select" value={permanentDistrict} onChange={(e) => setPermanentDistrict(e.target.value)}>
              <option value="">Select</option>
              {districtOptions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-perm-police-station">Police Station</label>
            <select id="addr-perm-police-station" className="form-select" value={permanentPoliceStation} onChange={(e) => setPermanentPoliceStation(e.target.value)}>
              <option value="">Select</option>
              <option value="station1">Station 1</option>
              <option value="station2">Station 2</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label" htmlFor="addr-perm-pincode">Pincode</label>
            <input id="addr-perm-pincode" type="text" className="form-input form-input-pincode" value={permanentPincode} onChange={(e) => setPermanentPincode(e.target.value)} />
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
