import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IRegionNew, NewRegionNew } from '../region-new.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRegionNew for edit and NewRegionNewFormGroupInput for create.
 */
type RegionNewFormGroupInput = IRegionNew | PartialWithRequiredKeyOf<NewRegionNew>;

type RegionNewFormDefaults = Pick<NewRegionNew, 'id'>;

type RegionNewFormGroupContent = {
  id: FormControl<IRegionNew['id'] | NewRegionNew['id']>;
  regionName: FormControl<IRegionNew['regionName']>;
};

export type RegionNewFormGroup = FormGroup<RegionNewFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RegionNewFormService {
  createRegionNewFormGroup(regionNew: RegionNewFormGroupInput = { id: null }): RegionNewFormGroup {
    const regionNewRawValue = {
      ...this.getFormDefaults(),
      ...regionNew,
    };
    return new FormGroup<RegionNewFormGroupContent>({
      id: new FormControl(
        { value: regionNewRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      regionName: new FormControl(regionNewRawValue.regionName),
    });
  }

  getRegionNew(form: RegionNewFormGroup): IRegionNew | NewRegionNew {
    return form.getRawValue() as IRegionNew | NewRegionNew;
  }

  resetForm(form: RegionNewFormGroup, regionNew: RegionNewFormGroupInput): void {
    const regionNewRawValue = { ...this.getFormDefaults(), ...regionNew };
    form.reset(
      {
        ...regionNewRawValue,
        id: { value: regionNewRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): RegionNewFormDefaults {
    return {
      id: null,
    };
  }
}
