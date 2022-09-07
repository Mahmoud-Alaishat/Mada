import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { FeedbackComponent } from './feedback/feedback.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportComponent } from './report/report.component';
import { HomeDesignComponent } from './home-design/home-design.component';
import { AboutUsDesignComponent } from './about-us-design/about-us-design.component';
import { EmailComponent } from './email/email.component';
import { UserActivitiesComponent } from './user-activities/user-activities.component';
import { ManageServicesComponent } from './manage-services/manage-services.component';
import { ManageStoryComponent } from './manage-story/manage-story.component';



@NgModule({
  declarations: [DashboardComponent, FeedbackComponent, MailboxComponent, ReportsComponent, ReportComponent, HomeDesignComponent, AboutUsDesignComponent, EmailComponent, UserActivitiesComponent, ManageServicesComponent, ManageStoryComponent],
  imports: [
    CommonModule, FormsModule,
    RouterModule.forChild(
      [
        { path: "admin/dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
        { path: "admin/feedback", component: FeedbackComponent, canActivate: [AuthGuard] },
        { path: "admin/mailbox", component: MailboxComponent, canActivate: [AuthGuard] },
        { path: "admin/reports", component: ReportsComponent, canActivate: [AuthGuard] },
        { path: "admin/report", component: ReportComponent, canActivate: [AuthGuard] },
        { path: "admin/homedesign", component: HomeDesignComponent, canActivate: [AuthGuard] },
        { path: "admin/mailbox/email/:id", component: EmailComponent, canActivate: [AuthGuard] },
        { path: "admin/homedesign", component: HomeDesignComponent, canActivate: [AuthGuard] },
        { path: "admin/aboutusdesign", component: AboutUsDesignComponent, canActivate: [AuthGuard] },
        { path: "admin/useractivities", component: UserActivitiesComponent, canActivate: [AuthGuard] },
        { path: "admin/manageservice", component: ManageServicesComponent, canActivate: [AuthGuard] },
        { path: "admin/managestory", component: ManageStoryComponent, canActivate: [AuthGuard] }

      ]
    )
  ],
  exports: [DashboardComponent, FeedbackComponent, MailboxComponent, ReportsComponent, ReportComponent, HomeDesignComponent, AboutUsDesignComponent, EmailComponent, UserActivitiesComponent, ManageServicesComponent,ManageStoryComponent]
})
export class AdminModule { }
