import React from "react";
import styles from "@/styles/Toolbar.module.css";

const Microphone = ({
  activityDetection: activityDetection,
  handleMicrophoneSubmit: handleMicrophoneSubmit,
}) => {
  let borderStyle;

  switch (activityDetection) {
    case 1:
      borderStyle = "3px solid orange";
      break;
    case 2:
      borderStyle = "3px solid red";
      break;
    case 3:
      borderStyle = "3px solid grey";
      break;
    default:
      borderStyle = "";
      break;
  }

  return (
    <div
      className={styles.ToolbarButtonMicrophone}
      style={{
        border: borderStyle,
      }}
      onClick={handleMicrophoneSubmit}
    >
      <div style={{ lineHeight: 1, display: "flex" }}>
        <svg
          viewBox="0 0 24 24"
          width="22"
          height="22"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      </div>
    </div>
  );
};

export default Microphone;
