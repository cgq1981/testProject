import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPage } from './user';
import { MemberListPopover } from './list-popover';


@NgModule({
  declarations: [
    UserPage,MemberListPopover
  ],
  imports: [
    IonicPageModule.forChild(UserPage),
    IonicPageModule.forChild(MemberListPopover)
  ],
  exports: [
    UserPage,MemberListPopover
  ]
})
export class UserModule {}
