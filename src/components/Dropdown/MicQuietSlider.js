import React, { useState, useEffect, useRef } from "react";
import * as Slider from "@radix-ui/react-slider";
import styles from "@/styles/Slider.module.css";

const MicQuietSlider = ({
  micQuiet: micQuiet,
  setRerender: setRerender,
  rerender: rerender,
}) => {
  return (
    <form>
      <Slider.Root
        className={styles.SliderRoot}
        defaultValue={[micQuiet.current]}
        max={8000}
        min={1500}
        step={200}
        aria-label="Mic Silence Timer"
        onValueChange={(value) => {
          micQuiet.current = value;
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

export default MicQuietSlider;
