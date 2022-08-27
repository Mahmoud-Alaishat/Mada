import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';




@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        { path: "admin/dashboard", component: DashboardComponent, canActivate:[AuthGuard] },
        
      ]
    )
  ],
  exports: [DashboardComponent]
})
export class AdminModule { }
