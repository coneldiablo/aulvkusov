import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Download } from 'lucide-react';
import Button from '../ui/Button';

interface TimelineControlProps {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onReset: () => void;
  onExport?: () => void;
  className?: string;
}

const TimelineControl: React.FC<TimelineControlProps> = ({
  currentTime,
  duration,
  isPlaying,
  onPlayPause,
  onReset,
  onExport,
  className = '',
}) => {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
  };
  
  return (
    <div className={`${className}`}>
      <div className="relative h-2 bg-gray-200 rounded-full mb-4 cursor-pointer">
        <motion.div 
          className="absolute top-0 left-0 h-full bg-amber-600 rounded-full"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button
            variant="primary"
            onClick={onPlayPause}
            icon={isPlaying ? <Pause size={16} /> : <Play size={16} />}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button
            variant="outline"
            onClick={onReset}
            icon={<RotateCcw size={16} />}
          >
            Reset
          </Button>
        </div>
        
        <div className="text-sm font-medium">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        
        {onExport && (
          <Button
            variant="secondary"
            onClick={onExport}
            icon={<Download size={16} />}
          >
            Export
          </Button>
        )}
      </div>
    </div>
  );
};

export default TimelineControl;