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
    name:['name',Validators.required],
    email:['email',Validators.required],
    phone:['phone',Validators.required],
    
    address:['address',Validators.required],
    zipCode:['00000'],
    city:['city',Validators.required],
    country:['country',Validators.required],
   
    
    cardNumber:['1234567891234567',Validators.required],
    cardName:['card name',Validators.required],
    cardExpiry:['expiry',Validators.required],
    cardCvc:['123',Validators.required],
    
  })

  onSubmit(){
    console.log(this.checkoutForm.value);
  } 



  

}
