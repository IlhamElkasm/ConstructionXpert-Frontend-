import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RessourceComponent } from './ressource.component';

const routes: Routes = [{ path: '', component: RessourceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RessourceRoutingModule { }
