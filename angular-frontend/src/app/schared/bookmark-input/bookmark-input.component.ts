
import { Component, OnInit, forwardRef } from '@angular/core';
import { FormControl, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Bookmark } from 'src/app/_models/bookmark';
import { BookmarkService } from 'src/app/bookmark/bookmark.service';
import { Author } from 'src/app/_models/author';

@Component({
  selector: 'app-bookmark-input',
  templateUrl: './bookmark-input.component.html',
  styleUrls: ['./bookmark-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => BookmarkInputComponent)
    }
  ]
})
export class BookmarkInputComponent implements OnInit, ControlValueAccessor {


  constructor(private service: BookmarkService) {}

  bookmarks: Bookmark[] = [];
  filteredOptions: Observable<Bookmark[]>;
  formGroup:FormGroup = new FormGroup({
    label: new FormControl(null, { validators: [Validators.required]}),
    url: new FormControl(null, { validators: [Validators.required]}),
  });
  formControl = this.formGroup.get('label');
  formControlUrl = this.formGroup.get('url');

  valUrl:string = null;
  
  onChange: any = () => { }

  onTouch: any = () => { }

  outValue = function(label:string=null, url:string=null) {
    label = (label) ? label : this.formControl.value;
    url = (url) ? url : this.formControlUrl.value;
    let out = {
      label:label,
      url:url
    }
    this.onChange(out)
    this.onTouch(out)
  }

  ngOnInit(): void {
    this.getBookmarks();
    this.filteredOptions = this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.label;
        return name ? this._filter(name as string) : this.bookmarks.slice();
      }),
    );
  }

  getBookmarks(){
    this.service.getAll().subscribe((res: any) => {
      if (res.succes == true) {
        this.bookmarks = res.payload.data;
      }
    })
  }

  writeValue(obj: any): void {
    console.log("BookmarkInputComponent->writeValue", obj)
    this.formControl.setValue(obj)
    this.formControlUrl.setValue(obj.url)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn
  }

  displayFn(bookmark:Bookmark){
    return bookmark && bookmark.label ? bookmark.label : '';
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.formControlUrl.setValue(event.option.value.url);
    this.outValue(event.option.value.label,event.option.value.url) 
  }

  setOutput(){
    this.outValue(null, null);
  }

  private _filter(value: string): Bookmark[] {
    const filterValue = value.toLowerCase();
    if(filterValue.length>2){
      console.log('filterValue', filterValue )
      return this.bookmarks.filter(option => option.label.toLowerCase().includes(filterValue));
    }
  }

}
