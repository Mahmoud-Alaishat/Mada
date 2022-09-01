import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { FeedbackComponent } from './feedback/feedback.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { ReportsComponent } from './reports/reports.component';




@NgModule({
  declarations: [DashboardComponent, FeedbackComponent, MailboxComponent, ReportsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        { path: "admin/dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
        { path: "admin/feedback", component: FeedbackComponent, canActivate: [AuthGuard] },
        { path: "admin/mailbox", component: MailboxComponent, canActivate: [AuthGuard] },
        { path: "admin/reports", component: ReportsComponent, canActivate: [AuthGuard] },

        
      ]
    )
  ],
  exports: [DashboardComponent, FeedbackComponent, MailboxComponent, ReportsComponent]
})
export class AdminModule { }
