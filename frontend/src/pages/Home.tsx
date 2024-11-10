import { useState } from "react";

import VideoPlayer from "@components/VideoPlayer/VideoPlayer";

const videoUrls = [
  {
    quality: "360p",
    url: "http://localhost:5000/videos/246df441-f852-4f69-aa75-82055f1119e1/360p/index.m3u8",
  },

  {
    quality: "720p",
    url: "http://localhost:5000/videos/246df441-f852-4f69-aa75-82055f1119e1/720p/index.m3u8",
  },

  {
    quality: "1080p",
    url: "http://localhost:5000/videos/246df441-f852-4f69-aa75-82055f1119e1/1080p/index.m3u8",
  },
];

function Home() {
  const [selectedUrl, setSelectedUrl] = useState(videoUrls[0]);
  return (
    <div className="bg-slate-950 p-16 w-full min-h-screen flex flex-col gap-10 items-center justify-center">
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
