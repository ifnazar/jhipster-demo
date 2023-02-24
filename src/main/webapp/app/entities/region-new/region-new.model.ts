export interface IRegionNew {
  id: number;
  regionName?: string | null;
}

export type NewRegionNew = Omit<IRegionNew, 'id'> & { id: null };
