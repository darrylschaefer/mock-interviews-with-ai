import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState, useEffect, useRef } from "react";
import Console from "src/components/Console";

const MediaStreamWrapper = ({ children }) => {
  const [userMediaStream, setUserMediaStream] = useState(null);

  useEffect(() => {
    // Initialize getUserMedia on component mount
    const initMediaStream = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      setUserMediaStream(stream);
    };

    initMediaStream();
  }, []);

  return children({ userMediaStream, setUserMediaStream });
};

export default function Home() {
  function introduction() {
    return {
      role: "assistant",
      content: "Please wait while the system initializes...",
    };
  }

  // textInput is the text input by the user in the console text input field
  const [textInput, setTextInput] = useState("");

  // audioRefs is an array of refs to the audio elements that are used to play audio samples, it's filled with nulls to prevent errors
  const audioRefs = useRef(Array(512).fill(null));

  // sessionMessages is an array of objects that contain the messages that are displayed in the console and sent to the chatGPT API
  const sessionMessages = useRef([introduction()]);

  // detecitonSettings is an object that contains the settings for the detection of the user's voice. activityDetection is a boolean that is true if the user has the setting enabled. activityDetectionThreshold is a number that is the threshold for the detection of the user's voice
  const detectionSettings = useRef({
    activityDetection: true,
    activityDetectionThreshold: 10,
  });

  // promptOpen determines whether the prompt edit box is open
  const [promptOpen, setPromptOpen] = useState(false);

  // activityDetection stores state for the microphone & it's associated color change, 0 = no activity, 1 = ready to record, 2- = recording, 4 - disabled
  const [activityDetection, setActivityDetection] = useState(0);

  // This goes in the input field for user to type in their job description
  const [preprocessedJobDescription, setPreprocessedJobDescription] =
    useState("");

  // playQueue controls playing audio samples
  const [playQueue, setPlayQueue] = useState([]);

  // Used for detection of the last audio sample produced by AI, removed when it finishes playing
  const [currentAIAudio, setCurrentAIAudio] = useState(null);

  const [currentAudio, setCurrentAudio] = useState(null);

  // currentSession is a ref to the current session, used to stop the session when the user abandons it
  const currentSession = useRef(null);

  // micQuiet is the delay in milliseconds before the microphone is considered to be quiet
  const micQuiet = useRef(3000);

  // basic rerender state, used to force rerendering of components
  const [rerender, setRerender] = useState(0);

  // This is a stored prompt that is used to generate new sessions
  const selectedPrompt = useRef("");

  const interviewSettings = useRef({
    personalityOptions: [
      {
        label: "Friendly",
        value: "friendly and warm",
        enabled: true,
      },
      {
        label: "Formal",
        value: "formal and professional",
        enabled: false,
      },
      {
        label: "Challenging",
        value: "challenging and engaging",
        enabled: false,
      },
      {
        label: "Encouraging",
        value: "encouraging and supportive",
        enabled: false,
      },
      {
        label: "Enthusiastic",
        value: "enthusiastic and energetic",
        enabled: false,
      },
    ],
    questionTypes: [
      {
        label: "Behavioral",
        value: "behavioral",
        enabled: true,
      },
      {
        label: "Technical",
        value: "technical",
        enabled: true,
      },
      {
        label: "Culture Fit",
        value: "culture",
        enabled: true,
      },
      {
        label: "Situational",
        value: "situational",
        enabled: true,
      },
    ],
    feedback: true,
  });

  function resetPlaceholderPrompt() {
    sessionMessages.current = [
      {
        role: "welcome",
        content: "",
        //  + placeholder,
      },
    ];
    setRerender(rerender + 1);
  }

  useEffect(() => {
    fetch("/api/credentials").then((response) => {
      response.json().then((data) => {
        if (data.messages.length > 0) {
          sessionMessages.current = [introduction, ...data.messages];
          setRerender(rerender + 1);
        } else {
          resetPlaceholderPrompt();
        }
      });
    });
  }, []);

  return (
    <>
      <Head>
        <title>mock-interviews-with-ai</title>
        <meta name="description" content="have a mock interview with ai." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <MediaStreamWrapper>
            {({ userMediaStream, setUserMediaStream }) => (
              <>
                <Console
                  selectedPrompt={selectedPrompt}
                  rerender={rerender}
                  setRerender={setRerender}
                  sessionMessages={sessionMessages}
                  textInput={textInput}
                  setTextInput={setTextInput}
                  detectionSettings={detectionSettings}
                  currentAudio={currentAudio}
                  setCurrentAudio={setCurrentAudio}
                  activityDetection={activityDetection}
                  setActivityDetection={setActivityDetection}
                  currentAIAudio={currentAIAudio}
                  setCurrentAIAudio={setCurrentAIAudio}
                  playQueue={playQueue}
                  setPlayQueue={setPlayQueue}
                  audioRefs={audioRefs}
                  userMediaStream={userMediaStream}
                  currentSession={currentSession}
                  promptOpen={promptOpen}
                  setPromptOpen={setPromptOpen}
                  micQuiet={micQuiet}
                  resetPlaceholderPrompt={resetPlaceholderPrompt}
                  preprocessedJobDescription={preprocessedJobDescription}
                  setPreprocessedJobDescription={setPreprocessedJobDescription}
                  interviewSettings={interviewSettings}
                ></Console>
              </>
            )}
          </MediaStreamWrapper>
        </div>
      </main>
    </>
  );
}
