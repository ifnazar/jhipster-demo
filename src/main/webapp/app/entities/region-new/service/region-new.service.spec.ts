import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IRegionNew } from '../region-new.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../region-new.test-samples';

import { RegionNewService } from './region-new.service';

const requireRestSample: IRegionNew = {
  ...sampleWithRequiredData,
};

describe('RegionNew Service', () => {
  let service: RegionNewService;
  let httpMock: HttpTestingController;
  let expectedResult: IRegionNew | IRegionNew[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(RegionNewService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a RegionNew', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const regionNew = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(regionNew).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RegionNew', () => {
      const regionNew = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(regionNew).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a RegionNew', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RegionNew', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a RegionNew', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addRegionNewToCollectionIfMissing', () => {
      it('should add a RegionNew to an empty array', () => {
        const regionNew: IRegionNew = sampleWithRequiredData;
        expectedResult = service.addRegionNewToCollectionIfMissing([], regionNew);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(regionNew);
      });

      it('should not add a RegionNew to an array that contains it', () => {
        const regionNew: IRegionNew = sampleWithRequiredData;
        const regionNewCollection: IRegionNew[] = [
          {
            ...regionNew,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addRegionNewToCollectionIfMissing(regionNewCollection, regionNew);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RegionNew to an array that doesn't contain it", () => {
        const regionNew: IRegionNew = sampleWithRequiredData;
        const regionNewCollection: IRegionNew[] = [sampleWithPartialData];
        expectedResult = service.addRegionNewToCollectionIfMissing(regionNewCollection, regionNew);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(regionNew);
      });

      it('should add only unique RegionNew to an array', () => {
        const regionNewArray: IRegionNew[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const regionNewCollection: IRegionNew[] = [sampleWithRequiredData];
        expectedResult = service.addRegionNewToCollectionIfMissing(regionNewCollection, ...regionNewArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const regionNew: IRegionNew = sampleWithRequiredData;
        const regionNew2: IRegionNew = sampleWithPartialData;
        expectedResult = service.addRegionNewToCollectionIfMissing([], regionNew, regionNew2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(regionNew);
        expect(expectedResult).toContain(regionNew2);
      });

      it('should accept null and undefined values', () => {
        const regionNew: IRegionNew = sampleWithRequiredData;
        expectedResult = service.addRegionNewToCollectionIfMissing([], null, regionNew, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(regionNew);
      });

      it('should return initial array if no RegionNew is added', () => {
        const regionNewCollection: IRegionNew[] = [sampleWithRequiredData];
        expectedResult = service.addRegionNewToCollectionIfMissing(regionNewCollection, undefined, null);
        expect(expectedResult).toEqual(regionNewCollection);
      });
    });

    describe('compareRegionNew', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareRegionNew(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareRegionNew(entity1, entity2);
        const compareResult2 = service.compareRegionNew(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareRegionNew(entity1, entity2);
        const compareResult2 = service.compareRegionNew(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareRegionNew(entity1, entity2);
        const compareResult2 = service.compareRegionNew(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
