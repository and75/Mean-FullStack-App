/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { Component, OnInit, OnDestroy,  forwardRef, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthorService } from '../../author/author.service';
import { Author } from 'src/app/_models/author';


@Component({
  selector: 'app-author-input',
  templateUrl: './author-input.component.html',
  styleUrls: ['./author-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() =>AuthorInputComponent)
    }
  ]
})

export class AuthorInputComponent implements OnInit, OnDestroy, ControlValueAccessor {

  authors:any = [];
  touched:boolean;
  filtered: Observable<any[]>;
  formControl = new FormControl();
  chipsFormControl =new FormControl(null,{validators:[Validators.required]});
  finded: Author[] = []
  separatorKeysCodes: number[] = [ENTER, COMMA];
  subscription:Subscription;

  @ViewChild('authorInput') authorInput: ElementRef<HTMLInputElement>;

  constructor( private service: AuthorService) { 
    this.filtered = this.formControl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => (value ? this._filter(value) : this.finded.slice())),
    );
  }

  //ControlValueAccessor implements methods
  onChange = (authors: any) => {};

  onTouched = () => { };

  writeValue(value: any) {
    this.authors = (value) ? value : [] ; 
    this.setChipsCtrl(); 
  }

  registerOnChange(fn: any) {
    this.onChange = fn
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  set outputValue(value:Author[]){
    console.log('Set OutputValue')
    this.setChipsCtrl(); 
    this.onChange(value);
    this.onTouched();
  }

  //Components Author methods
  ngOnInit(){
    console.log('ngOnInit->AuthorInputComponent')
    if(!this.authors) this.authors = [];
    this.getAuthors();
    this.writeValue(this.authors);
  }

  ngOnDestroy(){
    console.log('ngOnDestroy->AuthorInputComponent')
    this.subscription.unsubscribe;
  }

  setChipsCtrl(){  
    let value = (this.authors.length > 0) ? this.authors.length : null;
    this.chipsFormControl.setValue(value);
    console.log('setChipsCtrl', this.authors.length, value)
  }

  getAuthors() {
    this.subscription = this.service.getAll().subscribe((res: any) => {
      if (res.succes == true) {
        this.finded = res.payload.data;
      }
    })
  }

  add(event: MatChipInputEvent): void {
    this.markAsTouched();
    const value = (event.value || '').trim();
    if (value) {
      const newAuthor = {_id:'new', fullname:value};
      this.authors.push(newAuthor);
    }
    this.outputValue = this.authors;
    event.chipInput!.clear();
    this.formControl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.markAsTouched();
    if(!this.authors) this.authors = [];
    this.authors.push(event.option.value);
    this.outputValue = this.authors;
    this.authorInput.nativeElement.value = '';
    this.formControl.setValue(null);
  }

  remove(author: string): void {
    this.markAsTouched();
    const index = this.authors.indexOf(author);
    if (index >= 0) {this.authors.splice(index, 1)}
    this.outputValue = this.authors;
  }


  private _filter(value: string): Author[] {
    if (value && typeof value == 'string') {
      const filterValue = value.toLowerCase();
      return this.finded.filter(author => author.fullname.toLowerCase().includes(filterValue));
    }
  }

}
