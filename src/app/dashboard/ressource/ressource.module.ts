import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RessourceRoutingModule } from './ressource-routing.module';
import { RessourceComponent } from './ressource.component';


@NgModule({
  declarations: [
    RessourceComponent
  ],
  imports: [
    CommonModule,
    RessourceRoutingModule
  ]
})
export class RessourceModule { }
