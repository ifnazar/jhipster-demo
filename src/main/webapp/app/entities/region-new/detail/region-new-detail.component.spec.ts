import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RegionNewDetailComponent } from './region-new-detail.component';

describe('RegionNew Management Detail Component', () => {
  let comp: RegionNewDetailComponent;
  let fixture: ComponentFixture<RegionNewDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegionNewDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ regionNew: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(RegionNewDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(RegionNewDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load regionNew on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.regionNew).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
