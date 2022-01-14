import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { creditCardValidator } from '../../directives/credit-card-validator.directive';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  
  
  formValidity = 'false';

  constructor( 
    private activatedRoute:ActivatedRoute,
    private fb:FormBuilder
    ) { 
      
    }
    

  ngOnInit(): void {
    this.isValid();

  }

  

  checkoutForm = this.fb.group({
    name:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required],
    phone:['',Validators.required],
    
    address:['',Validators.required],
    zipCode:[''],
    city:['',Validators.required],
    country:['',Validators.required],
   
    
    cardNumber:['',[Validators.required,Validators.pattern(/^\d{16}$/)]],
    cardExpiry:['',Validators.required],
    cardCvc:['',[Validators.required,Validators.pattern(/^\d{3}$/)]],
    
  })

  isValid(){
    this.checkoutForm.statusChanges.subscribe(status => {
      this.formValidity = status ;
    });

  }

  onSubmit(){
    console.log(this.checkoutForm.value);
    console.log(this.checkoutForm.valid);
  } 

  


  

}
