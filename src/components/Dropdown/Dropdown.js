import React, { useState, useEffect, useRef } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  HamburgerMenuIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";

import styles from "@/styles/DropdownMenu.module.css";
import ThresholdSlider from "/src/components/Dropdown/ThresholdSlider";
import Prompt from "src/components/Dropdown/Prompt";
import MicQuietSlider from "./MicQuietSlider";

const Dropdown = ({
  currentSession: currentSession,
  detectionSettings: detectionSettings,
  voiceNames: voiceNames,
  voiceId: voiceId,
  activityDetection: activityDetection,
  handleMicrophoneSubmit: handleMicrophoneSubmit,
  selectedPrompt: selectedPrompt,
  systemPrompt: systemPrompt,
  setSystemPrompt: setSystemPrompt,
  promptOptions: promptOptions,
  rerender: rerender,
  setRerender: setRerender,
  sessionMessages: sessionMessages,
  setActivityDetection: setActivityDetection,
  promptOpen: promptOpen,
  setPromptOpen: setPromptOpen,
  micQuiet: micQuiet,
  resetPlaceholderPrompt: resetPlaceholderPrompt,
  interviewSettings: interviewSettings,
}) => {
  function abandonSession() {
    setActivityDetection(0);
    setRerender(rerender + 1);
    if (currentSession.current == null) {
      sessionMessages.current.push({
        role: "alert",
        content: "No session.",
      });
      return;
    } else {
      sessionMessages.current = [
        { role: "alert", content: "Abandoned session." },
        { role: "system", content: selectedPrompt.current[0] },
      ];
      currentSession.current.stop();
      currentSession.current = null;
    }
  }

  function openPrompt() {
    setPromptOpen(true);
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className={styles.IconButton} aria-label="Customise options">
          <svg
            viewBox="0 0 24 24"
            width="22"
            height="22"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.DropdownMenuContent}
          sideOffset={5}
        >
          <DropdownMenu.Item
            onSelect={abandonSession}
            className={styles.DropdownMenuItem}
          >
            Abandon Session
          </DropdownMenu.Item>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className={styles.DropdownMenuSubTrigger}>
              Voices
              <div className={styles.RightSlot}>
                <ChevronRightIcon />
              </div>
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className={styles.DropdownMenuSubContent}
                sideOffset={2}
                alignOffset={-5}
              >
                <DropdownMenu.Label className={styles.DropdownMenuLabel}>
                  Amazon Polly
                </DropdownMenu.Label>

                {voiceNames.options.map((name, i) => (
                  <DropdownMenu.CheckboxItem
                    key={i}
                    className={styles.DropdownMenuItem}
                    checked={name.label === voiceId.current}
                    onSelect={() => {
                      voiceId.current = name.label;
                      setRerender(rerender + 1);
                    }}
                  >
                    <DropdownMenu.ItemIndicator
                      className={styles.DropdownMenuItemIndicator}
                    >
                      <CheckIcon />
                    </DropdownMenu.ItemIndicator>
                    {name.label}
                  </DropdownMenu.CheckboxItem>
                ))}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator className={styles.Separator} />

          <DropdownMenu.Label className={styles.DropdownMenuLabel}>
            Question Types
          </DropdownMenu.Label>

          {interviewSettings.current.questionTypes.map((type, i) => (
            <DropdownMenu.CheckboxItem
              key={i}
              className={styles.DropdownMenuCheckboxItem}
              checked={type.enabled}
              onCheckedChange={(value) => {
                interviewSettings.current.questionTypes[i].enabled = value;
                setRerender(rerender + 1);
              }}
            >
              <DropdownMenu.ItemIndicator
                className={styles.DropdownMenuItemIndicator}
              >
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
              {type.label}
            </DropdownMenu.CheckboxItem>
          ))}

          <DropdownMenu.Separator className={styles.Separator} />

          <DropdownMenu.Label className={styles.DropdownMenuLabel}>
            Personality
          </DropdownMenu.Label>

          {interviewSettings.current.personalityOptions.map((type, i) => (
            <DropdownMenu.CheckboxItem
              key={i}
              className={styles.DropdownMenuCheckboxItem}
              checked={type.enabled}
              onCheckedChange={(value) => {
                // set all personality options to false
                interviewSettings.current.personalityOptions.forEach(
                  (option) => {
                    option.enabled = false;
                  }
                );
                // set the selected personality option to true
                interviewSettings.current.personalityOptions[i].enabled = true;
                setRerender(rerender + 1);
              }}
            >
              <DropdownMenu.ItemIndicator
                className={styles.DropdownMenuItemIndicator}
              >
                <CheckIcon />
              </DropdownMenu.ItemIndicator>
              {type.label}
            </DropdownMenu.CheckboxItem>
          ))}

          <DropdownMenu.Separator className={styles.Separator} />

          <DropdownMenu.CheckboxItem
            className={styles.DropdownMenuCheckboxItem}
            checked={detectionSettings.current.activityDetection}
            onCheckedChange={(value) => {
              detectionSettings.current.activityDetection = value;
              console.log(value);
              setRerender(rerender + 1);
            }}
          >
            <DropdownMenu.ItemIndicator
              className={styles.DropdownMenuItemIndicator}
            >
              <CheckIcon />
            </DropdownMenu.ItemIndicator>
            Automatic Detection
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.Separator className={styles.Separator} />

          <DropdownMenu.Label className={styles.DropdownMenuLabel}>
            Voice Threshold (
            {detectionSettings.current.activityDetectionThreshold})
            <ThresholdSlider
              detectionSettings={detectionSettings}
              setRerender={setRerender}
              rerender={rerender}
            ></ThresholdSlider>
          </DropdownMenu.Label>
          <DropdownMenu.Separator className={styles.Separator} />

          <DropdownMenu.Label className={styles.DropdownMenuLabel}>
            Mic Pause Timer ({micQuiet.current}ms)
            <MicQuietSlider
              setRerender={setRerender}
              rerender={rerender}
              micQuiet={micQuiet}
            ></MicQuietSlider>
          </DropdownMenu.Label>

          <DropdownMenu.Arrow className={styles.DropdownMenuArrow} />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
