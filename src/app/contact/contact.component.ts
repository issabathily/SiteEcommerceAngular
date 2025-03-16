import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {NgIf, NgStyle} from "@angular/common";
import {Router, RouterModule,} from "@angular/router";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, Button, DropdownModule, FormsModule, InputNumberModule, InputTextModule, InputTextareaModule, NgStyle, NgIf,RouterModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent  {
myForm!: FormGroup;
constructor(private fb : FormBuilder,private route :Router) {
this.myForm=this.fb.group({
  Nom : ['',[ Validators.required , Validators.maxLength(70)]],
  email: ['',[ Validators.required , Validators.email]],
  message: ['',[ Validators.required , Validators.maxLength(300)]],
})
}

 sucsee() {
    this.route.navigate(['/'])
      alert(`demande evoyer avec  Success ✅ `);
  }
 nom! : string;



  color(){
    if (this.myForm.invalid) {
      return '#333' ;
    }
  }

  getcolor() {
    if(this.myForm.invalid) {
      return 'red' ;
    }
    else {
      return 'green' ;
    }
  }
}


