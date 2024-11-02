import React from 'react';
import { Gauge } from 'lucide-react';
import { useStore } from '../store/useStore';

export const SpeedDisplay: React.FC = () => {
  const speed = useStore((state) => state.vehicleState.speed);

  return (
    <div className="absolute bottom-8 left-8 bg-black/40 backdrop-blur-md rounded-2xl p-6 text-white border border-white/10">
      <div className="flex items-center gap-3">
        <Gauge className="w-8 h-8 text-cyan-400" />
        <div>
          <div className="text-4xl font-bold tracking-wider">
            {speed.toFixed(0)}
            <span className="text-2xl ml-1 text-cyan-400">km/h</span>
          </div>
          <div className="text-xs text-gray-400 uppercase tracking-wider">Current Speed</div>
        </div>
      </div>
    </div>
  );
};