import React from 'react';

export default function FormatSelector({ videoData, setVideoData }) {
  const handleChange = (e) => {
    setVideoData({ ...videoData, format: e.target.value });
  };

  return (
    <div className="mb-3">
      <label htmlFor="format" className="form-label">Download Format</label>
      <select
        className="form-select"
        id="format"
        value={videoData.format}
        onChange={handleChange}
      >
        <option value="mp4">MP4 (Video)</option>
        <option value="mp3">MP3 (Audio Only)</option>
        <option value="gif">GIF (Looped Clip)</option>
      </select>
    </div>
  );
}
