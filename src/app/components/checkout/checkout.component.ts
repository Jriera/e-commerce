import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor( 
    private activatedRoute:ActivatedRoute,
    private fb:FormBuilder
    ) { }
    

  ngOnInit(): void {
    
  }

  checkoutForm = this.fb.group({
    name:['',Validators.required],
    email:['',Validators.required,Validators.email],
    phone:['',Validators.required],
    
    address:['',Validators.required],
    zipCode:[''],
    city:['',Validators.required],
    country:['',Validators.required],
   
    
    cardNumber:['',Validators.required],
    cardName:['',Validators.required],
    cardExpiry:['',Validators.required],
    cardCvc:['',Validators.required],
    
  })

  onSubmit(){
    console.log(this.checkoutForm.value);
  } 



  

}
