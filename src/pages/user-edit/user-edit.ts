import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import { UserManageService } from "../../providers/user-manage"

/**
 * Generated class for the UserEdit page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-edit',
  templateUrl: 'user-edit.html',
})
export class UserEdit {
  object:any = {
    username:"",
    sex:"",
    age:""
  }
  currentUser:any
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl:ViewController
  ,private userServ:UserManageService
  ) {
    this.currentUser = this.navParams.data.member
    if(this.currentUser){
      console.log(this.currentUser)
      this.object.username = this.currentUser.username
      this.object.sex = this.currentUser.sex
      this.object.age = this.currentUser.age
    }
  }
  save(){
    if(this.currentUser){
      this.userServ.updateClass("TestUser",this.currentUser.objectId,this.object).then(data=>{
          Object.keys(this.object).forEach(key=>{
            this.currentUser[key] = this.object[key]
          })
          this.viewCtrl.dismiss()
        }).catch(err=>{
        console.log(err)
      })
    }
    else{
      this.userServ.saveClass("TestUser",this.object).then(data=>{
      console.log(data)
      this.object.objectId = data.json().objectId
      this.object.createdAt = data.json().createAt
      this.viewCtrl.dismiss(this.object)
        }).catch(err=>{
          console.log(err)
        })
      }
  }
  
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserEdit');
  }
  returnToHistory(){
   this.viewCtrl.dismiss()
  }
}
