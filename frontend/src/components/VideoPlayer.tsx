import { useState, useRef, ChangeEvent, useEffect } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { Play, Pause, ChevronDown, Maximize, Minimize } from "lucide-react";
import screenFull from "screenfull";

import InputSlider from "@components/InputSlider";
import Spinner from "@components/Spinner/Spinner";

import { formatTime } from "@utils/util";

interface Props {
  url: string;
  playerProps?: ReactPlayerProps;
  qualityOptions: Array<{ label: string; value: string }>;
  onQualityChange: Function;
}
interface VideoStates {
  isPlaying: boolean;
  volume: number;
  playedPercent: number;
  playedSeconds: number;
  loadedSeconds: number;
  loadedPercent: number;
  duration: number;
  seekedPercent: number;
  fullScreen: boolean;
  buffering: boolean;
}

function VideoPlayer({
  url,
  playerProps,
  qualityOptions = [],
  onQualityChange,
}: Props) {
  const playerRef = useRef<ReactPlayer>(null);
  const playerWrapperRef = useRef<HTMLDivElement | null>(null);
  const [videoState, setVideoState] = useState<VideoStates>({
    isPlaying: false,
    seekedPercent: 0,
    volume: 0.8,
    playedPercent: 0,
    playedSeconds: 0,
    loadedSeconds: 0,
    loadedPercent: 0,
    duration: 0,
    fullScreen: false,
    buffering: false,
  });

  const handleFullScreenToggle = () => {
    if (playerWrapperRef.current) screenFull.toggle(playerWrapperRef.current);
  };

  const handleProgress = (state: any) => {
    setVideoState((p) => ({
      ...p,
      seekedPercent: state.played * 100,
      playedPercent: state.played * 100,
      loadedPercent: state.loaded * 100,
      playedSeconds: state.playedSeconds,
      loadedSeconds: state.loadedSeconds,
    }));
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const seekedTo = (e.target.valueAsNumber / 100) * videoState.duration;

    setVideoState((prev) => ({
      ...prev,
      seekedPercent: e.target.valueAsNumber,
    }));
    playerRef.current?.seekTo(seekedTo);
  };

  function handleFullScreenChange() {
    setVideoState((prev) => ({
      ...prev,
      fullScreen: screenFull.isFullscreen,
    }));
  }

  function handleOnPlayerReady(player: ReactPlayer) {
    player.seekTo(videoState.playedSeconds);
    setVideoState((prev) => ({ ...prev, duration: player.getDuration() }));
  }

  function handleKeyDown(event: KeyboardEvent) {
    const key = event.key;

    if (key === " ") setVideoState((p) => ({ ...p, isPlaying: !p.isPlaying }));
    else if (key === "ArrowLeft") {
      setVideoState((prev) => {
        const seekedTo = prev.playedSeconds - 10;
        playerRef.current?.seekTo(seekedTo);
        const percent = (seekedTo / prev.duration) * 100;

        return {
          ...prev,
          seekedPercent: percent,
        };
      });
    } else if (key === "ArrowRight") {
      setVideoState((prev) => {
        const seekedTo = prev.playedSeconds + 10;
        playerRef.current?.seekTo(seekedTo);
        const percent = (seekedTo / prev.duration) * 100;

        return {
          ...prev,
          seekedPercent: percent,
        };
      });
    } else if (key === "f" || key === "F") {
      handleFullScreenToggle();
    }
  }

  useEffect(() => {
    screenFull.onchange(handleFullScreenChange);

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={playerWrapperRef}
      className="relative min-w-[300px] aspect-video sm:max-w-[100%] sm:w-full sm:h-auto lg:w-auto lg:h-[70vh] lg:min-h-[350px] bg-transparent rounded-2xl shadow-lg overflow-hidden group"
      onDoubleClick={handleFullScreenToggle}
      onClick={() => setVideoState((p) => ({ ...p, isPlaying: !p.isPlaying }))}
    >
      {videoState.buffering && (
        <Spinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      )}
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={videoState.isPlaying}
        volume={videoState.volume}
        onProgress={handleProgress}
        onDuration={(d) => setVideoState((prev) => ({ ...prev, duration: d }))}
        width="100%"
        height="100%"
        onBuffer={() => setVideoState((p) => ({ ...p, buffering: true }))}
        onBufferEnd={() => setVideoState((p) => ({ ...p, buffering: false }))}
        onReady={handleOnPlayerReady}
        {...playerProps}
      />

      <div
        className="group-hover:opacity-100 group-hover:translate-y-0 opacity-0 transform translate-y-full transition duration-500 delay-100 absolute bottom-0 left-0 w-full z-10 flex gap-3 items-center justify-between py-4 px-2 backdrop-blur bg-gradient-to-b from-[rgba(0,0,0,0.0)] to-[rgba(0,0,0,0.75)] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() =>
            setVideoState((p) => ({ ...p, isPlaying: !p.isPlaying }))
          }
          className="text-xl"
        >
          {videoState.isPlaying ? (
            <Pause className="h-5 w-5 fill-white" />
          ) : (
            <Play className="h-5 w-5 fill-white" />
          )}
        </button>

        <div className="text-sm ">
          {formatTime(videoState.playedSeconds)} /{" "}
          {formatTime(videoState.duration)}
        </div>

        <InputSlider
          step={1}
          secondaryProgress={videoState.loadedPercent}
          value={videoState.seekedPercent}
          onChange={handleSeek}
        />

        <div className="relative text-black ">
          <select
            className="bg-white flex placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded p-[2px] pr-4 focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
            onChange={(e) => onQualityChange(e.target.value)}
          >
            {qualityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown className="pointer-events-none h-3 w-3 absolute top-1/2 right-1 transform -translate-y-1/2 text-slate-700" />
        </div>

        <div onClick={handleFullScreenToggle} className="cursor-pointer">
          {videoState.fullScreen ? (
            <Minimize className="h-5 w-5" />
          ) : (
            <Maximize className="h-5 w-5" />
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
