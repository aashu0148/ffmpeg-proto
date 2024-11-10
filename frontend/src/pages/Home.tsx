import { useState } from "react";

import VideoPlayer from "@components/VideoPlayer";

const videoUrls = [
  {
    quality: "360p",
    url: "https://ffmpeg-proto.onrender.com/videos/246df441-f852-4f69-aa75-82055f1119e1/360p/index.m3u8",
  },

  {
    quality: "720p",
    url: "https://ffmpeg-proto.onrender.com/videos/246df441-f852-4f69-aa75-82055f1119e1/720p/index.m3u8",
  },

  {
    quality: "1080p",
    url: "https://ffmpeg-proto.onrender.com/videos/246df441-f852-4f69-aa75-82055f1119e1/1080p/index.m3u8",
  },
];

function Home() {
  const [selectedUrl, setSelectedUrl] = useState(videoUrls[0]);
  return (
    <div className="bg-slate-950 p-12 w-full min-h-screen flex flex-col gap-10 items-center justify-center">
      <div className="flex flex-col items-center gap-1">
        <p className="text-white text-3xl font-mono text-center">
          Try out this Custom Video Player
        </p>
        <a
          className="text-sm underline text-white text-center"
          href={"https://github.com/aashu0148/ffmpeg-proto"}
          target="_blank"
        >
          https://github.com/aashu0148/ffmpeg-proto
        </a>
      </div>
      <VideoPlayer
        url={selectedUrl.url}
        qualityOptions={videoUrls.map((e) => ({
          label: e.quality,
          value: e.quality,
        }))}
        onQualityChange={(q: string) =>
          setSelectedUrl(videoUrls.find((e) => e.quality === q)!)
        }
      />
    </div>
  );
}

export default Home;
