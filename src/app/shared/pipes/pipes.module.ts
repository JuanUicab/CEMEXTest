import { NgModule } from '@angular/core';
import { PhasePipe } from './phase.pipe';
import { StatusPipe } from './status.pipe';
import { MonthPipe } from './month.pipe';

@NgModule({
    declarations: [PhasePipe, StatusPipe, MonthPipe],
    imports: [],
    exports: [PhasePipe, StatusPipe, MonthPipe],
})
export class PipesModule {}
