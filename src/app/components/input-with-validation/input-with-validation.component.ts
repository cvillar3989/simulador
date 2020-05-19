import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-with-validation',
  templateUrl: './input-with-validation.component.html',
  styleUrls: ['./input-with-validation.component.css']
})
export class InputWithValidationComponent implements OnInit {
  
  @Input() fControl: FormGroup;
  @Input() label:string;
  @Input() typeInput:string;

  constructor() { }

  ngOnInit() {
  }

}
