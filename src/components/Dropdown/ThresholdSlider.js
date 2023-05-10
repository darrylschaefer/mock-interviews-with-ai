import React, { useState, useEffect, useRef } from "react";
import * as Slider from "@radix-ui/react-slider";
import styles from "@/styles/Slider.module.css";

const ThresholdSlider = ({
  detectionSettings: detectionSettings,
  setRerender: setRerender,
  rerender: rerender,
}) => {
  return (
    <form>
      <Slider.Root
        className={styles.SliderRoot}
        defaultValue={[detectionSettings.current.activityDetectionThreshold]}
        max={40}
        step={1}
        aria-label="Mic Detection Threshold"
        onValueChange={(value) => {
          detectionSettings.current.activityDetectionThreshold = value;
          setRerender(rerender + 1);
        }}
      >
        <Slider.Track className={styles.SliderTrack}>
          <Slider.Range className={styles.SliderRange} />
        </Slider.Track>
        <Slider.Thumb className={styles.SliderThumb} />
      </Slider.Root>
    </form>
  );
};

export default ThresholdSlider;
