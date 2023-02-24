import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IRegionNew, NewRegionNew } from '../region-new.model';

export type PartialUpdateRegionNew = Partial<IRegionNew> & Pick<IRegionNew, 'id'>;

export type EntityResponseType = HttpResponse<IRegionNew>;
export type EntityArrayResponseType = HttpResponse<IRegionNew[]>;

@Injectable({ providedIn: 'root' })
export class RegionNewService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/region-news');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(regionNew: NewRegionNew): Observable<EntityResponseType> {
    return this.http.post<IRegionNew>(this.resourceUrl, regionNew, { observe: 'response' });
  }

  update(regionNew: IRegionNew): Observable<EntityResponseType> {
    return this.http.put<IRegionNew>(`${this.resourceUrl}/${this.getRegionNewIdentifier(regionNew)}`, regionNew, { observe: 'response' });
  }

  partialUpdate(regionNew: PartialUpdateRegionNew): Observable<EntityResponseType> {
    return this.http.patch<IRegionNew>(`${this.resourceUrl}/${this.getRegionNewIdentifier(regionNew)}`, regionNew, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRegionNew>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRegionNew[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getRegionNewIdentifier(regionNew: Pick<IRegionNew, 'id'>): number {
    return regionNew.id;
  }

  compareRegionNew(o1: Pick<IRegionNew, 'id'> | null, o2: Pick<IRegionNew, 'id'> | null): boolean {
    return o1 && o2 ? this.getRegionNewIdentifier(o1) === this.getRegionNewIdentifier(o2) : o1 === o2;
  }

  addRegionNewToCollectionIfMissing<Type extends Pick<IRegionNew, 'id'>>(
    regionNewCollection: Type[],
    ...regionNewsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const regionNews: Type[] = regionNewsToCheck.filter(isPresent);
    if (regionNews.length > 0) {
      const regionNewCollectionIdentifiers = regionNewCollection.map(regionNewItem => this.getRegionNewIdentifier(regionNewItem)!);
      const regionNewsToAdd = regionNews.filter(regionNewItem => {
        const regionNewIdentifier = this.getRegionNewIdentifier(regionNewItem);
        if (regionNewCollectionIdentifiers.includes(regionNewIdentifier)) {
          return false;
        }
        regionNewCollectionIdentifiers.push(regionNewIdentifier);
        return true;
      });
      return [...regionNewsToAdd, ...regionNewCollection];
    }
    return regionNewCollection;
  }
}
