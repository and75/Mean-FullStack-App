/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { OnChanges, SimpleChanges, AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomValidators } from '../../_providers/CustomValidators';
import { Book, BookModel } from '../../_models/book';
import { Language } from 'src/app/_models/lang';
import { AccessIds } from 'src/app/_models/accessIds';
import { BookService } from '../book.service';
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit, OnChanges, AfterViewInit {

  submitted: boolean = false;
  bookForm: FormGroup;
  formFe: FormGroup;
  formCe: FormGroup;
  formDgSrc: FormGroup;
  update: boolean = false;
  languages: Language = new Language();
  accessIds: AccessIds = new AccessIds();

  tagInputLabel: string = "Tags";
  tagInputPlaceholder: string = "New tag...";

  authorsInputLabel: string = "Authors";
  authorsInputPlaceholder: string = "New author...";
  authorsValid: boolean;

  default: Book = new Book();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BookModel,
    private dialogRef: MatDialogRef<BookFormComponent>,
    private service: BookService
  ) {

  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit->BookFormComponent');
  }

  ngOnChanges(changes: SimpleChanges) { }

  ngOnInit() {
    console.log('ngOnInit->BookFormComponent')
    if (!this.data) {
      this.data = this.default;
    } else {
      this.getContent();
      this.update = true;
    }
    console.log('ngOnInit->BookFormComponent', this.data)
    this.setForm();
  }

  getContent() {
    this.service.getBook(this.data._id).subscribe((res): any => {
      if (res.succes == true) {
        this.data = new Book(res.payload.data);
        this.setForm();
      }
    })
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

  get fDSrc(){
    return this.formDgSrc.controls;
  }

  setForm() {
    this.formFe = new FormGroup({
      century: new FormControl(this.data.firstEdition.century),
      bC: new FormControl(this.data.firstEdition.bC),
      location: new FormControl(this.data.firstEdition.location),
      year: new FormControl(this.data.firstEdition.year)
    });
    this.formCe = new FormGroup({
      century: new FormControl(this.data.currentEdition.century, { validators: [Validators.required] }),
      bC: new FormControl(this.data.currentEdition.bC),
      location: new FormControl(this.data.currentEdition.location, { validators: [Validators.required] }),
      year: new FormControl(this.data.currentEdition.year)
    });
    this.formDgSrc = new FormGroup({
      label: new FormControl(this.data.digitalSource.label, { validators: [Validators.required] }),
      url: new FormControl(this.data.digitalSource.url, { validators: [Validators.required] }),
    });
    this.bookForm = new FormGroup({
      title: new FormControl(this.data.title, { validators: [Validators.required] }),
      //author:new FormControl('', { validators : [Validators.required]}),
      authors: new FormControl(this.data.authors, { validators: [Validators.required] }),
      pages: new FormControl(this.data.pages, { validators: [Validators.required] }),
      lang: new FormControl(this.data.lang, { validators: [Validators.required] }),
      abstract: new FormControl(this.data.abstract),
      firstEdition: this.formFe,
      currentEdition: this.formCe,
      reference: new FormControl(this.data.reference, { validators: [Validators.required] }),
      digitalSource: new FormControl(this.data.digitalSource, { validators: [Validators.required] }),
      notes: new FormControl(this.data.notes),
      accessId: new FormControl(this.data.accessId, { validators: [Validators.required] }),
      protectedByC: new FormControl(this.data.protectedByC, {}),
      tags: new FormControl(this.data.tags)
    }, { updateOn: "blur" },
      CustomValidators.mustMatch('password', 'passwordConfirm')
    );
  }

  resetForm() {
    this.bookForm.reset()
  }

  logError(key: string, value: any) {
    const error = {
      required: "This fields is required",
      minlength: "The entered value is too short. Required lenght is  min : " + value?.requiredLength,
      maxlength: "The entered value is too long. Required lenght is  max : " + value?.requiredLength,
    }
    return error[key];
  }

  save() {
    this.submitted = true;
    console.log(this.bookForm.status, this.bookForm.value, this.bookForm, this.f.authors)
    if (this.bookForm.status == 'VALID') {
      this.dialogRef.close(
        {
          data: this.data,
          form: this.bookForm.value
        }
      )
    }
  }

  close() {
    this.dialogRef.close();
  }

}
