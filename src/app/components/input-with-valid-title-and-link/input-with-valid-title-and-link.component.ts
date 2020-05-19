import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { InputWithValidationComponent } from '../input-with-validation/input-with-validation.component';

@Component({
  selector: 'app-input-with-valid-title-and-link',
  templateUrl: './input-with-valid-title-and-link.component.html',
  styleUrls: ['./input-with-valid-title-and-link.component.css']
})
export class InputWithValidTitleAndLinkComponent extends InputWithValidationComponent {

  @Input() titleText: string;
  @Input() linkText:string;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  onClickLink(){
  }

}
