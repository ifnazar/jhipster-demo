import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRegionNew } from '../region-new.model';
import { RegionNewService } from '../service/region-new.service';

@Injectable({ providedIn: 'root' })
export class RegionNewRoutingResolveService implements Resolve<IRegionNew | null> {
  constructor(protected service: RegionNewService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRegionNew | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((regionNew: HttpResponse<IRegionNew>) => {
          if (regionNew.body) {
            return of(regionNew.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
