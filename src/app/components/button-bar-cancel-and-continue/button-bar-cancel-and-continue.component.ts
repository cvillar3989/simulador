import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-button-bar-cancel-and-continue',
  templateUrl: './button-bar-cancel-and-continue.component.html',
  styleUrls: ['./button-bar-cancel-and-continue.component.css']
})
export class ButtonBarCancelAndContinueComponent implements OnInit {

  @Input() formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
