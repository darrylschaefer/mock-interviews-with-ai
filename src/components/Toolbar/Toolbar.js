import styles from "@/styles/Toolbar.module.css";
import Microphone from "src/components/toolbar/Microphone";
import Prompt from "src/components/toolbar/Prompt";
import Dropdown from "src/components/Dropdown/Dropdown";

const Toolbar = ({
  activityDetection: activityDetection,
  handleMicrophoneSubmit: handleMicrophoneSubmit,
  currentSession: currentSession,
  detectionSettings: detectionSettings,
  setDetectionSettings: setDetectionSettings,
  voiceNames: voiceNames,
  voiceId: voiceId,
  selectedPrompt: selectedPrompt,
  rerender: rerender,
  setRerender: setRerender,
  sessionMessages: sessionMessages,
  setActivityDetection: setActivityDetection,
  promptOpen: promptOpen,
  setPromptOpen: setPromptOpen,
  micQuiet: micQuiet,
  resetPlaceholderPrompt: resetPlaceholderPrompt,
  preprocessedJobDescription: preprocessedJobDescription,
  setPreprocessedJobDescription: setPreprocessedJobDescription,
  processedJobDescription: processedJobDescription,
  setProcessedJobDescription: setProcessedJobDescription,
  interviewSettings: interviewSettings,
}) => {
  return (
    <div className={styles.Toolbar}>
      <Dropdown
        currentSession={currentSession}
        detectionSettings={detectionSettings}
        setDetectionSettings={setDetectionSettings}
        voiceNames={voiceNames}
        voiceId={voiceId}
        activityDetection={activityDetection}
        handleMicrophoneSubmit={handleMicrophoneSubmit}
        selectedPrompt={selectedPrompt}
        rerender={rerender}
        setRerender={setRerender}
        sessionMessages={sessionMessages}
        setActivityDetection={setActivityDetection}
        promptOpen={promptOpen}
        setPromptOpen={setPromptOpen}
        micQuiet={micQuiet}
        resetPlaceholderPrompt={resetPlaceholderPrompt}
        interviewSettings={interviewSettings}
      ></Dropdown>
      <Microphone
        activityDetection={activityDetection}
        handleMicrophoneSubmit={handleMicrophoneSubmit}
      />
      <Prompt
        selectedPrompt={selectedPrompt}
        rerender={rerender}
        setRerender={setRerender}
        promptOpen={promptOpen}
        setPromptOpen={setPromptOpen}
        preprocessedJobDescription={preprocessedJobDescription}
        setPreprocessedJobDescription={setPreprocessedJobDescription}
        processedJobDescription={processedJobDescription}
        setProcessedJobDescription={setProcessedJobDescription}
      />
    </div>
  );
};

export default Toolbar;
