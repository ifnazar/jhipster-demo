import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRegionNew } from '../region-new.model';
import { RegionNewService } from '../service/region-new.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './region-new-delete-dialog.component.html',
})
export class RegionNewDeleteDialogComponent {
  regionNew?: IRegionNew;

  constructor(protected regionNewService: RegionNewService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.regionNewService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
