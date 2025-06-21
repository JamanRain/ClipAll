import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { io } from 'socket.io-client';

export default function DownloadButton({ videoData }) {
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const BACKEND_URL = 'https://clipall.onrender.com'; // 🔑 your Render backend URL

  useEffect(() => {
    const s = io(BACKEND_URL, { transports: ['websocket'] });
    setSocket(s);

    s.on('connect', () => console.log('✅ Socket connected:', s.id));
    s.on('ffmpeg-progress', data => {
      console.log('📡 Progress event:', data);
      setProgress(parseFloat(data.percent));
    });
    s.on('ffmpeg-complete', () => {
      console.log('✅ Complete event');
    });
    s.on('ffmpeg-error', data => {
      console.error('❌ Error event:', data);
      setError(data.error);
      setLoading(false);
    });

    return () => s.disconnect();
  }, [BACKEND_URL]);

  const handleDownload = async () => {
    if (!socket || !socket.connected) {
      setError('Socket not connected.');
      return;
    }

    const { url, startTime, endTime, aspectRatio, format } = videoData;
    if (!url || !startTime || !endTime) {
      setError('Fill all fields');
      return;
    }

    setLoading(true);
    setError('');
    setProgress(0);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/download`,
        {
          url,
          startTime,
          endTime,
          aspectRatio,
          format,
          socketId: socket.id
        },
        { responseType: 'blob' }
      );

      saveAs(new Blob([response.data]), `video.${format}`);
    } catch (e) {
      console.error(e);
      setError('Download failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button disabled={loading} onClick={handleDownload}>
        {loading ? `Downloading... ${progress.toFixed(2)}%` : 'Download'}
      </button>
      {loading && (
        <div style={{ background: '#ccc', height: 8, marginTop: 5 }}>
          <div
            style={{
              width: `${progress}%`,
              background: 'green',
              height: '100%'
            }}
          ></div>
        </div>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

