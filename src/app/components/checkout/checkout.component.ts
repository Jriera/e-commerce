import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';





@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  
  
  formValidity = 'false';
  email:string = '';
  password:string = '';
  name:string = '';
 

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
      this.email = this.checkoutForm.value.email;
      this.password = this.checkoutForm.value.password;
      this.name = this.checkoutForm.value.name;
      

      console.log(this.email);
      console.log(this.password);
    });


  }

  onSubmit(){
    console.log(this.checkoutForm.value);
    console.log(this.checkoutForm.valid);
  } 

  


  

}
