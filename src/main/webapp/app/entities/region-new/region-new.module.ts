import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { RegionNewComponent } from './list/region-new.component';
import { RegionNewDetailComponent } from './detail/region-new-detail.component';
import { RegionNewUpdateComponent } from './update/region-new-update.component';
import { RegionNewDeleteDialogComponent } from './delete/region-new-delete-dialog.component';
import { RegionNewRoutingModule } from './route/region-new-routing.module';

@NgModule({
  imports: [SharedModule, RegionNewRoutingModule],
  declarations: [RegionNewComponent, RegionNewDetailComponent, RegionNewUpdateComponent, RegionNewDeleteDialogComponent],
})
export class RegionNewModule {}
