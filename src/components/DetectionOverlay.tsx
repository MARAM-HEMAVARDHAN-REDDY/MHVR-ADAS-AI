import React from 'react';
import { AlertTriangle, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export const DetectionOverlay: React.FC = () => {
  const { lane, collision } = useStore((state) => state.vehicleState);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Lane Detection Overlay */}
      <div className={`absolute inset-x-0 h-full flex items-center justify-center 
        ${lane.warning ? 'border-l-4 border-r-4 border-red-500/50 animate-pulse' : 
        'border-l-4 border-r-4 border-green-500/30'}`}>
        {lane.warning && (
          <div className="bg-red-500/80 backdrop-blur-sm rounded-lg p-3 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            <span className="text-white font-medium">Lane Departure Warning</span>
          </div>
        )}
      </div>

      {/* Collision Warning */}
      {collision.warning && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2
          bg-red-500/90 backdrop-blur-sm rounded-lg p-4 flex items-center gap-3
          animate-bounce">
          <AlertCircle className="w-8 h-8 text-white" />
          <div>
            <div className="text-white font-bold text-lg">
              Collision Warning
            </div>
            <div className="text-white/80 text-sm">
              {collision.object} detected {collision.distance}m ahead
            </div>
          </div>
        </div>
      )}
    </div>
  );
};