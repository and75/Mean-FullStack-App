/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
 import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
 import { TagService } from '../tag.service';
 import { AlertService } from '../../alerts/alert.service';
 import { MatPaginator } from '@angular/material/paginator';
 import { MatSort } from '@angular/material/sort';
 import { MatTableDataSource } from '@angular/material/table';
 import { MatDialog } from '@angular/material/dialog';
 import { TagViewComponent } from './../tag-view/tag-view.component'
 import { TagFormComponent } from './../tag-form/tag-form.component'
 import { TagModel } from '../../_models/tag';
 import { Language } from 'src/app/_models/lang';
 import { ConfirmDialogComponent } from '../../schared/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit,AfterViewInit {

  tag: TagModel[] = null;
  displayedColumns: string[] = ['avatar', 'label', 'translations', 'owner', 'updated', 'menu'];
  languages = new Language();

  public filterValue: string = '';
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private service: TagService,
    private alertService: AlertService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.getData();
  }

  getData() {
    this.service.getAll().subscribe((res:any) => {
      if (res.succes == true) {
        this.tag = res.payload.data;
        this.dataSource = new MatTableDataSource(this.tag);
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
    const addDialog = this.dialog.open(TagFormComponent, {width: '600px',height: '300px'});
    addDialog.afterClosed().subscribe(result => {
      if (result) {
        this.service.add(result.form).subscribe(res => {
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
    const addDialog = this.dialog.open(TagFormComponent, {
      data: row,
      width: '600px',
      height: '300px'
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
    const deleteDialog = this.dialog.open(ConfirmDialogComponent, {
      data: `Are you sure you want to delete the tag:\n\n ${row.label} \n ${row.url}?`
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

  view(row:TagModel){
    const addDialog = this.dialog.open(TagViewComponent, {
      data: row,
      width: '800px',
      height: '600px'
    });
  }
}
