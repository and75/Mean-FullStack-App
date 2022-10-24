/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomValidators } from '../../_providers/CustomValidators';
import { Author } from '../../_models/author';
import { Language } from 'src/app/_models/lang';
import { AccessIds } from 'src/app/_models/accessIds';

@Component({
  selector: 'app-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent implements OnInit {

  submitted: boolean = false;
  form: FormGroup;
  formBd: FormGroup;
  formDd: FormGroup;
  update: boolean = false;
  languages:Language = new Language();
  accessIds:AccessIds = new AccessIds();

  tagInputLabel:string="Tags";
  tagInputPlaceholder:string="New tag...";

  default: Author = new Author();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Author,
    private dialogRef: MatDialogRef<AuthorFormComponent>,
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
  
  // convenience getter for easy access to form fields
  get fDd() {
    return this.formDd.controls;
  }
  
  // convenience getter for easy access to form fields
  get fBd() {
    return this.formBd.controls;
  }

  setForm() {
    
    this.submitted = false;
    this.form = null;
    this.formBd = null;
    this.formDd = null;

    this.formBd = new FormGroup({
      century: new FormControl(this.data.birthDate.century, { validators: [Validators.required] }),
      bC: new FormControl(this.data.birthDate.bC),
      year: new FormControl(this.data.birthDate.year),
      place: new FormControl(this.data.birthDate.place, { validators: [Validators.required] })
    });
    this.formDd = new FormGroup({
      century: new FormControl(this.data.deathDate.century, { validators: [Validators.required] }),
      bC: new FormControl(this.data.deathDate.bC),
      year: new FormControl(this.data.deathDate.year),
      place: new FormControl(this.data.deathDate.place, { validators: [Validators.required] })
    });
    this.form = new FormGroup(
      {
        fullname: new FormControl(this.data.fullname, { validators: [Validators.required] }),
        biography: new FormControl(this.data.biography),
        birthDate: this.formBd,
        deathDate: this.formDd,
        accessId:new FormControl(this.data.accessId, { validators: [Validators.required] }),
        tags:new FormControl(this.data.tags)
      }, { updateOn: "blur" },
      CustomValidators.mustMatch('password', 'passwordConfirm')
    );
    this.form.value.tags=this.data.tags;
  }

  logError(key: string, value: any) {
    const error = {
      required: "This fields is required",
      minlength: "The entered value is too short. Required lenght is  min : " + value?.requiredLength,
      maxlength: "The entered value is too long. Required lenght is  max : " + value?.requiredLength
    }
    return error[key];
  }

  save() {
    this.submitted = true;
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
