import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';
import { creditCardValidator } from '../../directives/credit-card-validator.directive';


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

  ngAfterViewInit(){
    console.log(this.checkoutForm.controls['cardNumber'].value);
    console.log(this.checkoutForm.controls['cardNumber'].errors);
  }

  checkoutForm = this.fb.group({
    name:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    phone:['',Validators.required],
    
    address:['',Validators.required],
    zipCode:[''],
    city:['',Validators.required],
    country:['',Validators.required],
   
    
    cardNumber:['',[Validators.required,creditCardValidator(/^\d{16}$/)]],
    cardName:['',Validators.required],
    cardExpiry:['',Validators.required],
    cardCvc:['',[Validators.required,creditCardValidator(/^\d{3}$/)]],
    
  })

  onSubmit(){
    console.log(this.checkoutForm.value);
    console.log(this.checkoutForm.valid);
  } 



  

}
