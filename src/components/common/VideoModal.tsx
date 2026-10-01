import React, { useState, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Edit3, 
  Check, 
  ExternalLink 
} from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  targetMuscles?: string[];
  onUpdateVideoUrl?: (newUrl: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  title,
  videoUrl,
  thumbnailUrl,
  targetMuscles,
  onUpdateVideoUrl,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [customUrl, setCustomUrl] = useState(videoUrl || '');
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!isOpen) return null;

  const currentVideo = customUrl || videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setVideoError(true));
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSaveCustomUrl = () => {
    setIsEditingUrl(false);
    setVideoError(false);
    if (onUpdateVideoUrl) {
      onUpdateVideoUrl(customUrl);
    }
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div>
            <h3 className="text-base font-semibold text-white truncate max-w-md">{title}</h3>
            {targetMuscles && targetMuscles.length > 0 && (
              <p className="text-xs text-slate-400 mt-0.5">
                Target: {targetMuscles.join(' · ')}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {!videoError ? (
            <video
              ref={videoRef}
              src={currentVideo}
              poster={thumbnailUrl}
              muted={isMuted}
              playsInline
              loop
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onError={() => setVideoError(true)}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-center p-6 max-w-sm">
              <p className="text-sm text-slate-300 font-medium">Standard Exercise Demo Visual</p>
              <p className="text-xs text-slate-500 mt-1">
                You can replace this with your own verified license or hosted MP4 video URL below.
              </p>
              <button
                onClick={() => setIsEditingUrl(true)}
                className="mt-3 px-3 py-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
              >
                Change Video Source
              </button>
            </div>
          )}

          {/* Overlay Controls */}
          {!videoError && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
              <div className="flex justify-end">
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex items-center justify-between text-white">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-300">Form Demonstration</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Replace / License Info Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex flex-col gap-2">
          {isEditingUrl ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="Enter custom MP4 video URL..."
                className="flex-1 px-3 py-1.5 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleSaveCustomUrl}
                className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 text-white rounded-lg flex items-center gap-1 hover:bg-emerald-500 transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                Apply
              </button>
              <button
                onClick={() => setIsEditingUrl(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Licensed or user-provided educational demonstration</span>
              <button
                onClick={() => setIsEditingUrl(true)}
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Replace Video Source
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
