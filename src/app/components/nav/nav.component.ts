import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations:[
    trigger('expandContract',[
      transition('* => *',[
        style({ height: '0px' }),
        animate('0.8s ease-in')
      ])
      
    ]),
  ]
})
export class NavComponent implements OnInit {

  expand: boolean = false;
  categorySelected:string =''
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  //following are the methods for route capture
 



  //following are the methods for animations
  expander(){
   this.expand=!this.expand;
  }
      

}

    
  

  
      

    

  

 


