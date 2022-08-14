import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TimelineComponent } from './timeline/timeline.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from '../guards/auth.guard';
import { SubscriptionComponent } from './subscription/subscription.component';



@NgModule({
  declarations: [FeedComponent, NavBarComponent, SideBarComponent, TimelineComponent, SettingsComponent, SubscriptionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        { path: "user/feed", component: FeedComponent, canActivate: [AuthGuard] },
        { path: "user/timeline", component: TimelineComponent, canActivate: [AuthGuard] },
        { path: "user/settings", component: SettingsComponent, canActivate: [AuthGuard] },
        { path: "user/subscription", component: SubscriptionComponent, canActivate: [AuthGuard] }
      ]
    )
  ],
  exports: [FeedComponent, NavBarComponent, SideBarComponent, TimelineComponent, SettingsComponent],
})
export class UserModule { }
