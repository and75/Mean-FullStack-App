import {Component, Input, ViewChild, AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { SharedService } from '../shared.service';
import { Activity } from 'src/app/_models/activity';

@Component({
  selector: 'app-activity-view',
  templateUrl: './activity-view.component.html',
  styleUrls: ['./activity-view.component.scss']
})
export class ActivityViewComponent implements AfterViewInit {
  
  @Input() subject:string = 'all';
  @Input() limit:number=6;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() filter:any = {};

  data:any;

  constructor(private service:SharedService) { }

  ngAfterViewInit() {

    
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.service!.activityGetAll(
            (this.paginator.pageIndex*this.limit), this.limit, this.subject
          ).pipe(catchError(() => observableOf(null)));
        }),
        map(res => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = res.payload.data === null;
          console.log('Data : ', res.payload)
          if (res.succes === false) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = res.payload.count //data.total_count;
          return res.payload.data;
        }),
      )
      .subscribe(data => (this.data = data));
  }

  ngOnInit(): void {
    console.log('ngOnInit->ActivityViewComponent', this.filter)
    //this.getData();
  }

  getData(){
    /*this.service.activityGetAll().subscribe((res:any) => {
      if (res.succes == true) {
        this.data = res.payload.data;
        console.log(this.data);
      }
    })*/
  }

  



}
