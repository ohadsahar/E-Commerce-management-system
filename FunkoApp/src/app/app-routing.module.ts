import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './core/homepage/homepage.component';
import { ManagmentComponent } from './core/managment/managment.component';

const routes: Routes = [

  { path: '', component: HomePageComponent },
  { path: 'managment/:id', component: ManagmentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
