import { create } from 'zustand';
import { DetectionLog, VehicleState } from '../types';

interface Store {
  logs: DetectionLog[];
  vehicleState: VehicleState;
  addLog: (log: DetectionLog) => void;
  updateVehicleState: (state: Partial<VehicleState>) => void;
}

export const useStore = create<Store>((set) => ({
  logs: [],
  vehicleState: {
    speed: 0,
    lane: {
      deviation: 0,
      warning: false,
    },
    collision: {
      warning: false,
      distance: 0,
      object: '',
    },
  },
  addLog: (log) =>
    set((state) => ({
      logs: [log, ...state.logs],
    })),
  updateVehicleState: (newState) =>
    set((state) => ({
      vehicleState: { ...state.vehicleState, ...newState },
    })),
}));