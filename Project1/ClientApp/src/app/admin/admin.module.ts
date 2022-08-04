import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        { path: "admin", component: DashboardComponent },
        
      ]
    )
  ],
  exports: [DashboardComponent]
})
export class AdminModule { }
