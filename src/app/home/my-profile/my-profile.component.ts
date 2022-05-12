import { Component, OnInit } from '@angular/core';
import { Staff } from '../../interfaces/staff/staff';
import { MainService } from '../../services/main.service';
import { LocalService } from '../../services/local.service';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  staff!: Staff;
  nivel: string = '';

  constructor(private mainService: MainService, private localService: LocalService) { }

  ngOnInit(): void {
    this.mainService.getStaffByUserId( this.localService.getJsonValue('token').user.id ).subscribe(
      resp => {
        console.log(resp)
        this.staff = resp[0]
      }
    )
  }

  options: AnimationOptions = {
    path: '/assets/lottie/notfound.json',
  }

  animationCreated(animationItem: AnimationItem): void {}

}
