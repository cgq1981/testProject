import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userList = [
      {username:"王玉",sex:"female",age:18},
      {username:"王文欣",sex:"female",age:20},
      {username:"文卓",sex:"female",age:15},
      {username:"赵文卓",sex:"female",age:100},
      {username:"郑乾",sex:"female",age:23}
    ]
    this.sortFlag = true;
    
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
