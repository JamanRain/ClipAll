import React from 'react';

export default function AspectRatioSelector({ videoData, setVideoData }) {
  const handleChange = (e) => {
    setVideoData({ ...videoData, aspectRatio: e.target.value });
  };

  return (
    <div className="mb-3">
      <label htmlFor="aspectRatio" className="form-label">Aspect Ratio</label>
      <select
        className="form-select"
        id="aspectRatio"
        value={videoData.aspectRatio}
        onChange={handleChange}
      >
        <option value="16:9">16:9 (YouTube/Standard)</option>
        <option value="1:1">1:1 (Square)</option>
        <option value="9:16">9:16 (Reels/Shorts)</option>
        <option value="4:3">4:3 (Classic)</option>
      </select>
    </div>
  );
}
