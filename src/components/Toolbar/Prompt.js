import React from "react";
import styles from "@/styles/Toolbar.module.css";

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
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Prompt;
