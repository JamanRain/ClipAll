import React from 'react';

export default function TimeSelector({ videoData, setVideoData }) {
  const handleStartTimeChange = (e) => {
    setVideoData({ ...videoData, startTime: e.target.value });
  };

  const handleEndTimeChange = (e) => {
    setVideoData({ ...videoData, endTime: e.target.value });
  };

  return (
    <div className="mb-3">
      <label className="form-label">Select Clip Duration</label>
      <div className="d-flex gap-4 align-items-end">
        <div>
          <label htmlFor="startTime" className="form-label">Start Time</label>
          <input
            type="time"
            step="1"
            id="startTime"
            className="form-control"
            value={videoData.startTime}
            onChange={handleStartTimeChange}
          />
        </div>

        <div>
          <label htmlFor="endTime" className="form-label">End Time</label>
          <input
            type="time"
            step="1"
            id="endTime"
            className="form-control"
            value={videoData.endTime}
            onChange={handleEndTimeChange}
          />
        </div>
      </div>
    </div>
  );
}


