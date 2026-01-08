import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Download, Loader2, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRecordingUrl } from "@/hooks/useCallHistory";

interface AudioPlayerProps {
  recordingPath: string;
  className?: string;
}

const AudioPlayer = ({ recordingPath, className }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const { data: signedUrl, isLoading, error } = useRecordingUrl(recordingPath);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [signedUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const time = parseFloat(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const handleDownload = async () => {
    if (!signedUrl) return;
    
    const link = document.createElement("a");
    link.href = signedUrl;
    link.download = `recording-${recordingPath.split("/").pop()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !signedUrl) {
    return (
      <div className={cn("text-xs text-muted-foreground", className)}>
        Recording unavailable
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <audio ref={audioRef} src={signedUrl} preload="metadata" />
      
      <Button
        variant="ghost"
        size="iconSm"
        onClick={togglePlay}
        className="shrink-0"
      >
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4" />
        )}
      </Button>

      <div className="hidden sm:flex items-center gap-2 min-w-[120px]">
        <Volume2 className="w-3 h-3 text-muted-foreground" />
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-16 h-1 bg-muted rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
        />
        <span className="text-xs text-muted-foreground tabular-nums">
          {formatTime(currentTime)}
        </span>
      </div>

      <Button
        variant="ghost"
        size="iconSm"
        onClick={handleDownload}
        className="shrink-0"
      >
        <Download className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default AudioPlayer;
