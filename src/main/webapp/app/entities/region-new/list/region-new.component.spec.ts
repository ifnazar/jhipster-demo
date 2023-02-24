import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { RegionNewService } from '../service/region-new.service';

import { RegionNewComponent } from './region-new.component';

describe('RegionNew Management Component', () => {
  let comp: RegionNewComponent;
  let fixture: ComponentFixture<RegionNewComponent>;
  let service: RegionNewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{ path: 'region-new', component: RegionNewComponent }]), HttpClientTestingModule],
      declarations: [RegionNewComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of({
              defaultSort: 'id,asc',
            }),
            queryParamMap: of(
              jest.requireActual('@angular/router').convertToParamMap({
                page: '1',
                size: '1',
                sort: 'id,desc',
              })
            ),
            snapshot: { queryParams: {} },
          },
        },
      ],
    })
      .overrideTemplate(RegionNewComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RegionNewComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(RegionNewService);

    const headers = new HttpHeaders();
    jest.spyOn(service, 'query').mockReturnValue(
      of(
        new HttpResponse({
          body: [{ id: 123 }],
          headers,
        })
      )
    );
  });

  it('Should call load all on init', () => {
    // WHEN
    comp.ngOnInit();

    // THEN
    expect(service.query).toHaveBeenCalled();
    expect(comp.regionNews?.[0]).toEqual(expect.objectContaining({ id: 123 }));
  });

  describe('trackId', () => {
    it('Should forward to regionNewService', () => {
      const entity = { id: 123 };
      jest.spyOn(service, 'getRegionNewIdentifier');
      const id = comp.trackId(0, entity);
      expect(service.getRegionNewIdentifier).toHaveBeenCalledWith(entity);
      expect(id).toBe(entity.id);
    });
  });
});
