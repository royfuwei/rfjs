import React from 'react';
import { create } from 'zustand';
import type * as Types from './DataSources.types';

export const useKmlDataSetState = create<Types.KmlDataSetState>((set, get) => {
  const kmlList: Types.KmlDataSet[] = [];

  return {
    kmlList,

    setKmlList: (kmlList) => {
      set({ kmlList });
    },
  };
});
