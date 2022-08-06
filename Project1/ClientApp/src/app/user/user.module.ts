import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';



@NgModule({
  declarations: [FeedComponent, NavBarComponent, SideBarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(
          [
            { path: "user/feed", component: FeedComponent },
          ]
        )
  ],
  exports: [FeedComponent, NavBarComponent, SideBarComponent],
})
export class UserModule { }
