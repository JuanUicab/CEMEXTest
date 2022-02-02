import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from './generic-table.component';
import { PipesModule } from '../../pipes/pipes.module';



@NgModule({
  declarations: [GenericTableComponent],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [GenericTableComponent]
})
export class GenericTableModule { }
