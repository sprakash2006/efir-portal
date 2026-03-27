import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { supabase } from "./supabaseClient";

// ─── Constants ───────────────────────────────────────────────────────────────

const CAPTCHA_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
function generateCaptcha(len = 6) {
  let s = "";
  for (let i = 0; i < len; i++)
    s += CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)];
  return s;
}

const INDIAN_STATES = [
  "ANDAMAN & NICOBAR","ANDHRA PRADESH","ARUNACHAL PRADESH","ASSAM","BIHAR",
  "CHANDIGARH","CHHATTISGARH","DADRA & NAGAR HAVELI","DAMAN & DIU","DELHI",
  "GOA","GUJARAT","HARYANA","HIMACHAL PRADESH","JAMMU AND KASHMIR",
  "JHARKHAND","KARNATAKA","KERALA","LAKSHADWEEP","MADHYA PRADESH",
  "MAHARASHTRA","MANIPUR","MEGHALAYA","MIZORAM","NAGALAND","ODISHA",
  "PUDUCHERRY","PUNJAB","RAJASTHAN","SIKKIM","TAMIL NADU","TELENGANA",
  "TRIPURA","UTTAR PRADESH","UTTARAKHAND","WEST BENGAL",
];

const MH_DISTRICTS = [
  "AHILYANAGAR","AKOLA","AMRAVATI CITY","AMRAVATI RURAL","BEED","BHANDARA",
  "BRIHAN MUMBAI CITY","BULDHANA","CHANDRAPUR","CHHATRAPATI SAMBHAJINAGAR (RURAL)",
  "CHHATRAPATI SAMBHAJINAGAR CITY","DHARASHIV","DHULE","GADCHIROLI","GONDIA",
  "HINGOLI","JALGAON","JALNA","KOLHAPUR","LATUR","NAGPUR CITY","NAGPUR RURAL",
  "NANDED","NANDURBAR","NASHIK CITY","NASHIK RURAL","NAVI MUMBAI","PALGHAR",
  "PARBHANI","PIMPRI-CHINCHWAD","PUNE CITY","PUNE RURAL","RAIGAD",
  "RAILWAY MUMBAI","RAILWAY NAGPUR","RAILWAY PUNE","RATNAGIRI","SANGLI",
  "SATARA","SINDHUDURG","SOLAPUR CITY","SOLAPUR RURAL","THANE CITY",
  "THANE RURAL","WARDHA","WASHIM","YAVATMAL",
];



// ─── Captcha Canvas ───────────────────────────────────────────────────────────
function CaptchaImage({ text }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, c.width, c.height);
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `hsl(${Math.random()*360},50%,65%)`;
      ctx.beginPath();
      ctx.moveTo(Math.random()*c.width, Math.random()*c.height);
      ctx.lineTo(Math.random()*c.width, Math.random()*c.height);
      ctx.stroke();
    }
    ctx.font = "bold 20px 'Courier New'";
    for (let i = 0; i < text.length; i++) {
      ctx.save();
      ctx.translate(12 + i*17, 27 + (Math.random()-0.5)*5);
      ctx.rotate((Math.random()-0.5)*0.4);
      ctx.fillStyle = `hsl(${Math.random()*360},60%,28%)`;
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }
  }, [text]);
  return <canvas ref={ref} width={120} height={38} style={{ border:"1px solid #999", verticalAlign:"middle" }} />;
}

// ─── OTP Modal ────────────────────────────────────────────────────────────────
function OtpModal({ visible }) {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  useEffect(() => {
    if (!visible) return;
    setTimer(60);
    const t = setInterval(() => setTimer(p => { if (p<=1){clearInterval(t);return 0;} return p-1; }), 1000);
    return () => clearInterval(t);
  }, [visible]);
  if (!visible) return null;
  return (
    <>
      <div style={S.backdrop} />
      <div style={S.otpBox}>
        <span style={{ fontWeight:"bold", fontSize:14 }}>Mobile Number verification</span><br/><br/>
        <table><tbody><tr>
          <td><span style={S.lbl}>Enter OTP</span>&nbsp;&nbsp;&nbsp;&nbsp;</td>
          <td><input type="text" maxLength={6} value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,""))} style={{ fontSize:14 }}/></td>
        </tr></tbody></table>
        <span style={{ color:"red" }}></span>
        <span style={{ color:"red" }}>OTP Sent to the Mobile Number</span><br/>
        <button style={S.btn}>Validate</button>&nbsp;&nbsp;&nbsp;&nbsp;
        <button style={S.btn}>Resend</button>
        {timer>0 && <p style={{ color:"green", margin:"4px 0 0" }}>Resend in {timer}s</p>}
      </div>
    </>
  );
}

// ─── Field helpers ────────────────────────────────────────────────────────────
function Label({ children, required }) {
  return <td className="label-td" style={S.labelTd}>
    <span style={S.label}>{children}</span>
    {required && <span style={{ color:"red" }}> *</span>}
  </td>;
}
function Err({ msg }) {
  return msg ? <span style={{ color:"red", fontSize:11, display:"block" }}>{msg}</span> : null;
}

// ─── Address sub-form ─────────────────────────────────────────────────────────
function AddressBlock({ heading, prefix, data, onChange }) {
  return (
    <div style={{ marginTop:8 }}>
      {heading && <h2 style={S.h2 || {}}>{heading}</h2>}
      <table width="100%" style={{ borderCollapse:"collapse" }}>
        <tbody>
          <tr>
            <Label><label htmlFor={`${prefix}-house`}>House No.</label></Label>
            <td style={S.valTd}>
              <input id={`${prefix}-house`} maxLength={10} value={data.house} onChange={e=>onChange("house",e.target.value)} style={{ ...S.input, width:120 }}/>
            </td>
            <Label required><label htmlFor={`${prefix}-country`}>Country</label></Label>
            <td style={S.valTd}>
              <select id={`${prefix}-country`} value={data.country} onChange={e=>onChange("country",e.target.value)} style={{ ...S.select, width:230 }}>
                <option value="">Select</option>
                <option value="INDIA">INDIA</option>
                <option value="USA">UNITED STATES OF AMERICA (USA)</option>
                <option value="UK">UNITED KINGDOM (UK)</option>
                <option value="UAE">UNITED ARAB EMIRATES (UAE)</option>
              </select>
            </td>
          </tr>
          <tr>
            <Label><label htmlFor={`${prefix}-street`}>Street Name</label></Label>
            <td style={S.valTd}><input id={`${prefix}-street`} maxLength={30} value={data.street} onChange={e=>onChange("street",e.target.value)} style={{ ...S.input, width:250 }}/></td>
            <Label required><label htmlFor={`${prefix}-state`}>State</label></Label>
            <td style={S.valTd}>
              <select id={`${prefix}-state`} value={data.state} onChange={e=>onChange("state",e.target.value)} style={{ ...S.select, width:230 }}>
                <option value="">Select</option>
                {INDIAN_STATES.map(s=><option key={s} value={s}>{s}</option>)}
              </select>
            </td>
          </tr>
          <tr>
            <Label><label htmlFor={`${prefix}-colony`}>Colony / Locality / Area</label></Label>
            <td style={S.valTd}><input id={`${prefix}-colony`} maxLength={30} value={data.colony} onChange={e=>onChange("colony",e.target.value)} style={{ ...S.input, width:250 }}/></td>
            <Label required><label htmlFor={`${prefix}-district`}>District</label></Label>
            <td style={S.valTd}>
              <select id={`${prefix}-district`} value={data.district} onChange={e=>onChange("district",e.target.value)} style={{ ...S.select, width:230 }}>
                <option value="">Select</option>
                {MH_DISTRICTS.map(d=><option key={d} value={d}>{d}</option>)}
              </select>
            </td>
          </tr>
          <tr>
            <Label required><label htmlFor={`${prefix}-city`}>Village/Town/City</label></Label>
            <td style={S.valTd}><input id={`${prefix}-city`} maxLength={30} value={data.city} onChange={e=>onChange("city",e.target.value)} style={{ ...S.input, width:250 }}/></td>
            <Label><label htmlFor={`${prefix}-pin`}>Pincode</label></Label>
            <td style={S.valTd}><input id={`${prefix}-pin`} maxLength={6} value={data.pin} onChange={e=>onChange("pin",e.target.value.replace(/\D/g,""))} style={{ ...S.input, width:180 }}/></td>
          </tr>
          <tr>
            <Label><label htmlFor={`${prefix}-tehsil`}>Tehsil / Block / Mandal</label></Label>
            <td style={S.valTd}><input id={`${prefix}-tehsil`} maxLength={30} value={data.tehsil} onChange={e=>onChange("tehsil",e.target.value)} style={{ ...S.input, width:250 }}/></td>
            <td style={{ border: 'none', background: 'none' }}></td>
            <td style={{ border: 'none', background: 'none' }}></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
const emptyAddr = () => ({ house:"", street:"", colony:"", city:"", tehsil:"", pin:"", country:"INDIA", state:"MAHARASHTRA", district:"" });

export default function CitizenRegistration() {
  const navigate = useNavigate();
  // Personal
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState({ cc:"91", num:"" });
  const [landline, setLandline] = useState({ cc:"", area:"", num:"" });
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  // Removed idType and idNo
  // Address
  const [address, setAddress] = useState(emptyAddr());
  // Login
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  // Removed secQ and secA
  // Captcha
  const [captchaText, setCaptchaText] = useState(generateCaptcha);
  const [captchaInput, setCaptchaInput] = useState("");
  // UI
  const [errors, setErrors] = useState({});
  const [otpVisible, setOtpVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const refreshCaptcha = () => { setCaptchaText(generateCaptcha()); setCaptchaInput(""); };

  const handleAddressChange = (k, v) => {
    setAddress(p => ({ ...p, [k]:v }));
  };

  const validate = () => {
    const e = {};
    if (!name || name.length < 2) e.name = "Please enter First Name (min 2 chars)";
    if (!fatherName || fatherName.length < 2) e.fatherName = "Please enter Father's Name (min 2 chars)";
    if (!gender) e.gender = "Please select Gender";
    if (!mobile.num || mobile.num.length !== 10) e.mobile = "Mobile Number must be 10 digits";
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) e.email = "Please enter valid Email ID";
    if (!dob) e.dob = "Please enter Date of Birth";
    // Removed idType and idNo validation
    if (!address.country) e.addressCountry = "Please select Country";
    if (!address.state) e.addressState = "Please select State";
    if (!address.district) e.addressDistrict = "Please select District";
    if (!address.city || address.city.length < 3) e.addressCity = "Please enter Village/Town/City (min 3 chars)";
    if (!password || password.length < 6)
      e.password = "Password must be at least 6 characters long";
    if (password !== confirmPwd) e.confirmPwd = "Password and Confirm Password should be same";
    if (!captchaInput) e.captcha = "Please enter code";
    return e;
  };

  const handleSubmit = async () => {
    setSubmitMessage(null);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      if (captchaInput !== captchaText) {
        setErrors({ captcha: "Incorrect captcha. Please try again." });
        refreshCaptcha();
        return;
      }
      
      try {
        const payload = {
          name: name,
          middleName: fatherName,
          Gender: gender,
          EmailId: email,
          mobileNo: mobile.num,
          DOB: dob,
          city: address.city,
          country: address.country,
          state: address.state,
          district: address.district,
          password: password,
          address: `${address.house}, ${address.street}, ${address.colony}, ${address.tehsil}, ${address.pin}`
        };

        const { data, error } = await supabase
          .from("user")
          .insert([payload]);

        if (error) {
          console.error("Supabase error:", error);
          setSubmitMessage({ type: "error", text: "Error saving data: " + error.message });
          return;
        }

        setSubmitMessage({ type: "success", text: "User Registration Successful! Redirecting..." });
        setTimeout(() => {
          navigate("/");
        }, 2000);

      } catch (err) {
        console.error("Unexpected error:", err);
        setSubmitMessage({ type: "error", text: "An unexpected error occurred." });
      }
    }
  };

  const handleClear = () => {
    if (!window.confirm("All data fields will be reset to Blank, do you wish to continue?")) return;
    setName(""); setFatherName(""); setGender(""); setMobile({cc:"91",num:""});
    setLandline({cc:"",area:"",num:""}); setEmail(""); setDob("");
    // Removed setIdType and setIdNo
    setAddress(emptyAddr());
    setLoginId(""); setPassword(""); setConfirmPwd(""); // Removed setSecQ and setSecA
    setCaptchaInput(""); refreshCaptcha(); setErrors({});
  };

  return (
    <div style={S.page}>
      <OtpModal visible={otpVisible} />

      {/* Header */}
      <div style={S.header}>
        <div style={{ display:"flex", alignItems:"center", padding:"6px 12px" }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/120px-Emblem_of_India.svg.png"
            alt="emblem" style={{ height:65, marginRight:12 }} />
          <div>
            <div style={{ fontSize:17, fontWeight:"bold", color:"#6b0000" }}>Government of India — Ministry of Home Affairs</div>
            <div style={{ fontSize:12, color:"#333" }}>Maharashtra Police — Citizen Services Portal</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={S.nav}>
        {["Home","About","Services","Contact"].map(n => (
          n === "Home" ? (
            <span
              key={n}
              style={S.navItem}
              onClick={() => navigate("/")}
            >
              {n}
            </span>
          ) : (
            <span key={n} style={S.navItem}>{n}</span>
          )
        ))}
      </div>

      {/* Content wrapper */}
      <div style={{ padding:"10px 16px" }}>
        <h1 style={S.h1}>Citizen Registration</h1>

        <div style={S.borderstyle}>

          {/* ── Personal Details ── */}
          <fieldset style={S.fieldset}>
            <legend style={S.legend}>Personal Details</legend>
            <table width="100%" style={{ borderCollapse:"collapse" }}>
              <tbody>
                {/* Row 1: Name + Landline */}
                <tr>
                  <Label required><label htmlFor="reg-name">Name</label></Label>
                  <td style={S.valTd}>
                    <input id="reg-name" maxLength={30} value={name} onChange={e=>setName(e.target.value)} style={{ ...S.input, width:250 }} tabIndex={1} />
                    <Err msg={errors.name} />
                  </td>
                  <Label><label htmlFor="reg-landline-cc">Landline No.</label></Label>
                  <td style={S.valTd}>
                    <span style={{ marginRight:2 }}>+</span>
                    <input id="reg-landline-cc" maxLength={3} value={landline.cc} onChange={e=>setLandline(l=>({...l,cc:e.target.value}))} style={{ ...S.input, width:36 }} placeholder="CC" />
                    {" "}
                    <input id="reg-landline-area" maxLength={5} value={landline.area} onChange={e=>setLandline(l=>({...l,area:e.target.value}))} style={{ ...S.input, width:50 }} placeholder="STD" />
                    {" "}
                    <input id="reg-landline-num" maxLength={8} value={landline.num} onChange={e=>setLandline(l=>({...l,num:e.target.value}))} style={{ ...S.input, width:80 }} />
                  </td>
                </tr>
                {/* Row 2: Father + Email */}
                <tr>
                  <Label required><label htmlFor="reg-father">Father's / Husband's Name</label></Label>
                  <td style={S.valTd}>
                    <input id="reg-father" maxLength={30} value={fatherName} onChange={e=>setFatherName(e.target.value)} style={{ ...S.input, width:250 }} tabIndex={2} />
                    <Err msg={errors.fatherName} />
                  </td>
                  <Label required><label htmlFor="reg-email">Email ID</label></Label>
                  <td style={S.valTd}>
                    <input id="reg-email" type="email" maxLength={100} value={email} onChange={e=>setEmail(e.target.value)} style={{ ...S.input, width:250 }} tabIndex={11} />
                    <Err msg={errors.email} />
                  </td>
                </tr>
                {/* Row 3: Gender + Mobile */}
                <tr>
                  <Label required><label htmlFor="reg-gender">Gender</label></Label>
                  <td style={S.valTd}>
                    <select id="reg-gender" value={gender} onChange={e=>setGender(e.target.value)} style={S.select} tabIndex={4}>
                      <option value="">Select</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Transgender">Transgender</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                    <Err msg={errors.gender} />
                  </td>
                  <Label required><label htmlFor="reg-mobile-cc">Mobile Number</label></Label>
                  <td style={S.valTd}>
                    <span style={{ marginRight:2 }}>+</span>
                    <input id="reg-mobile-cc" maxLength={3} value={mobile.cc} onChange={e=>setMobile(m=>({...m,cc:e.target.value}))} style={{ ...S.input, width:36 }} tabIndex={6} />
                    {" "}
                    <input id="reg-mobile-num" maxLength={10} value={mobile.num} onChange={e=>setMobile(m=>({...m,num:e.target.value.replace(/\D/g,"")}))} style={{ ...S.input, width:120 }} tabIndex={7} />
                    <Err msg={errors.mobile} />
                  </td>
                </tr>
                {/* Row 4 removed: Identification Type and ID No */}
              </tbody>
            </table>
          </fieldset>

          {/* ── Age Panel ── */}
          <fieldset style={{ ...S.fieldset, marginTop:8 }}>
            <legend style={S.legend}>Age Panel <span style={{ color:"red" }}>*</span></legend>
            <table width="100%"><tbody>
              <tr>
                <Label><label htmlFor="reg-dob">Date of Birth</label></Label>
                <td style={S.valTd}>
                  <input id="reg-dob" type="date" value={dob} onChange={e=>setDob(e.target.value)} style={S.input} tabIndex={14} />
                  <Err msg={errors.dob} />
                </td>
                <td /><td />
              </tr>
            </tbody></table>
          </fieldset>

          {/* ── Address ── */}
          <fieldset style={{ ...S.fieldset, marginTop:8 }}>
            <legend style={S.legend}>Address</legend>

            <AddressBlock heading="" data={address} onChange={handleAddressChange} />
            {errors.addressCity && <Err msg={errors.addressCity} />}
            {errors.addressCountry && <Err msg={errors.addressCountry} />}
          </fieldset>

          {/* ── Login Details ── */}
          <fieldset style={{ ...S.fieldset, marginTop:8 }}>
            <legend style={S.legend}>Login Details</legend>
            <table width="100%"><tbody>
              {/* Login Id row removed */}
              <tr>
                <Label required><label htmlFor="reg-password">Password</label></Label>
                <td style={S.valTd} colSpan={3}>
                  <input id="reg-password" type="password" maxLength={30} value={password} onChange={e=>setPassword(e.target.value)} autoComplete="off" style={{ ...S.input, width:250 }} tabIndex={29} />
                  <Err msg={errors.password} />
                </td>
              </tr>
              <tr>
                <Label required><label htmlFor="reg-confirm-pwd">Confirm Password</label></Label>
                <td style={S.valTd}>
                  <input id="reg-confirm-pwd" type="password" maxLength={30} value={confirmPwd} onChange={e=>setConfirmPwd(e.target.value)} autoComplete="off" style={{ ...S.input, width:250 }} tabIndex={30} />
                  <Err msg={errors.confirmPwd} />
                </td>
                <td /><td />
              </tr>
            </tbody></table>
          </fieldset>

          {/* ── Captcha ── */}
          <div style={{ textAlign:"center", margin:"12px 0" }}>
            <CaptchaImage text={captchaText} />
            <button type="button" onClick={refreshCaptcha} style={{ ...S.btn, marginLeft:6, fontSize:16, padding:"2px 8px" }}>↻</button>
            <br />
            <input id="reg-captcha" maxLength={7} value={captchaInput} onChange={e=>setCaptchaInput(e.target.value)}
              style={{ ...S.input, width:150, marginTop:6 }} />
            <br />
            <span style={{ fontSize:10 }}>Characters are case sensitive</span>
            <Err msg={errors.captcha} />
          </div>

          {submitMessage && (
            <div style={{ 
              margin: "10px auto", 
              padding: "10px", 
              width: "80%",
              borderRadius: "4px",
              textAlign: "center",
              fontWeight: "bold",
              color: submitMessage.type === "success" ? "#155724" : "#721c24",
              backgroundColor: submitMessage.type === "success" ? "#d4edda" : "#f8d7da",
              border: `1px solid ${submitMessage.type === "success" ? "#c3e6cb" : "#f5c6cb"}`
            }}>
              {submitMessage.text}
            </div>
          )}

          {/* ── Buttons ── */}
          <div style={{ textAlign:"center", padding:"10px 0 14px", borderTop:"1px solid #ccc", marginTop:8 }}>
            <button style={S.submitBtn} onClick={handleSubmit} tabIndex={31}>Submit</button>
            {" "}
            <button style={S.submitBtn} onClick={handleClear} tabIndex={32}>Clear</button>
            {" "}
            <button style={S.submitBtn} onClick={()=>window.confirm("Do you want to close?")} tabIndex={33}>Close</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={S.footer}>
        <div style={{ textAlign:"center", marginBottom:4 }}>
          {["About Us","Privacy Policy","Hyperlink Policy","Copyright Policy","Disclaimer","Contact Us","Terms and Conditions"].map((item,i,arr)=>(
            <span key={item}>
              <a href="#" style={S.footerLink}>{item}</a>
              {i<arr.length-1 && " | "}
            </span>
          ))}
        </div>
        <div style={{ textAlign:"center", fontSize:11, color:"#333" }}>
          <b>CAS CITIZEN Ver 4.5.0</b><br/>
          This website belongs to National Crime Records Bureau, Ministry of Home Affairs, Government of India.
        </div>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  page: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: 13,
    background: '#fff',
    minHeight: '100vh',
    color: '#000',
  },
  header: {
    background: '#fff',
    borderBottom: '2px solid #1a237e',
    padding: '0',
    marginBottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
  },
  headerLogo: {
    height: 60,
    margin: '8px 16px 8px 24px',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#1a237e',
    margin: 0,
    letterSpacing: 1,
    lineHeight: 1.1,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#b71c1c',
    fontWeight: 600,
    margin: 0,
    letterSpacing: 0.5,
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginRight: 24,
  },
  nav: {
    background: '#1a237e',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    padding: '4px 0 4px 16px',
    borderBottom: '2px solid #bdbdbd',
    marginBottom: 0,
  },
  navItem: {
    color: '#fff',
    padding: '6px 18px 6px 0',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 'bold',
    border: 'none',
    background: 'none',
    outline: 'none',
  },
  formTable: {
    width: '100%',
    borderCollapse: 'collapse',
    background: '#fff',
    margin: 0,
    border: '1px solid #bdbdbd',
    fontSize: 13,
  },
  sectionHeader: {
    background: '#e3eafc',
    color: '#1a237e',
    fontWeight: 'bold',
    fontSize: 15,
    padding: '6px 8px',
    border: '1px solid #bdbdbd',
    borderBottom: 'none',
    letterSpacing: 0.5,
  },
  labelTd: {
    background: '#f5f8fd',
    color: '#1a237e',
    fontWeight: 'bold',
    fontSize: 13,
    padding: '6px 8px 6px 12px',
    border: '1px solid #bdbdbd',
    width: '18%',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
  },
  valTd: {
    background: '#fff',
    padding: '6px 8px',
    border: '1px solid #bdbdbd',
    width: '32%',
    verticalAlign: 'middle',
  },
  input: {
    width: '100%',
    padding: '4px 6px',
    fontSize: 13,
    border: '1px solid #bdbdbd',
    borderRadius: 0,
    background: '#fff',
    color: '#000',
    outline: 'none',
    boxSizing: 'border-box',
    height: 24,
  },
  select: {
    width: '100%',
    padding: '4px 6px',
    fontSize: 13,
    border: '1px solid #bdbdbd',
    borderRadius: 0,
    background: '#fff',
    color: '#000',
    outline: 'none',
    height: 28,
  },
  captchaRow: {
    background: '#fff',
    textAlign: 'center',
    padding: '10px 0',
    border: 'none',
  },
  captchaInput: {
    width: 140,
    margin: '8px 0 0 0',
    padding: '4px 6px',
    fontSize: 13,
    border: '1px solid #bdbdbd',
    borderRadius: 0,
    background: '#fff',
    color: '#000',
    outline: 'none',
    height: 24,
  },
  captchaHelp: {
    fontSize: 11,
    color: '#1a237e',
    marginTop: 2,
    marginBottom: 0,
  },
  captchaRefresh: {
    background: 'none',
    border: 'none',
    fontSize: 18,
    color: '#1a237e',
    cursor: 'pointer',
    marginLeft: 8,
    verticalAlign: 'middle',
  },
  btnRow: {
    background: '#fff',
    textAlign: 'right',
    padding: '12px 16px 12px 0',
    border: 'none',
  },
  submitBtn: {
    background: '#fff',
    color: '#1a237e',
    border: '1px solid #1a237e',
    borderRadius: 0,
    padding: '4px 18px',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
    marginRight: 0,
    cursor: 'pointer',
    outline: 'none',
    transition: 'background 0.2s',
  },
  error: {
    color: '#b71c1c',
    fontSize: 11,
    display: 'block',
    marginTop: 2,
  },
  footer: {
    background: '#fff',
    borderTop: '2px solid #1a237e',
    padding: '8px 12px',
    marginTop: 16,
    fontSize: 12,
    color: '#1a237e',
    textAlign: 'center',
  },
  footerLink: {
    color: '#1a237e',
    fontSize: 12,
    textDecoration: 'underline',
    margin: '0 4px',
  },
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.7)',
    zIndex: 999,
  },
  otpBox: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: 1000,
    background: '#fff',
    border: '3px solid #1a237e',
    padding: '10px 16px',
    width: 360,
    textAlign: 'center',
  },
  lbl: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#1a237e',
  },
};
