import React from 'react';
import { Clock, MapPin, Download } from 'lucide-react';
import { useStore } from '../store/useStore';

export const LogPanel: React.FC = () => {
  const logs = useStore((state) => state.logs);

  const downloadLogs = () => {
    const csv = [
      ['Type', 'Timestamp', 'Latitude', 'Longitude', 'Confidence'],
      ...logs.map(log => [
        log.type,
        log.timestamp.toISOString(),
        log.coordinates.lat,
        log.coordinates.lng,
        log.confidence
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `adas-logs-${new Date().toISOString()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="absolute top-8 right-8 w-80 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-white font-semibold">Detection Logs</h2>
        <button
          onClick={downloadLogs}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Download className="w-5 h-5 text-cyan-400" />
        </button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-4 border-b border-white/10 text-white/90 hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span className="text-sm">
                {log.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>
                {log.coordinates.lat.toFixed(6)}, {log.coordinates.lng.toFixed(6)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};