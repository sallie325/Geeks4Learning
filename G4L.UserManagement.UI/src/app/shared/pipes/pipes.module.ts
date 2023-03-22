import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveUnderscorePipe } from './remove-underscore.pipe';
import { FormatDurationPipe } from './format-duration.pipe';



@NgModule({
  declarations: [ RemoveUnderscorePipe, FormatDurationPipe ],
  exports: [ RemoveUnderscorePipe, FormatDurationPipe ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
