import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private fb:FirebaseService) { }

  ngOnInit(): void {
  }

  isAdmin(){
    this.fb.getUser('TFZTJlD3f0Q7wp7mUI2N66M0olA3')
  }

}
