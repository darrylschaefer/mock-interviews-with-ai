import React from "react";
import { Mic } from 'react-feather';
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
        <Mic size={22} />
      </div>
    </div>
  );
};

export default Microphone;
