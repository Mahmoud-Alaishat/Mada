import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TimelineComponent } from './timeline/timeline.component';
import { Setting1Component } from './setting1/setting1.component';



@NgModule({
  declarations: [FeedComponent, NavBarComponent, SideBarComponent, TimelineComponent, Setting1Component],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        { path: "user/feed", component: FeedComponent },
        { path: "user/timeline", component: TimelineComponent },
        { path: "user/setting1", component: Setting1Component }
      ]
    )
  ],
  exports: [FeedComponent, NavBarComponent, SideBarComponent, TimelineComponent],
})
export class UserModule { }
