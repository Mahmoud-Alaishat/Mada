import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { FeedComponent } from './feed/feed.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TimelineComponent } from './timeline/timeline.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from '../guards/auth.guard';
import { SubscriptionComponent } from './subscription/subscription.component';
import { ChatComponent } from './chat/chat.component';



@NgModule({
  declarations: [FeedComponent, NavBarComponent, SideBarComponent, TimelineComponent, SettingsComponent, SubscriptionComponent, ChatComponent],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    RouterModule.forChild(
      [
        { path: "user/feed", component: FeedComponent, canActivate: [AuthGuard] },
        { path: "user/timeline", component: TimelineComponent, canActivate: [AuthGuard] },
        { path: "user/settings", component: SettingsComponent, canActivate: [AuthGuard] },
        { path: "user/subscription", component: SubscriptionComponent, canActivate: [AuthGuard] },
        { path: "user/chat", component: ChatComponent, canActivate: [AuthGuard] },
      ]
    )
  ],
  exports: [FeedComponent, NavBarComponent, SideBarComponent, TimelineComponent, SettingsComponent],
})
export class UserModule { }
