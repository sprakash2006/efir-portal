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
            <label className="form-label">House No.</label>
            <input type="text" className="form-input" value={presentHouseNo} onChange={(e) => setPresentHouseNo(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label">Street Name</label>
            <input type="text" className="form-input form-input-wide" value={presentStreetName} onChange={(e) => setPresentStreetName(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label">Colony / Locality / Area</label>
            <input type="text" className="form-input form-input-wide" value={presentColony} onChange={(e) => setPresentColony(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label">Village/Town/City <span className="required">*</span></label>
            <input type="text" className="form-input form-input-wide" value={presentVillage} onChange={(e) => setPresentVillage(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label">Tehsil / Block / Mandal</label>
            <input type="text" className="form-input form-input-wide" value={presentTehsil} onChange={(e) => setPresentTehsil(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label">Same for Permanent</label>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name="sameForPermanent" value="yes" checked={sameForPermanent === "yes"} onChange={(e) => setSameForPermanent(e.target.value)} />
                Yes
              </label>
              <label className="radio-label">
                <input type="radio" name="sameForPermanent" value="no" checked={sameForPermanent === "no"} onChange={(e) => setSameForPermanent(e.target.value)} />
                No
              </label>
            </div>
          </div>
        </div>

        <div className="form-column">
          <div className="form-row">
            <label className="form-label">Country <span className="required">*</span></label>
            <select className="form-select" value={presentCountry} onChange={(e) => setPresentCountry(e.target.value)}>
              {countryOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">State <span className="required">*</span></label>
            <select className="form-select" value={presentState} onChange={(e) => setPresentState(e.target.value)}>
              {stateOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">District <span className="required">*</span></label>
            <select className="form-select" value={presentDistrict} onChange={(e) => setPresentDistrict(e.target.value)}>
              <option value="">Select</option>
              {districtOptions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Police Station</label>
            <select className="form-select" value={presentPoliceStation} onChange={(e) => setPresentPoliceStation(e.target.value)}>
              <option value="">Select</option>
              <option value="station1">Station 1</option>
              <option value="station2">Station 2</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Pincode</label>
            <input type="text" className="form-input form-input-pincode" value={presentPincode} onChange={(e) => setPresentPincode(e.target.value)} />
          </div>
        </div>
      </div>

      {/* ─── Permanent Address ─── */}
      <div className="address-heading">Permanent Address</div>
      <div className="form-two-columns">
        <div className="form-column">
          <div className="form-row">
            <label className="form-label">House No.</label>
            <input type="text" className="form-input" value={permanentHouseNo} onChange={(e) => setPermanentHouseNo(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label">Street Name</label>
            <input type="text" className="form-input form-input-wide" value={permanentStreetName} onChange={(e) => setPermanentStreetName(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label">Colony / Locality / Area</label>
            <input type="text" className="form-input form-input-wide" value={permanentColony} onChange={(e) => setPermanentColony(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label">Village/Town/City <span className="required">*</span></label>
            <input type="text" className="form-input form-input-wide" value={permanentVillage} onChange={(e) => setPermanentVillage(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label">Tehsil / Block / Mandal</label>
            <input type="text" className="form-input form-input-wide" value={permanentTehsil} onChange={(e) => setPermanentTehsil(e.target.value)} />
          </div>
        </div>

        <div className="form-column">
          <div className="form-row">
            <label className="form-label">Country <span className="required">*</span></label>
            <select className="form-select" value={permanentCountry} onChange={(e) => setPermanentCountry(e.target.value)}>
              {countryOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">State <span className="required">*</span></label>
            <select className="form-select" value={permanentState} onChange={(e) => setPermanentState(e.target.value)}>
              {stateOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">District <span className="required">*</span></label>
            <select className="form-select" value={permanentDistrict} onChange={(e) => setPermanentDistrict(e.target.value)}>
              <option value="">Select</option>
              {districtOptions.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Police Station</label>
            <select className="form-select" value={permanentPoliceStation} onChange={(e) => setPermanentPoliceStation(e.target.value)}>
              <option value="">Select</option>
              <option value="station1">Station 1</option>
              <option value="station2">Station 2</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Pincode</label>
            <input type="text" className="form-input form-input-pincode" value={permanentPincode} onChange={(e) => setPermanentPincode(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button className="btn-clear" onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default Address;
