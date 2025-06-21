// src/pages/Home.js
import React, { useState } from 'react';
import URLInput from '../components/URLInput';
import TimeSelector from '../components/TimeSelector';
import AspectRatioSelector from '../components/AspectRatioSelector';
import FormatSelector from '../components/FormatSelector';
import DownloadButton from '../components/DownloadButton';

export default function Home() {
  const [videoData, setVideoData] = useState({
    url: '',
    startTime: '',
    endTime: '',
    aspectRatio: '16:9',
    format: 'mp4',
  });

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🎥 Social Media Video Downloader</h2>
      <URLInput videoData={videoData} setVideoData={setVideoData} />
      <TimeSelector videoData={videoData} setVideoData={setVideoData} />
      <AspectRatioSelector videoData={videoData} setVideoData={setVideoData} />
      <FormatSelector videoData={videoData} setVideoData={setVideoData} />
      <DownloadButton videoData={videoData} />
    </div>
  );
}
