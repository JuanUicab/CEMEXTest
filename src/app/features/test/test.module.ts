import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from '../test/test.component';
import { GenericTableModule } from 'src/app/shared/components/generic-table/generic-table.module';
import { HeaderModule } from 'src/app/core/components/header/header.module';
import { FiltersBarModule } from 'src/app/shared/components/filters-bar/filters-bar.module';


@NgModule({
  declarations: [
    TestComponent
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    HeaderModule,
    FiltersBarModule,
    GenericTableModule
  ]
})
export class TestModule { }
