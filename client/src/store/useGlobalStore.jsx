// src/store/useGlobalStore.js (Simplified: Data storage and simple setters only)

import { create } from 'zustand';


export const RESULTS_PER_PAGE = 10;

export const useGlobalStore = create((set) => ({
  allData: [],
  filteredData: [],
  results: [],

  setAllData: (data) => set({ allData: data }),
  setFilteredData: (data) => set({ filteredData: data }),
  setResults: (data) => set({ results: data }),
}));
