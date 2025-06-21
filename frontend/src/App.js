import React, { useState } from 'react';
import './App.css'; // Make sure this is imported
import URLInput from './components/URLInput';
import TimeSelector from './components/TimeSelector';
import AspectRatioSelector from './components/AspectRatioSelector';
import FormatSelector from './components/FormatSelector';
import DownloadButton from './components/DownloadButton';

function App() {
  const [videoData, setVideoData] = useState({
    url: '',
    startTime: '',
    endTime: '',
    aspectRatio: '16:9',
    format: 'mp4',
  });

  return (
    <div className="app-container">
      <div className="app-card">
        <h2 className="app-title">🎬 ClipAll</h2>

        <URLInput videoData={videoData} setVideoData={setVideoData} />
        <TimeSelector videoData={videoData} setVideoData={setVideoData} />
        <div className="row">
          <AspectRatioSelector videoData={videoData} setVideoData={setVideoData} />
          <FormatSelector videoData={videoData} setVideoData={setVideoData} />
        </div>
        <DownloadButton videoData={videoData} />
      </div>
    </div>
  );
}

export default App;



