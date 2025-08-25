import React, { useState, useRef } from 'react';

interface VideoPlayerProps {
  videoUrl?: string;
  youtubeKey?: string;
  title: string;
  onClose: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  videoUrl, 
  youtubeKey, 
  title, 
  onClose 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  if (youtubeKey) {
    return (
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
        <div className="relative w-full max-w-4xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
          >
            ✕
          </button>
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeKey}?autoplay=1`}
              title={title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <div className="relative w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
        >
          ✕
        </button>
        
        {videoUrl ? (
          <div className="relative">
            <video
              ref={videoRef}
              className="w-full h-auto"
              controls
              autoPlay
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* Custom controls for demonstration */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 p-3 rounded-lg flex items-center space-x-4">
              <button
                onClick={handlePlayPause}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <button
                onClick={handleFullscreen}
                className="text-white hover:text-gray-300 transition-colors"
              >
                ⛶
              </button>
              <div className="flex-1 bg-gray-600 h-2 rounded">
                <div className="bg-netflix-red h-2 rounded" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="aspect-video bg-gray-800 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="text-6xl mb-4">🎬</div>
              <p className="text-xl">Video streaming coming soon</p>
              <p className="text-sm mt-2">This feature will be available when streaming APIs are integrated</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;