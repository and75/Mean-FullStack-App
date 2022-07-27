/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { BookService } from '../book.service';
import { AlertService } from '../../alerts/alert.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BookFormComponent } from './../book-form/book-form.component'
import { BookModel } from '../../_models/book';
import { Language } from 'src/app/_models/lang';
import { ConfirmDialogComponent } from '../../schared/confirm-dialog/confirm-dialog.component';
import { FileUploadComponent } from 'src/app/schared/file-upload/file-upload.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, AfterViewInit {

  book: BookModel[] = null;
  displayedColumns: string[] = ['avatar','title', 'author', 'pages', 'lang', 'pdf', 'owner', 'updated', 'enable', 'menu'];
  languages = new Language();

  public filterValue: string = '';
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private bookService: BookService,
    private alertService: AlertService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.getData();
  }

  getData() {
    this.bookService.getBooks().subscribe((res:any) => {
      console.log(res);
      if (res.succes == true) {
        this.book = res.payload.data;
        this.dataSource = new MatTableDataSource(this.book);
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

  addBook() {
    const addDialog = this.dialog.open(BookFormComponent);
    addDialog.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.addBook(result.form).subscribe(res => {
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
    const addDialog = this.dialog.open(BookFormComponent, {
      data: row
    });
    addDialog.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.updateBook(result.data._id, result.form).subscribe(res => {
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
      data: `Are you sure you want to delete the user: ${row.firstName} ${row.lastName}?`
    });
    deleteDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.bookService.deleteBook(row._id).subscribe((res: any) => {
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

  uploadPDF(row){
    console.log(row._id);
    const uploadDialog = this.dialog.open(FileUploadComponent, {
      data: {
        type:'Book',
        id: row._id,
        protectedByC:row.protectedByC,
        owner: row.owner._id,
        old:row.pdf
      }
    });
  }
}
