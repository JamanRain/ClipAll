const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const {
  downloadWithYtDlp,
  timeToSeconds,
  getCropFilter,
  normalizeTime
} = require('../services/videoService');

exports.downloadVideo = async (req, res) => {
  const { url, startTime, endTime, aspectRatio, format, socketId } = req.body;
  const io = req.app.get('io');

  const timestamp = Date.now();
  const rawVideoPath = path.join(__dirname, '..', 'temp', `raw_${timestamp}.mp4`);
  const outputPath = path.join(__dirname, '..', 'temp', `final_${timestamp}.${format}`);

  const normStart = normalizeTime(startTime);
  const normEnd = normalizeTime(endTime);

  try {
    console.log('📥 Request received. SocketID:', socketId);
    await downloadWithYtDlp(url, rawVideoPath);
    console.log(`✅ yt-dlp download complete: ${rawVideoPath}`);

    const duration = timeToSeconds(normEnd) - timeToSeconds(normStart);
    if (duration <= 0) throw new Error('Invalid duration');

    const cropFilter = getCropFilter(aspectRatio);

    let command = ffmpeg(rawVideoPath)
      .setStartTime(normStart)
      .setDuration(duration);

    if (cropFilter) command.videoFilters(cropFilter);
    if (format === 'mp3') command.noVideo().format('mp3');
    else if (format === 'gif') command.format('gif');
    else command.format('mp4');

    command
      .output(outputPath)
      .on('start', cmd => console.log('🛠 FFmpeg started:', cmd))
      .on('progress', progress => {
        if (!progress.timemark) return;
        const processed = timeToSeconds(progress.timemark);
        const percent = Math.min((processed / duration) * 100, 100);
        console.log(`📊 ${processed}s / ${duration}s = ${percent.toFixed(2)}%`);
        if (io && socketId) {
          io.to(socketId).emit('ffmpeg-progress', {
            percent: percent.toFixed(2),
            timemark: progress.timemark
          });
        }
      })
      .on('end', () => {
        console.log(`✅ FFmpeg done: ${outputPath}`);
        if (io && socketId) {
          io.to(socketId).emit('ffmpeg-complete', { message: 'Processing done!' });
        }
        res.download(outputPath, () => {
          cleanup([rawVideoPath, outputPath]);
        });
      })
      .on('error', (err) => {
        console.error('❌ FFmpeg error:', err);
        if (io && socketId) io.to(socketId).emit('ffmpeg-error', { error: 'Processing failed' });
        res.status(500).json({ error: 'Processing failed' });
        cleanup([rawVideoPath, outputPath]);
      })
      .run();

  } catch (err) {
    console.error('❌ Error:', err.message);
    if (io && socketId) io.to(socketId).emit('ffmpeg-error', { error: err.message });
    res.status(500).json({ error: err.message });
  }
};

function cleanup(paths) {
  paths.forEach(p => {
    if (fs.existsSync(p)) fs.unlinkSync(p);
  });
}
