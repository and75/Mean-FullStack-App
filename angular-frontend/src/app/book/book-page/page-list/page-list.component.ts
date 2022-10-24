/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
 import { OnInit, Component, ViewChild, OnChanges, SimpleChanges, Input } from '@angular/core';
 import { BookPageService } from '../book-page.service';
 import { AlertService } from '../../../alerts/alert.service';
 import { MatPaginator } from '@angular/material/paginator';
 import { MatSort } from '@angular/material/sort';
 import { MatTableDataSource } from '@angular/material/table';
 import { MatDialog } from '@angular/material/dialog';
 import { PageFormComponent } from './../page-form/page-form.component'
 import { Page } from '../../../_models/page';
 import { ConfirmDialogComponent } from '../../../schared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit,OnChanges {

  @Input() bookId:string;
  page: Page[] = null;
  displayedColumns: string[] = ['avatar','page', 'author', 'owner', 'created', 'enable', 'menu'];

  public filterValue: string = '';
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private pageService: BookPageService,
    private alertService: AlertService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getData();
  }

  getData() {
    this.pageService.getPages(this.bookId).subscribe((res:any) => {
      if (res.succes == true) {
        this.page = res.payload.data;
        this.dataSource = new MatTableDataSource(this.page);
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
    const addDialog = this.dialog.open(PageFormComponent);
    addDialog.afterClosed().subscribe(result => {
      if (result) {
        this.pageService.addPage(this.bookId, result.form).subscribe(res => {
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
    const addDialog = this.dialog.open(PageFormComponent, {
      data: row
    });
    addDialog.afterClosed().subscribe(result => {
      if (result) {
        this.pageService.updatePage(result.data._id, result.form).subscribe(res => {
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
      data: `Are you sure you want to delete the user: ${row.firstName} ${row.lastName}?`
    });
    deleteDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.pageService.deletePage(row._id).subscribe((res: any) => {
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
}
