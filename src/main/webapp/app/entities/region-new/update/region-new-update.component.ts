import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { RegionNewFormService, RegionNewFormGroup } from './region-new-form.service';
import { IRegionNew } from '../region-new.model';
import { RegionNewService } from '../service/region-new.service';

@Component({
  selector: 'jhi-region-new-update',
  templateUrl: './region-new-update.component.html',
})
export class RegionNewUpdateComponent implements OnInit {
  isSaving = false;
  regionNew: IRegionNew | null = null;

  editForm: RegionNewFormGroup = this.regionNewFormService.createRegionNewFormGroup();

  constructor(
    protected regionNewService: RegionNewService,
    protected regionNewFormService: RegionNewFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ regionNew }) => {
      this.regionNew = regionNew;
      if (regionNew) {
        this.updateForm(regionNew);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const regionNew = this.regionNewFormService.getRegionNew(this.editForm);
    if (regionNew.id !== null) {
      this.subscribeToSaveResponse(this.regionNewService.update(regionNew));
    } else {
      this.subscribeToSaveResponse(this.regionNewService.create(regionNew));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRegionNew>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(regionNew: IRegionNew): void {
    this.regionNew = regionNew;
    this.regionNewFormService.resetForm(this.editForm, regionNew);
  }
}
