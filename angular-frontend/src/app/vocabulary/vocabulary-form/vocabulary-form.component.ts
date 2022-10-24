/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

 import { Component, Inject, Input, OnInit } from '@angular/core';
 import { FormControl, FormGroup, Validators } from "@angular/forms";
 import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
 import { Vocabulary } from '../../_models/vocabulary';
 import { AccessIds } from 'src/app/_models/accessIds';


@Component({
  selector: 'app-vocabulary-form',
  templateUrl: './vocabulary-form.component.html',
  styleUrls: ['./vocabulary-form.component.scss']
})
export class VocabularyFormComponent implements OnInit {

  submitted: boolean = false;
  form: FormGroup;
  update: boolean = false;
  accessIds:AccessIds = new AccessIds();
  default:Vocabulary = new Vocabulary();

  tagInputLabel:string="Translations";
  tagInputPlaceholder:string="New translation...";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Vocabulary,
    private dialogRef: MatDialogRef<VocabularyFormComponent>,
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

  setTags(event){
    this.form.value.translations=event
  }

  setForm() {
    this.submitted = false;
    this.form = null;
    this.form = new FormGroup(
      {
        el: new FormControl(this.data.el, { validators: [Validators.required] }),
        de: new FormControl(this.data.de, { validators: [Validators.required] }),
        en: new FormControl(this.data.en, { validators: [Validators.required] }),
        fr: new FormControl(this.data.fr, { validators: [Validators.required] }),
        la: new FormControl(this.data.la, { validators: [Validators.required] }),
        it: new FormControl(this.data.it, { validators: [Validators.required] })
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
