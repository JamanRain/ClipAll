const { exec } = require('child_process');

exports.downloadWithYtDlp = (url, outputPath) => {
  return new Promise((resolve, reject) => {
    const command = `"C:\\Users\\Raman Jain\\Desktop\\media- downloader\\yt-dlp\\yt-dlp.exe" "${url}" -o "${outputPath}"`;
    console.log('▶️ Executing:', command);

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error('❌ yt-dlp error:', stderr);
        return reject(stderr);
      }
      console.log('📥 yt-dlp stdout:', stdout);
      resolve();
    });
  });
};

exports.normalizeTime = (t) => {
  if (!t) return '00:00:00';
  const parts = t.split(':');
  if (parts.length === 2) return `${parts[0]}:${parts[1]}:00`;
  if (parts.length === 1) return `00:${parts[0]}:00`;
  return t;
};

exports.timeToSeconds = (t) => {
  const [h, m, s] = t.split(':').map(Number);
  return h * 3600 + m * 60 + s;
};

exports.getCropFilter = (ratio) => {
  const map = {
    '1:1': 'crop=in_h:in_h',
    '4:3': 'crop=4*in_h/3:in_h',
    '9:16': 'crop=in_w:in_w*16/9',
  };
  return map[ratio] || null;
};
