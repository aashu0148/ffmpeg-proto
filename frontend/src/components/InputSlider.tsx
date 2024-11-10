import { useRef, ChangeEvent, HTMLProps, useEffect } from "react";

import { getDebounceFunc } from "@utils/util";

function InputSlider(props: HTMLProps<HTMLInputElement>) {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);
  const debounceRef = useRef<Function>(getDebounceFunc());

  function updateBar(progress: number, transition: boolean = false) {
    if (!progressRef.current || !thumbRef.current) return;

    progressRef.current.style.width = `${progress}%`;
    thumbRef.current.style.left = `${progress}%`;

    if (progress > 90)
      thumbRef.current.style.transform = `translate(-100%,-50%)`;
    else if (progress < 2)
      thumbRef.current.style.transform = `translate(-5%,-50%)`;
    else thumbRef.current.style.transform = `translate(-50%,-50%)`;

    if (transition) {
      progressRef.current.style.transition = `600ms`;
      thumbRef.current.style.transition = `600ms`;
    } else {
      progressRef.current.style.transition = `none`;
      thumbRef.current.style.transition = `none`;
    }
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    if (props.onChange) props.onChange(event);

    const prog = parseInt(event.target.value);
    updateBar(prog);
  }

  useEffect(() => {
    if (typeof props.value === "number" && !isNaN(props.value)) {
      const val = props.value;
      debounceRef.current(() => updateBar(val, true), 100);
    }
  }, [props.value]);

  return (
    <div className="flex-1 w-full rounded-full h-2 bg-gray-200 relative">
      <div
        ref={progressRef}
        className="pointer-events-none h-full w-0 rounded-full bg-yellow-500"
      />
      <div
        ref={thumbRef}
        className="pointer-events-none absolute top-1/2 left-0 h-3 w-3 rounded-full bg-yellow-500 dark:bg-yellow-400 z-20"
        style={{ transform: "translate(0%,-50%)" }}
      />

      <input
        type="range"
        className="h-2 absolute top-1/2 left-0 z-10 transform -translate-y-1/2 opacity-0 w-full cursor-pointer"
        {...props}
        onChange={handleOnChange}
      />
    </div>
  );
}

export default InputSlider;
