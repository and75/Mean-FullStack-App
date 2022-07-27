import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, Input, EventEmitter, Output,  OnChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {TagService } from '../tag.service';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnChanges {
  
  @Input() label:string;
  @Input() placeholder:string;
  @Input() tags:any[];
  @Output() outTag = new EventEmitter<string[]>();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTags: Observable<string[]>;
  allTags: string[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  constructor(private service: TagService) {
    this.getTags();
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );
  }

  ngOnChanges(){
    if(!this.tags) this.tags = [];
    else{
      this.tags = this.tags.map(x=>x.label);
    }
  }

  getTags(){
    console.log('getTags')
    this.service.find(true).subscribe((res:any) => {
      console.log('finded Tag',res);
      if (res.succes == true) {
        this.allTags = res.payload.data;
      }
    })
  }

  sendTags(){
    this.outTag.emit(this.tags);
  }

  add(event: MatChipInputEvent): void {

    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push(value);
    }

    this.sendTags();

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log(event.option.viewValue);
    this.tags.push(event.option.viewValue);
    console.log(this.tags);
    this.sendTags();
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

}
