import React, { useEffect } from 'react';
import { VideoFeed } from './components/VideoFeed';
import { SpeedDisplay } from './components/SpeedDisplay';
import { DetectionOverlay } from './components/DetectionOverlay';
import { LogPanel } from './components/LogPanel';
import { useStore } from './store/useStore';

function App() {
  const updateVehicleState = useStore((state) => state.updateVehicleState);
  const addLog = useStore((state) => state.addLog);

  // Simulate some dynamic data for demonstration
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate speed changes
      updateVehicleState({
        speed: 60 + Math.sin(Date.now() / 1000) * 5,
        lane: {
          deviation: Math.sin(Date.now() / 2000) * 0.5,
          warning: Math.random() < 0.1,
        },
        collision: {
          warning: Math.random() < 0.05,
          distance: 20 + Math.random() * 10,
          object: ['Vehicle', 'Pedestrian'][Math.floor(Math.random() * 2)],
        },
      });

      // Simulate occasional detection logs
      if (Math.random() < 0.1) {
        addLog({
          id: Date.now().toString(),
          type: 'pothole',
          timestamp: new Date(),
          coordinates: {
            lat: 40.7128 + (Math.random() - 0.5) * 0.01,
            lng: -74.0060 + (Math.random() - 0.5) * 0.01,
          },
          confidence: 0.85 + Math.random() * 0.1,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [updateVehicleState, addLog]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-900">
      <VideoFeed />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      <DetectionOverlay />
      <SpeedDisplay />
      <LogPanel />
    </div>
  );
}

export default App;