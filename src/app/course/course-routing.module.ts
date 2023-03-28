import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [RouterModule.forChild(CourseRoutingModule.routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule {
  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full'
    },
    {
      path: 'list',
      component: ListComponent
    },
    {
      path:'add',
      component:AddComponent
    },
    {
      path: '**',
      redirectTo: 'list',
      pathMatch: 'full'
    }
  ]
}
