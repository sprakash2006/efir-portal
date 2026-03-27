import React from "react";

const MainTabs = ({ activeMainTab, setActiveMainTab }) => {
  const tabs = [
    { key: "complainantDetail", label: "Complainant Detail" },
    { key: "accusedDetail", label: "Accused Detail" },
    { key: "incidentDetail", label: "Incident Detail" },
    { key: "complaintSubmissionDetails", label: "Complaint Submission Details" },
    { key: "complaintDetail", label: "Complaint Detail" },
  ];

  return (
    <div className="main-tabs">
      {tabs.map((tab) => (
        <div
          key={tab.key}
          id={`tab-${tab.key}`}
          className={`main-tab ${activeMainTab === tab.key ? "main-tab-active" : ""}`}
          onClick={() => setActiveMainTab(tab.key)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default MainTabs;
