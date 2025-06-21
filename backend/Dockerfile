# Use official Node.js 18 image
FROM node:18

# Install ffmpeg and yt-dlp
RUN apt-get update && \
    apt-get install -y ffmpeg curl && \
    curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp && \
    chmod a+rx /usr/local/bin/yt-dlp

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching layers)
COPY package*.json ./

# Install node dependencies
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose the backend port
EXPOSE 5000

# Start your server
CMD ["node", "index.js"]
