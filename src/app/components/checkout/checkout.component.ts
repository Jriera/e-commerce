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
    email:['',Validators.required],
    phone:['',Validators.required],
    shipping: this.fb.group({
    address:['',Validators.required],
    zipCode:[''],
    city:['',Validators.required],
    country:['',Validators.required],
    }),
    paymentMethod:this.fb.group({
    cardNumber:['',Validators.required],
    cardName:['',Validators.required],
    cardExpiry:['',Validators.required],
    cardCvc:['',Validators.required],
    })
  })



  

}
