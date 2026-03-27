import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const CAPTCHA_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";

function generateCaptcha(len = 6) {
  let s = "";
  for (let i = 0; i < len; i++)
    s += CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)];
  return s;
}

function CaptchaImage({ text }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Noise lines
    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = `hsl(${Math.random() * 360},50%,60%)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Text
    ctx.font = "bold 22px 'Courier New', monospace";
    ctx.fillStyle = "#222";
    for (let i = 0; i < text.length; i++) {
      ctx.save();
      ctx.translate(14 + i * 18, 28 + Math.random() * 6 - 3);
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.fillStyle = `hsl(${Math.random() * 360},60%,30%)`;
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }

    // Noise dots
    for (let i = 0; i < 30; i++) {
      ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.3})`;
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        1,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
  }, [text]);

  return (
    <canvas
      ref={canvasRef}
      width={130}
      height={40}
      style={{ border: "1px solid #ccc", display: "block" }}
    />
  );
}

function OtpModal({ visible, onClose }) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    if (visible) {
      setResendDisabled(true);
      setTimer(60);
    }
  }, [visible]);

  useEffect(() => {
    if (timer <= 0) {
      setResendDisabled(false);
      return;
    }
    const t = setTimeout(() => setTimer((p) => p - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  if (!visible) return null;

  return (
    <>
      <div style={styles.backdrop} />
      <div style={styles.otpPopup}>
        <span style={{ fontWeight: "bold", fontSize: 14 }}>
          Enter OTP recieved on Mobile Number
        </span>
        <br />
        <br />
        <table>
          <tbody>
            <tr>
              <td>
                <span style={styles.lbl}>Enter OTP</span>&nbsp;&nbsp;&nbsp;
              </td>
              <td>
                <input
                  type="password"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  style={{ fontSize: 14 }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        {timer > 0 && (
          <span style={{ color: "green" }}>Resend OTP in {timer} seconds</span>
        )}
        <br />
        <br />
        <button
          style={styles.submitBtn}
          onClick={() => {
            if (otp === "12345") {
              navigate("/home");
            }
          }}
        >
          Submit
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button style={styles.submitBtn} disabled={resendDisabled}>
          Resend
        </button>
        <br />
        <br />
        <span style={{ color: "green" }}>OTP Sent to the Mobile Number</span>
      </div>
    </>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [language, setLanguage] = useState("0");
  const [captchaText, setCaptchaText] = useState(() => generateCaptcha());
  const [errors, setErrors] = useState({});
  const [otpVisible, setOtpVisible] = useState(false);

  const refreshCaptcha = () => {
    setCaptchaText(generateCaptcha());
    setCaptchaInput("");
  };

  const validate = () => {
    const e = {};
    if (!username) e.username = "Please enter Username";
    if (!password) e.password = "Please enter Password";
    else if (password.length < 8)
      e.password = "Password should be 8 characters or more";
    if (!captchaInput) e.captcha = "Please enter code";
    return e;
  };

  const handleLogin = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      if (captchaInput !== captchaText) {
        setErrors({ captcha: "Incorrect captcha. Please try again." });
        refreshCaptcha();
        return;
      }
      // Hardcoded login for test@gmail.com / 12345
      if (username === "test@gmail.com" && password === "12345") {
        navigate("/home");
        return;
      }
      setOtpVisible(true);
    }
  };

  return (
    <div style={styles.body}>
      <OtpModal visible={otpVisible} onClose={() => setOtpVisible(false)} />

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.logoArea}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/120px-Emblem_of_India.svg.png"
            alt="India Emblem"
            style={{ height: 70, marginRight: 12 }}
          />
          <div>
            <div style={styles.headerTitle}>
              Government of India — Ministry of Home Affairs
            </div>
            <div style={styles.headerSubtitle}>
              Maharashtra Police — Citizen Services Portal
            </div>
          </div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Flag_of_Maharashtra.svg/120px-Flag_of_Maharashtra.svg.png"
            alt="Maharashtra Flag"
            style={{ height: 55, marginLeft: "auto", marginRight: 16 }}
          />
        </div>
      </div>

      {/* Nav */}
      <div style={styles.nav}>
        <span style={styles.navItem}>Home</span>
        <span style={styles.navItem}>About</span>
        <span style={styles.navItem}>Services</span>
        <span style={styles.navItem}>Contact</span>
      </div>

      {/* Content */}
      <div style={styles.content}>
        {/* Left column */}
        <div style={styles.leftCol}>
          {/* Quick links */}
          <table style={{ marginBottom: 16 }}>
            <tbody>
              <tr>
                <td style={styles.quickCell}>
                  <img
                    src="https://img.icons8.com/color/48/tip.png"
                    alt="tip"
                    style={{ height: 60 }}
                  />
                  <br />
                  <span style={styles.quickLabel}>Citizen Tip</span>
                </td>
                <td style={styles.quickCell}>
                  <img
                    src="https://img.icons8.com/color/48/feedback.png"
                    alt="feedback"
                    style={{ height: 60 }}
                  />
                  <br />
                  <span style={styles.quickLabel}>Citizen Feedback</span>
                </td>
                <td style={styles.quickCell}>
                  <img
                    src="https://img.icons8.com/color/48/help.png"
                    alt="faq"
                    style={{ height: 60 }}
                  />
                  <br />
                  <span style={styles.quickLabel}>FAQ's</span>
                </td>
              </tr>
            </tbody>
          </table>

          {/* About box */}
          <div style={styles.box}>
            <div style={styles.boxTitle}>About Police Department</div>
            <p style={styles.bodyText}>
              "The Indian Police Service, simply known as Indian Police or IPS,
              is one of the three All India Services of the Government of India.
              In 1948, a year after India gained independence from Britain, the
              Imperial Police (IP) was replaced by the Indian Police Service.
              <br />
              The IPS is not a law enforcement agency; rather it is a civil
              service in which officers are selected on the basis of professional
              merit as proven by competitive examinations, and to which all
              police officers are professionally identified. Police officers are
              employed by the police departments of respective states of India."
            </p>
          </div>

          {/* Latest + Contact */}
          <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
            <div style={{ ...styles.box, flex: 1 }}>
              <div style={styles.boxTitle}>Latest Information</div>
              <p style={styles.bodyText}>
                "The Central government is implementing an ambitious scheme
                called "Crime and Criminal Tracking Network System (CCTNS)". The
                goals of the system are to facilitate collection, storage,
                retrieval, analysis, transfer and sharing of data and
                information at the police station and between the police station
                and the State Headquarters and the Central Police
                Organizations."
              </p>
            </div>
            <div style={{ ...styles.box, flex: 1 }}>
              <div style={styles.boxTitle}>Contact Us</div>
              <p style={styles.bodyText}>
                State Crime Records Bureau,
                <br />
                Special Inspector General of Police,
                <br />
                Maharashtra State,
                <br />
                Chavan Nagar, Pashan Road, Pune : 411 008, India
                <br />
                Telephone : 020 25638452 Fax : 020 5638444
              </p>
            </div>
          </div>
        </div>

        {/* Right column — login form */}
        <div style={styles.rightCol}>
          <div style={styles.loginBox}>
            <div style={styles.boxTitle}>Citizen Login</div>

            <table style={{ width: "100%" }}>
              <tbody>
                {/* Username */}
                <tr>
                  <td>
                    <label htmlFor="login-username" style={styles.lbl}>Username</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      id="login-username"
                      type="text"
                      maxLength={30}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={styles.input}
                      tabIndex={1}
                      title="Enter Username"
                    />
                    {errors.username && (
                      <span style={styles.error}>{errors.username}</span>
                    )}
                  </td>
                </tr>

                {/* Password */}
                <tr>
                  <td>
                    <label htmlFor="login-password" style={styles.lbl}>Password</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      id="login-password"
                      type="password"
                      maxLength={30}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={styles.input}
                      tabIndex={2}
                      title="Enter Password"
                      autoComplete="off"
                    />
                    {errors.password && (
                      <span style={styles.error}>{errors.password}</span>
                    )}
                  </td>
                </tr>

                {/* Captcha */}
                <tr>
                  <td style={{ paddingTop: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <CaptchaImage text={captchaText} />
                      <button
                        type="button"
                        onClick={refreshCaptcha}
                        title="Refresh Captcha"
                        style={styles.refreshBtn}
                      >
                        ↻
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span style={{ fontSize: 10 }}>
                      Enter the characters in the textbox below
                    </span>
                    <br />
                    <span style={{ fontSize: 10 }}>
                      Characters are case sensitive
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      id="login-captcha"
                      type="text"
                      maxLength={7}
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      style={styles.input}
                      tabIndex={3}
                    />
                    {errors.captcha && (
                      <span style={styles.error}>{errors.captcha}</span>
                    )}
                  </td>
                </tr>

                {/* Language */}
                <tr>
                  <td>
                    <label htmlFor="login-language" style={styles.lbl}>Language</label>
                  </td>
                </tr>
                <tr>
                  <td style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <select
                      id="login-language"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      tabIndex={4}
                      style={styles.select}
                    >
                      <option value="0">English</option>
                      <option value="1">मराठी</option>
                    </select>
                    <button
                      type="button"
                      onClick={handleLogin}
                      tabIndex={5}
                      style={styles.loginBtn}
                      title="Click on Login Button to log into the Citizen Services Portal."
                    >
                      Login
                    </button>
                    <span
                      title="Help"
                      style={{ cursor: "pointer", fontSize: 20 }}
                    >
                      ❓
                    </span>
                  </td>
                </tr>

                {/* Links */}
                <tr>
                  <td style={{ paddingTop: 8 }}>
                  <span
                  style={styles.link}
                  onClick={() => navigate("/register")}
                  >
                  Create citizen login
                  </span>
                    &emsp;
                    <a href="#" style={styles.link}>
                      Forgot Password
                    </a>{" "}
                    <img
                      src="https://img.icons8.com/fluency/12/new.png"
                      alt="new"
                    />
                    &emsp;
                    <a href="#" style={styles.link}>
                      Help
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingTop: 4 }}>
                    <a href="#" style={styles.link}>
                      Download Offline E-Forms
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* External Links */}
          <div style={{ marginTop: 12 }}>
            <div style={styles.boxTitle}>External Links</div>
            <ul style={{ paddingLeft: 16, margin: "4px 0" }}>
              <li>
                <a href="http://india.gov.in/" target="_blank" rel="noreferrer">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Flag_of_India.svg/80px-Flag_of_India.svg.png"
                    alt="India Gov"
                    style={{ width: 80, height: 30, objectFit: "cover" }}
                  />
                </a>
              </li>
            </ul>
          </div>

          <div style={{ marginTop: 12, fontSize: 11 }}>
            <b>Last Updated:</b> 11/1/2023
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <div style={{ textAlign: "center", marginBottom: 6 }}>
          {[
            "About Us",
            "Privacy Policy",
            "Hyperlink Policy",
            "Copyright Policy",
            "Disclaimer",
            "Contact Us",
            "Terms and Conditions",
          ].map((item, i, arr) => (
            <span key={item}>
              <a href="#" style={styles.footerLink}>
                {item}
              </a>
              {i < arr.length - 1 && " | "}
            </span>
          ))}
        </div>
        <div style={styles.copyright}>
          <b>CAS CITIZEN Ver 4.5.0</b>
          <br />
          This website belongs to National Crime Records Bureau, Ministry of
          Home Affairs, Government of India. Best viewed at : 1024x768, IE 7,
          Firefox 3.6.3
        </div>
      </div>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    fontSize: 12,
    background: "#fff",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: "#e8e8e8",
    borderBottom: "2px solid #6b0000",
    padding: "6px 12px",
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6b0000",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#333",
  },
  nav: {
    background: "#6b0000",
    display: "flex",
    gap: 0,
  },
  navItem: {
    color: "#fff",
    padding: "6px 16px",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: "bold",
    borderRight: "1px solid #900",
  },
  content: {
    display: "flex",
    gap: 12,
    padding: "10px 12px",
    flex: 1,
  },
  leftCol: {
    flex: 3,
  },
  rightCol: {
    flex: 1,
    minWidth: 230,
  },
  box: {
    border: "1px solid #c9c9c9",
    padding: 8,
    background: "#f9f9f9",
    marginBottom: 6,
  },
  loginBox: {
    border: "1px solid #c9c9c9",
    padding: 10,
    background: "#f9f9f9",
  },
  boxTitle: {
    background: "#6b0000",
    color: "#fff",
    padding: "3px 8px",
    fontWeight: "bold",
    fontSize: 12,
    marginBottom: 6,
  },
  bodyText: {
    margin: 0,
    fontSize: 11,
    lineHeight: 1.5,
  },
  quickCell: {
    textAlign: "center",
    padding: "4px 12px",
    cursor: "pointer",
  },
  quickLabel: {
    fontSize: 11,
  },
  lbl: {
    fontWeight: "bold",
    fontSize: 11,
  },
  input: {
    width: "95%",
    padding: "3px 4px",
    fontSize: 12,
    border: "1px solid #999",
    marginBottom: 4,
  },
  select: {
    fontSize: 12,
    padding: "2px",
  },
  loginBtn: {
    background: "#6b0000",
    color: "#fff",
    border: "none",
    padding: "4px 14px",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: "bold",
  },
  refreshBtn: {
    background: "none",
    border: "1px solid #999",
    cursor: "pointer",
    fontSize: 16,
    padding: "2px 6px",
  },
  error: {
    color: "red",
    fontSize: 11,
    display: "block",
  },
  link: {
    color: "#00f",
    textDecoration: "underline",
    fontSize: 11,
    cursor: "pointer",
  },
  footer: {
    background: "#e8e8e8",
    borderTop: "2px solid #6b0000",
    padding: "8px 12px",
  },
  footerLink: {
    color: "#00f",
    fontSize: 11,
    textDecoration: "none",
  },
  copyright: {
    textAlign: "center",
    fontSize: 11,
    color: "#333",
  },
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    zIndex: 999,
  },
  otpPopup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    zIndex: 1000,
    background: "#fff",
    border: "3px solid #000",
    padding: "10px 16px",
    width: 360,
    textAlign: "center",
  },
  submitBtn: {
    padding: "3px 12px",
    cursor: "pointer",
  },
};