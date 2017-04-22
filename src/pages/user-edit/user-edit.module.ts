import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserEdit } from './user-edit';

@NgModule({
  declarations: [
    UserEdit,
  ],
  imports: [
    IonicPageModule.forChild(UserEdit),
  ],
  exports: [
    UserEdit
  ]
})
export class UserEditModule {}
