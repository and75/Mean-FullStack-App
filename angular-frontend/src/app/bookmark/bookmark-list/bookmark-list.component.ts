/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
 import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
 import { BookmarkService } from '../bookmark.service';
 import { AlertService } from '../../alerts/alert.service';
 import { MatPaginator } from '@angular/material/paginator';
 import { MatSort } from '@angular/material/sort';
 import { MatTableDataSource } from '@angular/material/table';
 import { MatDialog } from '@angular/material/dialog';
 import { BookmarkViewComponent } from './../bookmark-view/bookmark-view.component'
 import { BookmarkFormComponent } from './../bookmark-form/bookmark-form.component'
 import { BookmarkModel } from '../../_models/bookmark';
 import { Language } from 'src/app/_models/lang';
 import { ConfirmDialogComponent } from '../../schared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss']
})
export class BookmarkListComponent implements OnInit {

  bookmark: BookmarkModel[] = null;
  displayedColumns: string[] = ['avatar', 'label', 'url', 'owner', 'updated', 'enable', 'menu'];
  languages = new Language();

  public filterValue: string = '';
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private service: BookmarkService,
    private alertService: AlertService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.getData();
  }

  getData() {
    this.service.getAll().subscribe((res:any) => {
      console.log(res);
      if (res.succes == true) {
        this.bookmark = res.payload.data;
        this.dataSource = new MatTableDataSource(this.bookmark);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  add() {
    const addDialog = this.dialog.open(BookmarkFormComponent);
    addDialog.afterClosed().subscribe(result => {
      if (result) {
        this.service.add(result.form).subscribe(res => {
          console.log(res);
          if (res.success) {
            this.getData();
            this.alertService.success(res.mess, { 'keepAfterRouteChange': false, 'autoClose': true, 'spinner': false })
          } else {
            this.alertService.error(res.mess, { 'keepAfterRouteChange': false, 'autoClose': true, 'spinner': false })
          }
        })
      }
    });
  }

  edit(row) {
    const addDialog = this.dialog.open(BookmarkFormComponent, {
      data: row
    });
    addDialog.afterClosed().subscribe(result => {
      if (result) {
        this.service.update(result.data._id, result.form).subscribe(res => {
          if (res.succes) {
            this.getData();
            this.alertService.success(res.mess, { 'keepAfterRouteChange': true, 'autoClose': true, 'spinner': false })
          } else {
            this.alertService.error(res.mess, { 'keepAfterRouteChange': false, 'autoClose': true, 'spinner': false })
          }
        })
      }
    });
  }

  delete(row: any) {
    console.log(row._id);
    const deleteDialog = this.dialog.open(ConfirmDialogComponent, {
      data: `Are you sure you want to delete the bookmark:\n\n ${row.label} \n ${row.url}?`
    });
    deleteDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.service.delete(row._id).subscribe((res: any) => {
          if (res.succes) {
            this.getData();
            this.alertService.success(res.mess, { 'keepAfterRouteChange': false, 'autoClose': true, 'spinner': false })
          } else {
            this.alertService.error(res.mess, { 'keepAfterRouteChange': false, 'autoClose': true, 'spinner': false })
          }
        })
      }
    })
  }

  view(row:BookmarkModel){
    const addDialog = this.dialog.open(BookmarkViewComponent, {
      data: row,
      width: '800px',
      height: '600px'
    });
  }
}
