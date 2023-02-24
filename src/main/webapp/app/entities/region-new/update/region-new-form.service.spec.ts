import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../region-new.test-samples';

import { RegionNewFormService } from './region-new-form.service';

describe('RegionNew Form Service', () => {
  let service: RegionNewFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegionNewFormService);
  });

  describe('Service methods', () => {
    describe('createRegionNewFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRegionNewFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            regionName: expect.any(Object),
          })
        );
      });

      it('passing IRegionNew should create a new form with FormGroup', () => {
        const formGroup = service.createRegionNewFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            regionName: expect.any(Object),
          })
        );
      });
    });

    describe('getRegionNew', () => {
      it('should return NewRegionNew for default RegionNew initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createRegionNewFormGroup(sampleWithNewData);

        const regionNew = service.getRegionNew(formGroup) as any;

        expect(regionNew).toMatchObject(sampleWithNewData);
      });

      it('should return NewRegionNew for empty RegionNew initial value', () => {
        const formGroup = service.createRegionNewFormGroup();

        const regionNew = service.getRegionNew(formGroup) as any;

        expect(regionNew).toMatchObject({});
      });

      it('should return IRegionNew', () => {
        const formGroup = service.createRegionNewFormGroup(sampleWithRequiredData);

        const regionNew = service.getRegionNew(formGroup) as any;

        expect(regionNew).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRegionNew should not enable id FormControl', () => {
        const formGroup = service.createRegionNewFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRegionNew should disable id FormControl', () => {
        const formGroup = service.createRegionNewFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
