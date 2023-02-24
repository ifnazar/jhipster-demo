import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { RegionNewFormService } from './region-new-form.service';
import { RegionNewService } from '../service/region-new.service';
import { IRegionNew } from '../region-new.model';

import { RegionNewUpdateComponent } from './region-new-update.component';

describe('RegionNew Management Update Component', () => {
  let comp: RegionNewUpdateComponent;
  let fixture: ComponentFixture<RegionNewUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let regionNewFormService: RegionNewFormService;
  let regionNewService: RegionNewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [RegionNewUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(RegionNewUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RegionNewUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    regionNewFormService = TestBed.inject(RegionNewFormService);
    regionNewService = TestBed.inject(RegionNewService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const regionNew: IRegionNew = { id: 456 };

      activatedRoute.data = of({ regionNew });
      comp.ngOnInit();

      expect(comp.regionNew).toEqual(regionNew);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRegionNew>>();
      const regionNew = { id: 123 };
      jest.spyOn(regionNewFormService, 'getRegionNew').mockReturnValue(regionNew);
      jest.spyOn(regionNewService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ regionNew });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: regionNew }));
      saveSubject.complete();

      // THEN
      expect(regionNewFormService.getRegionNew).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(regionNewService.update).toHaveBeenCalledWith(expect.objectContaining(regionNew));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRegionNew>>();
      const regionNew = { id: 123 };
      jest.spyOn(regionNewFormService, 'getRegionNew').mockReturnValue({ id: null });
      jest.spyOn(regionNewService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ regionNew: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: regionNew }));
      saveSubject.complete();

      // THEN
      expect(regionNewFormService.getRegionNew).toHaveBeenCalled();
      expect(regionNewService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRegionNew>>();
      const regionNew = { id: 123 };
      jest.spyOn(regionNewService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ regionNew });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(regionNewService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
