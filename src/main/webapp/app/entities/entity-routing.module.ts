import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'region',
        data: { pageTitle: 'mydatabaseApp.region.home.title' },
        loadChildren: () => import('./region/region.module').then(m => m.RegionModule),
      },
      {
        path: 'country',
        data: { pageTitle: 'mydatabaseApp.country.home.title' },
        loadChildren: () => import('./country/country.module').then(m => m.CountryModule),
      },
      {
        path: 'job',
        data: { pageTitle: 'mydatabaseApp.job.home.title' },
        loadChildren: () => import('./job/job.module').then(m => m.JobModule),
      },
      {
        path: 'task',
        data: { pageTitle: 'mydatabaseApp.task.home.title' },
        loadChildren: () => import('./task/task.module').then(m => m.TaskModule),
      },
      {
        path: 'employee',
        data: { pageTitle: 'mydatabaseApp.employee.home.title' },
        loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
      },
      {
        path: 'department',
        data: { pageTitle: 'mydatabaseApp.department.home.title' },
        loadChildren: () => import('./department/department.module').then(m => m.DepartmentModule),
      },
      {
        path: 'job-history',
        data: { pageTitle: 'mydatabaseApp.jobHistory.home.title' },
        loadChildren: () => import('./job-history/job-history.module').then(m => m.JobHistoryModule),
      },
      {
        path: 'location',
        data: { pageTitle: 'mydatabaseApp.location.home.title' },
        loadChildren: () => import('./location/location.module').then(m => m.LocationModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
