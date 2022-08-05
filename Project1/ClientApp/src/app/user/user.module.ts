import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './feed/feed.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';



@NgModule({
  declarations: [FeedComponent, NavBarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(
          [
            { path: "user/feed", component: FeedComponent },
          ]
        )
  ],
  exports: [FeedComponent, NavBarComponent]
})
export class UserModule { }
