/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { OnChanges, SimpleChanges, Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomValidators } from '../../_providers/CustomValidators';
import { Book, BookModel } from '../../_models/book';
import { Language, LanguageModel } from 'src/app/_models/lang';
import { AccessIds } from 'src/app/_models/accessIds';
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit, OnChanges {

  submitted: boolean = false;
  bookForm: FormGroup;
  formFe: FormGroup;
  formCe: FormGroup;
  update: boolean = false;
  languages:Language = new Language();
  accessIds:AccessIds = new AccessIds();

  tagInputLabel:string="Tags";
  tagInputPlaceholder:string="New tag...";

  default: Book = {
    _id: "",
    title: "",
    author: "",
    pages: null,
    lang:null,
    abstract: "",
    firstEdition: {
      century: "",
      bC:null,
      year: null,
      location: ""
    },
    currentEdition: {
      century: "",
      bC:null,
      year: null,
      location: ""
    },
    source:"",
    reference: "",
    notes: "",
    pdf:null,
    tags:null,
    protectedByC:null,
    accessId:null,
    owner: null,
    created: null,
    updated: null,
    enable: true
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BookModel,
    private dialogRef: MatDialogRef<BookFormComponent>,
  ) {
    if (!this.data) {
      this.data = this.default;
    } else {
      this.update = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) { }

  ngOnInit() {
    this.setForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.bookForm.controls;
  }
  
  // convenience getter for easy access to form fields
  get fCe() {
    return this.formCe.controls;
  }
  
  // convenience getter for easy access to form fields
  get fFe() {
    return this.formFe.controls;
  }

  setForm() {
    this.submitted = false;
    this.bookForm = null;
    this.formFe = null;
    this.formCe = null;
    this.formFe = new FormGroup({
      century: new FormControl(this.data.firstEdition.century, { validators: [Validators.required] }),
      bC: new FormControl(this.data.firstEdition.bC),
      location: new FormControl(this.data.firstEdition.location, { validators: [Validators.required] }),
      year: new FormControl(this.data.firstEdition.year)
    });
    this.formCe = new FormGroup({
      century: new FormControl(this.data.currentEdition.century, { validators: [Validators.required] }),
      bC: new FormControl(this.data.currentEdition.bC),
      location: new FormControl(this.data.currentEdition.location, { validators: [Validators.required] }),
      year: new FormControl(this.data.currentEdition.year)
    });
    this.bookForm = new FormGroup(
      {
        title: new FormControl(this.data.title, { validators: [Validators.required] }),
        author: new FormControl(this.data.author, { validators: [Validators.required] }),
        pages: new FormControl(this.data.pages, { validators: [Validators.required] }),
        lang: new FormControl(this.data.lang, { validators: [Validators.required] }),
        abstract: new FormControl(this.data.abstract, { validators: [Validators.required] }),
        firstEdition: this.formFe,
        currentEdition: this.formCe,
        reference: new FormControl(this.data.reference, { validators: [Validators.required] }),
        source: new FormControl(this.data.source, { validators: [Validators.required] }),
        notes: new FormControl(this.data.notes, { validators: [Validators.required] }),
        accessId:new FormControl(this.data.accessId, { validators: [Validators.required] }),
        protectedByC: new FormControl(this.data.protectedByC, {}),
        
      }, { updateOn: "blur" },
      CustomValidators.mustMatch('password', 'passwordConfirm')
    );
    this.bookForm.value.tags=this.data.tags;
  }

  logError(key: string, value: any) {
    const error = {
      required: "This fields is required",
      email: "The format of the email entered is not valid!",
      minlength: "The entered value is too short. Required lenght is  min : " + value?.requiredLength,
      maxlength: "The entered value is too long. Required lenght is  max : " + value?.requiredLength,
      mustMatch: "Password and confirm not match"
    }
    return error[key];
  }

  save() {
    this.submitted = true;
    console.log(this.bookForm, this.bookForm.status, this.update);
    if (this.bookForm.status == 'VALID') {
      if(!this.bookForm.value.tags){this.bookForm.value.tags=this.data.tags.map(x=>x.label)}
      this.dialogRef.close(
        {
          data: this.data,
          form: this.bookForm.value
        }
      )
    }
  }

  setTags(event){
    this.bookForm.value.tags=event
  }

  close() {
    this.dialogRef.close();
  }

}
