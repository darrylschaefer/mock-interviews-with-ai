import React from "react";
import styles from "@/styles/Toolbar.module.css";
import { Edit } from 'react-feather';

const Prompt = ({
  setPromptOpen: setPromptOpen,
  rerender: rerender,
  setRerender: setRerender,
}) => {
  function handlePromptSubmit() {
    setPromptOpen(true);
    setRerender(rerender + 1);
    console.log("Prompt button clicked");
  }

  return (
    <div className={styles.ToolbarButton} onClick={handlePromptSubmit}>
      <div style={{ lineHeight: 1, display: "flex" }}>
        <Edit size={22} />
      </div>
    </div>
  );
};

export default Prompt;
