/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

 import { Component, Inject, Input, OnInit } from '@angular/core';
 import { FormControl, FormGroup, Validators } from "@angular/forms";
 import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
 import { Page } from '../../../_models/page';
 import { AccessIds } from 'src/app/_models/accessIds';

@Component({
  selector: 'app-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.scss']
})
export class PageFormComponent implements OnInit {

  submitted: boolean = false;
  form: FormGroup;
  update: boolean = false;
  accessIds:AccessIds = new AccessIds();
  default:Page = new Page();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Page,
    private dialogRef: MatDialogRef<PageFormComponent>,
  ) {
    if (!this.data) {
      this.data = this.default;
    } else {
      this.update = true;
    }
  }

  ngOnInit() {
    this.setForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }
  

  setForm() {
    this.submitted = false;
    this.form = null;
    this.form = new FormGroup(
      {
        content: new FormControl(this.data.content , { validators: [Validators.required] }),
      }, { updateOn: "blur" }
    );
  }

  logError(key: string, value: any) {
    const error = {
      required: "This fields is required",
      minlength: "The entered value is too short. Required lenght is  min : " + value?.requiredLength,
      maxlength: "The entered value is too long. Required lenght is  max : " + value?.requiredLength,
      mustMatch: "Password and confirm not match"
    }
    return error[key];
  }

  save() {
    this.submitted = true;
    console.log(this.form, this.form.status, this.update);
    if (this.form.status == 'VALID') {
      this.dialogRef.close(
        {
          data: this.data,
          form: this.form.value
        }
      )
    }
  }

  close() {
    this.dialogRef.close();
  }


}
