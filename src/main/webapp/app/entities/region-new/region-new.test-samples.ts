import { IRegionNew, NewRegionNew } from './region-new.model';

export const sampleWithRequiredData: IRegionNew = {
  id: 75734,
};

export const sampleWithPartialData: IRegionNew = {
  id: 16948,
};

export const sampleWithFullData: IRegionNew = {
  id: 80604,
  regionName: 'withdrawal',
};

export const sampleWithNewData: NewRegionNew = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
