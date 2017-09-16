import { DashboardComponent } from '../dashboard/dashboard.component';
import { BlogComponent } from '../blog/blog.component';
import { HomeComponent } from '../home/home.component';
import { MainComponent } from './main.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: MainComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'dashboard', component: DashboardComponent },
  ] },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
