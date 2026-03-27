import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CCTNSClone = () => {
  const [showMain, setShowMain] = useState(false);
  const [showSub, setShowSub] = useState(false);
  const navigate = useNavigate();

  const itemStyle = {
    padding: "8px 10px",
    cursor: "pointer",
    borderBottom: "1px solid #bbb",
    fontSize: "1.05em"
  };

  return (
    <div style={{ fontFamily: "Times New Roman, serif", fontSize: "13px", color: "#000", backgroundColor: "#fff", minWidth: "1024px" }}>
      {/* Top Header */}
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

      {/* Blue Navigation Bar */}
      <div style={{ backgroundColor: "#003399", height: "32px", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "10px" }}>
        <span style={{ color: "#fff", fontSize: "18px", cursor: "pointer", marginRight: "6px" }}>💬</span>
        <span style={{ color: "#fff", fontSize: "18px", cursor: "pointer", marginRight: "6px" }}>❓</span>
        <span style={{ color: "#fff", fontSize: "18px", cursor: "pointer", marginRight: "6px" }}>👤</span>
        <span style={{ color: "#fff", fontSize: "18px", cursor: "pointer", marginRight: "6px" }}>🔒</span>
      </div>

      {/* Main Content Area */}
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            {/* Left/Center Content */}
            <td style={{ verticalAlign: "top", padding: "10px" }}>
              {/* Icons Row 1 */}
              <table cellPadding="0" cellSpacing="0" style={{ width: "85%", marginTop: "50px" }}>
                <tbody>
                  <tr>
                    {/* Complaint with Hover Menu */}
                    <td style={{ width: "15%", textAlign: "center", verticalAlign: "top", padding: "10px 20px", position: "relative" }}>
                      <div
                        style={{ position: "relative", width: "120px", margin: "5px auto 0" }}
                        onMouseEnter={() => setShowMain(true)}
                        onMouseLeave={() => {
                          setShowMain(false);
                          setShowSub(false);
                        }}
                      >
                        {/* ICON */}
                        <img
                          src="/complaint.png"
                          alt="Complaint"
                          style={{ width: 90, height: 90, cursor: "pointer", display: "block", margin: "0 auto 8px" }}
                        />
                        
                        {/* MAIN MENU */}
                        {showMain && (
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 100,
                              width: 260,
                              background: "#ffffff",
                              border: "1px solid #999",
                              boxShadow: "2px 2px 6px rgba(0,0,0,0.2)",
                              zIndex: 10,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center"
                            }}
                          >
                            {/* OPTION 1 */}
                            <div
                              style={{
                                padding: "10px 30px",
                                display: "flex",
                                justifyContent: "space-between",
                                cursor: "pointer",
                                fontSize: "1.05em",
                                borderBottom: "1px solid #bbb",
                              }}
                              onMouseEnter={() => setShowSub(true)}
                              onMouseLeave={() => setShowSub(false)}
                            >
                              Complaint &nbsp; &nbsp; ▶

                              {/* SUB MENU */}
                              {showSub && (
                                <div
                                  style={{
                                    position: "absolute",
                                    left: 260,
                                    width: 240,
                                    background: "#ffffff",
                                    border: "1px solid #999",
                                    boxShadow: "2px 2px 6px rgba(0,0,0,0.2)",
                                    zIndex: 20,
                                  }}
                                >
                                  <div style={itemStyle} onClick={() => {navigate("/form");}}>Add New Complaint Details</div>
                                  <div style={itemStyle}>Modify Complaint</div>
                                  <div style={itemStyle}>View Complaint</div>
                                </div>
                              )}
                            </div>

                            {/* OPTION 2 */}
                            <div style={itemStyle}>
                              CEIR Mobile Blocking/Unblocking &nbsp;▶
                            </div>
                          </div>
                        )}
                      </div>
                      <div style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", fontWeight: "bold" }}>Complaint</div>
                    </td>

                    {/* Citizen Services */}
                    <td style={{ width: "15%", textAlign: "center", verticalAlign: "top", padding: "10px 20px" }}>
                      <img src="/citizen-services.png" alt="Citizen Services" style={{ width: "90px", height: "90px", margin: "0 auto 8px", display: "block" }} />
                      <div style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", fontWeight: "bold" }}>Citizen Services</div>
                    </td>

                    {/* Citizen Tip */}
                    <td style={{ width: "15%", textAlign: "center", verticalAlign: "top", padding: "10px 20px" }}>
                      <img src="/citizen-tip.png" alt="Citizen Tip" style={{ width: "90px", height: "90px", margin: "0 auto 8px", display: "block" }} />
                      <div style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", fontWeight: "bold" }}>Citizen Tip</div>
                    </td>

                    {/* Search Status */}
                    <td style={{ width: "15%", textAlign: "center", verticalAlign: "top", padding: "10px 20px" }}>
                      <img src="/search-status.png" alt="Search Status" style={{ width: "90px", height: "90px", margin: "0 auto 8px", display: "block" }} />
                      <div style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", fontWeight: "bold" }}>Search Status</div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Icons Row 2 */}
              <table cellPadding="0" cellSpacing="0" style={{ width: "85%", marginTop: "10px" }}>
                <tbody>
                  <tr>
                    {/* Site Map */}
                    <td style={{ width: "15%", textAlign: "center", verticalAlign: "top", padding: "10px 20px" }}>
                      <img src="/site-map.png" alt="Site Map" style={{ width: "90px", height: "90px", margin: "0 auto 8px", display: "block" }} />
                      <div style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", fontWeight: "bold" }}>Site map</div>
                    </td>

                    {/* Citizen Information */}
                    <td style={{ width: "15%", textAlign: "center", verticalAlign: "top", padding: "10px 20px" }}>
                      <img src="/citizen-information.png" alt="Citizen Information" style={{ width: "90px", height: "90px", margin: "0 auto 8px", display: "block" }} />
                      <div style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", fontWeight: "bold" }}>Citizen Information</div>
                    </td>

                    {/* Citizen Feedback */}
                    <td style={{ width: "15%", textAlign: "center", verticalAlign: "top", padding: "10px 20px" }}>
                      <img src="/citizen-feedback.png" alt="Citizen Feedback" style={{ width: "90px", height: "90px", margin: "0 auto 8px", display: "block" }} />
                      <div style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", fontWeight: "bold" }}>Citizen Feedback</div>
                    </td>

                    {/* FAQ's */}
                    <td style={{ width: "15%", textAlign: "center", verticalAlign: "top", padding: "10px 20px" }}>
                      <img src="/faq's.png" alt="FAQ's" style={{ width: "90px", height: "90px", margin: "0 auto 8px", display: "block" }} />
                      <div style={{ fontFamily: "Arial, sans-serif", fontSize: "13px", fontWeight: "bold" }}>FAQ's</div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Bottom Two Columns */}
              <table cellPadding="0" cellSpacing="10" style={{ width: "100%", marginTop: "55px" }}>
                <tbody>
                  <tr>
                    {/* Latest Information */}
                    <td style={{ width: "48%", verticalAlign: "top", border: "1px solid #ccc", padding: "10px" }}>
                      <div style={{ color: "#0000cc", fontWeight: "bold", fontSize: "14px", fontFamily: "Arial, sans-serif", marginBottom: "8px" }}>Latest Information</div>
                      <p style={{ margin: 0, fontSize: "13px", fontFamily: "Times New Roman, serif", textAlign: "justify", lineHeight: "1.5" }}>
                        Maharashtra, the third largest State in Republic of India, has one of the largest police forces in the country. Maharashtra, a highly industrialized State with large urban conglomerates, has adopted Commissionerate system for policing its large cities. The State has 10 Commissionerates and 36 district police units. The motto of Maharashtra Police is <strong>"सद्रक्षणाय खलनिग्रहणाय"</strong>. It means that Maharashtra Police is committed to PROTECTING THE RIGHTOUS WHILE CONTROLLING &amp; ANNIHILATING THE EVIL. Maharashtra Police is headed by Director General of Police. The State police Head Quarter is located at Mumbai.
                      </p>
                    </td>

                    {/* Contact Us */}
                    <td style={{ width: "52%", verticalAlign: "top", border: "1px solid #ccc", padding: "10px" }}>
                      <div style={{ color: "#0000cc", fontWeight: "bold", fontSize: "14px", fontFamily: "Arial, sans-serif", marginBottom: "8px" }}>Contact Us</div>
                      <p style={{ margin: 0, fontSize: "13px", fontFamily: "Times New Roman, serif", lineHeight: "1.8" }}>
                        State Crime Records Bureau<br />
                        Special Inspector General of Police, Maharashtra State,<br />
                        Chavan Nagar, Pashan Road, Pune : 411 008, India<br />
                        Telephone :(91-11) 26172324, 26105353<br />
                        Fax : 020 5638444
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>

            {/* Right Sidebar */}
            <td style={{ width: "320px", verticalAlign: "top", borderLeft: "1px solid #ccc", padding: "10px", paddingLeft: "15px" }}>
              <div style={{ color: "#0000cc", fontWeight: "bold", fontSize: "18px", fontFamily: "Arial, sans-serif", marginBottom: "12px", marginTop: "18px" }}>Publications</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: "28px", paddingLeft: "15px" }}>
                {["Crime in India 2016", "Crime in India 2015", "Crime in India 2014", "Crime in India 2013", "Crime in India 2012"].map((item, i) => (
                  <li key={i} style={{ padding: "5px 0", fontSize: "15px" }}>
                    <span style={{ color: "#0000cc", marginRight: "6px" }}>›</span>
                    <a href="#" style={{ color: "#000", textDecoration: "none", fontFamily: "Arial, sans-serif", fontSize: "15px" }}>{item}</a>
                  </li>
                ))}
              </ul>

              <div style={{ color: "#0000cc", fontWeight: "bold", fontSize: "18px", fontFamily: "Arial, sans-serif", marginBottom: "12px", marginTop: "28px" }}>Service Available</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: "28px", paddingLeft: "15px" }}>
                {["Complaint", "Tips", "Verificationservices", "NOCServices", "Feedback", "FAQ's"].map((item, i) => (
                  <li key={i} style={{ padding: "5px 0", fontSize: "15px" }}>
                    <span style={{ color: "#0000cc", marginRight: "6px" }}>›</span>
                    <a href="#" style={{ color: "#000", textDecoration: "none", fontFamily: "Arial, sans-serif", fontSize: "15px" }}>{item}</a>
                  </li>
                ))}
              </ul>

              <div style={{ borderTop: "1px solid #ccc", paddingTop: "8px", fontSize: "12px", fontFamily: "Arial, sans-serif" }}>
                <span style={{ color: "#0000cc", fontWeight: "bold" }}>Last Updated:</span> 07/04/2022
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Footer Links */}
      <div style={{ padding: "6px 10px", borderTop: "1px solid #ccc", fontSize: "12px", fontFamily: "Arial, sans-serif" }}>
        {["About Us", "Privacy Policy", "Hyperlink Policy", "Copyright Policy", "Disclaimer", "Contact Us", "Terms and Conditions"].map((link, i, arr) => (
          <span key={i}>
            <a href="#" style={{ color: "#0000cc", textDecoration: "none" }}>{link}</a>
            {i < arr.length - 1 && <span style={{ margin: "0 4px", color: "#000" }}>|</span>}
          </span>
        ))}
      </div>
      <div style={{ padding: "2px 10px 4px", fontSize: "12px", fontFamily: "Arial, sans-serif", color: "#000" }}>
        Disclaimer:User will be liable to be prosecuted for malicious complaint or content in accordance with the law in force
      </div>
      <div style={{ padding: "0 10px 8px", fontSize: "12px", fontFamily: "Arial, sans-serif", color: "#000" }}>
        This website belongs to National Crime Records Bureau, Ministry of Home Affairs,Government of India. Best viewed at : 1024x768, IE 7, Firefox 3.6.3
      </div>
    </div>
  );
};

export default CCTNSClone;