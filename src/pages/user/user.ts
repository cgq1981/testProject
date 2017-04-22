import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController,ModalController,AlertController} from 'ionic-angular';

import { MemberListPopover } from './list-popover';
import { UserEdit } from '../user-edit/user-edit';
import { UserManageService } from "../../providers/user-manage"

/**
 * Generated class for the User page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  userList:Array<any>
  sortFlag:boolean
  UserEditPage:any = UserEdit
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl:ModalController,public popCtrl:PopoverController
  ,public alertCtrl:AlertController
  ,private userServ:UserManageService) {
    this.userServ.findClasses("TestUser").then(data=>{
        console.log(data)
        console.log(data.json())
        if(data&&data.json().results){
          this.userList = data.json().results
        }
    })
    // this.userList = [
    //   {username:"王玉",sex:"female",age:18},
    //   {username:"王文欣",sex:"female",age:20},
    //   {username:"文卓",sex:"female",age:15},
    //   {username:"赵文卓",sex:"female",age:100},
    //   {username:"郑乾",sex:"female",age:23}
    // ]
    this.sortFlag = true;
    
  }

  presentPopover(myEvent)
  {
    let popover = this.popCtrl.create(MemberListPopover);
    popover.onDidDismiss(data=>{
      console.log(data)
      if(data){
        if(data == "user") {
          this.presentUserEditModal()
        }
      }
    })
    popover.present({
      ev: myEvent
    });
  }

  delete(member){
    let opts = {
      title: '删除学员',
      message: `请问您要删除当前学员${member.username}吗?`,
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
            return
          }
        },
        {
          text: '确认',
          handler: () => {
                if(member&&member.objectId){
                  this.userServ.deleteClassById("TestUser",member.objectId).then(data=>{
                    this.userList.filter((item,index)=>{
                      if(item.objectId == member.objectId){
                        this.userList.splice(index,1)
                      }
                      })
                  })
                }
          }
        }
      ]
    }
    let deleteConfirm = this.alertCtrl.create(opts)
    deleteConfirm.present()
  }

  presentUserEditModal(member?){
      let opts:any = {}
      if(member){
        opts.member = member
      }
          let userAdd = this.modalCtrl.create(this.UserEditPage,opts)
          userAdd.onDidDismiss(data=>{
            if(data){
              this.userList.push(data)
            }
          })
          userAdd.present()
    }
  sortList(){
    if(this.sortFlag)
    {
        this.userList.sort(function(a,b){return a.age-b.age});
    }
      
      else{
          this.userList.sort(function(a,b){return b.age-a.age});
      }
    this.sortFlag = !this.sortFlag
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad User');
  }

}
