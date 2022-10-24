/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { Component, OnInit, OnDestroy, Input, forwardRef, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import { TagService } from '../../tag/tag.service';
import { Tag } from 'src/app/_models/tag';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() =>TagInputComponent)
    }
  ]
})
export class TagInputComponent implements OnInit, OnDestroy, ControlValueAccessor {

  tags:any[] = [];
  finded: Tag[] = []
  touched:boolean;
  filtered: Observable<any[]>;
  formControl = new FormControl();
  chipsFormControl =new FormControl(null,{validators:[Validators.required]});
  separatorKeysCodes: number[] = [ENTER, COMMA];
  subscription:Subscription;

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @Input() label:string= '';

  constructor( private service: TagService) { 
    this.filtered = this.formControl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => (value ? this._filter(value) : this.finded.slice())),
    );
  }

  //ControlValueAccessor implements methods
  onChange = (authors: any) => {};

  onTouched = () => { };

  writeValue(value: any) {
    this.tags = (value) ? value : [] ; 
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

  set outputValue(value:Tag[]){
    console.log('Set OutputValue')
    this.setChipsCtrl(); 
    this.onChange(value);
    this.onTouched();
  }

  //Components Author methods
  ngOnInit(){
    console.log('ngOnInit->AuthorInputComponent')
    if(!this.tags) this.tags = [];
    this.getAuthors();
    this.writeValue(this.tags);
  }

  ngOnDestroy(){
    console.log('ngOnDestroy->AuthorInputComponent')
    this.subscription.unsubscribe;
  }

  setChipsCtrl(){  
    let value = (this.tags.length > 0) ? this.tags.length : null;
    this.chipsFormControl.setValue(value);
    console.log('setChipsCtrl', this.tags.length, value)
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
      const newTag = {_id:'new', label:value};
      this.tags.push(newTag);
    }
    this.outputValue = this.tags;
    event.chipInput!.clear();
    this.formControl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.markAsTouched();
    if(!this.tags) this.tags = [];
    this.tags.push(event.option.value);
    this.outputValue = this.tags;
    this.tagInput.nativeElement.value = '';
    this.formControl.setValue(null);
  }

  remove(author: string): void {
    this.markAsTouched();
    const index = this.tags.indexOf(author);
    if (index >= 0) {this.tags.splice(index, 1)}
    this.outputValue = this.tags;
  }

  private _filter(value: string): Tag[] {
    if (value && typeof value == 'string') {
      const filterValue = value.toLowerCase();
      return this.finded.filter(author => author.label.toLowerCase().includes(filterValue));
    }
  }


}
