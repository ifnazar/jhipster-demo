import { IRegion, NewRegion } from './region.model';

export const sampleWithRequiredData: IRegion = {
  id: 27363,
};

export const sampleWithPartialData: IRegion = {
  id: 15979,
  regionName: 'Practical',
  description: 'Cotton 1080p',
};

export const sampleWithFullData: IRegion = {
  id: 74085,
  regionName: 'Specialist robust deposit',
  description: 'Missouri',
};

export const sampleWithNewData: NewRegion = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
