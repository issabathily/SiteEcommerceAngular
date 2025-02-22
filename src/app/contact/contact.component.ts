import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Button} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, Button, DropdownModule, FormsModule, InputNumberModule, InputTextModule, InputTextareaModule, NgStyle, NgIf],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent  {
myForm!: FormGroup;
constructor(private fb : FormBuilder) {
this.myForm=this.fb.group({
  Nom : ['',[ Validators.required , Validators.maxLength(10)]],
  email: ['',[ Validators.required , Validators.email]],
  message: ['',[ Validators.required , Validators.maxLength(300)]],
})
}

  sucsee() {
    alert('formulaire enrigistre avec succes ')
  }

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


