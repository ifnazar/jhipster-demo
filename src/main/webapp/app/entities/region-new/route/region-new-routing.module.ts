import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { RegionNewComponent } from '../list/region-new.component';
import { RegionNewDetailComponent } from '../detail/region-new-detail.component';
import { RegionNewUpdateComponent } from '../update/region-new-update.component';
import { RegionNewRoutingResolveService } from './region-new-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const regionNewRoute: Routes = [
  {
    path: '',
    component: RegionNewComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RegionNewDetailComponent,
    resolve: {
      regionNew: RegionNewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RegionNewUpdateComponent,
    resolve: {
      regionNew: RegionNewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RegionNewUpdateComponent,
    resolve: {
      regionNew: RegionNewRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(regionNewRoute)],
  exports: [RouterModule],
})
export class RegionNewRoutingModule {}
