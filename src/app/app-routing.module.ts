import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
const routes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: HomeComponent },
  { path: '', redirectTo: 'HomeComponent', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
