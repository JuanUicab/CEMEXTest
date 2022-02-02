import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersBarComponent } from './filters-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from '../modal/modal.module';



@NgModule({
  declarations: [FiltersBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule
  ],
  exports: [FiltersBarComponent]
})
export class FiltersBarModule { }
