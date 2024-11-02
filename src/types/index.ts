export interface DetectionLog {
  id: string;
  type: 'pothole' | 'vehicle' | 'pedestrian';
  timestamp: Date;
  coordinates: {
    lat: number;
    lng: number;
  };
  confidence: number;
}

export interface VehicleState {
  speed: number;
  lane: {
    deviation: number;
    warning: boolean;
  };
  collision: {
    warning: boolean;
    distance: number;
    object: string;
  };
}