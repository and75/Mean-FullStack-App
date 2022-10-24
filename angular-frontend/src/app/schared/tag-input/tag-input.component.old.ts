import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, ViewChild, Input, EventEmitter, Output,  OnChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {TagService } from '../../tag/tag.service';
import {Tag} from '../../_models/tag';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnChanges {
  
  @Input() label:string;
  @Input() placeholder:string;
  @Input() tags:Tag[];
  @Output() outTag = new EventEmitter<Tag[]>();
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTags: Observable<Tag[]>;
  allTags: Tag[] = [];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;

  constructor(private service:TagService) {
    this.getTags();
    if(!this.tags) this.tags = [];
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag:string|null) =>{ 
        //(tag ? this._filter(tag): this.allTags.slice())
        if(tag){return  this._filter(tag);}
      })
    );

  }

  ngOnChanges(){
    if(!this.tags) this.tags = [];
  }

  getTags(){
    this.service.find(true).subscribe((res:any) => {
      if (res.succes == true) {
        this.allTags = res.payload.data;
      }
    })
  }

  addTags(value:string){

    let find =this.allTags.find(element=>{
      return element.label.toLowerCase() === value.toLowerCase()
    });
    if(!find){
      find = new Tag();
      find.label = value;
    }

    // Add our tag
    if (value) {
      this.tags.push(find);
    }
    this.sendTags();

  }

  addFromChips(event: MatChipInputEvent): void {

    const value = (event.value || '').trim();
    if(!value) return;

    this.addTags(value);

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  remove(tag: Tag): void {
    const index = this.tags.findIndex(el=>el.label=tag.label);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.value);
    this.sendTags();
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  sendTags(){
    this.outTag.emit(this.tags);
  }

  private _filter(value: string | Tag) {
    let filterValue = ''
    let ret = null;
    if(typeof value=='object'){
      filterValue = value.label.toLowerCase();
    } else{
      filterValue = value.toLowerCase();
      ret = this.allTags.filter(tag => {
        if(tag.label.toLowerCase().includes(filterValue)){
          return true;
        }
      });
    }
    return ret
  }

}
