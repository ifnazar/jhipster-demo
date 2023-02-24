import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRegionNew } from '../region-new.model';

@Component({
  selector: 'jhi-region-new-detail',
  templateUrl: './region-new-detail.component.html',
})
export class RegionNewDetailComponent implements OnInit {
  regionNew: IRegionNew | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ regionNew }) => {
      this.regionNew = regionNew;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
