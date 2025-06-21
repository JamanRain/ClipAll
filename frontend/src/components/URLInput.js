import React from 'react';

export default function URLInput({ videoData, setVideoData }) {
  const handleChange = (e) => {
    setVideoData({ ...videoData, url: e.target.value });
  };

  return (
    <div className="mb-3">
      <label htmlFor="videoUrl" className="form-label">
        Video URL
      </label>
      <input
        type="text"
        className="form-control"
        id="videoUrl"
        placeholder="Paste Instagram / Twitter / YouTube video link..."
        value={videoData.url}
        onChange={handleChange}
        required
      />
    </div>
  );
}
