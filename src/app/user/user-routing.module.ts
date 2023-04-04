import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(UserRoutingModule.routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
  public static routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent,
      canActivate:[NoAuthGuard]
    },
    {
      path: '**',
      redirectTo: 'login',
      pathMatch: 'full'
    }
  ]
 }
