import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { LayoutComponent } from './layout/layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
    declarations: [LayoutComponent],
    imports: [CommonModule, LayoutRoutingModule, NgOptimizedImage, NzButtonModule],
})
export class LayoutModule {}
