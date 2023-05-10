import React, { useState, useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import dialogStyles from "@/styles/Dialog.module.css";

const Prompt = ({
  selectedPrompt: selectedPrompt,
  setSelectedPrompt: setSelectedPrompt,
  promptOpen: promptOpen,
  setPromptOpen: setPromptOpen,
  rerender: rerender,
  setRerender: setRerender,
  preprocessedJobDescription: preprocessedJobDescription,
  setPreprocessedJobDescription: setPreprocessedJobDescription,
  processedJobDescription: processedJobDescription,
  setProcessedJobDescription: setProcessedJobDescription,
}) => {
  const [loading, setLoading] = useState(false);

  function exitPrompt() {
    try {
      setLoading(true);

      fetch("/api/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription: preprocessedJobDescription,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          console.log("changing job description to: ", data.summary);
          setPreprocessedJobDescription(data.summary);
          setLoading(false);
          setPromptOpen(false);
        });
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <Dialog.Root open={promptOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={dialogStyles.DialogOverlay} />
        <Dialog.Content className={dialogStyles.DialogContent}>
          <Dialog.Title className={dialogStyles.DialogTitle}>
            Job Description
          </Dialog.Title>
          <Dialog.Description className={dialogStyles.DialogDescription}>
            Paste a description of a job you want to apply for. The system will
            summarize this description automatically.
          </Dialog.Description>

          <fieldset className={dialogStyles.Fieldset}>
            <label className={dialogStyles.Label} htmlFor="sysprompt">
              Job Description
            </label>
            <textarea
              className={dialogStyles.Input}
              id="sysprompt"
              value={preprocessedJobDescription}
              onChange={(event) => {
                setPreprocessedJobDescription(event.target.value);
              }}
            />
          </fieldset>
          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button
                onClick={() => exitPrompt()}
                className={dialogStyles.Button}
              >
                {loading ? "Loading..." : "Save changes"}
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild onClick={() => setPromptOpen(false)}>
            <button className={dialogStyles.IconButton} aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Prompt;
