/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
 import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
 import { AuthorService } from '../author.service';
 import { AlertService } from '../../alerts/alert.service';
 import { MatPaginator } from '@angular/material/paginator';
 import { MatSort } from '@angular/material/sort';
 import { MatTableDataSource } from '@angular/material/table';
 import { MatDialog } from '@angular/material/dialog';
 import { AuthorFormComponent } from './../author-form/author-form.component'
 import { Author } from '../../_models/author';
 import { Language } from 'src/app/_models/lang';
 import { ConfirmDialogComponent } from '../../schared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss']
})
export class AuthorListComponent implements OnInit, AfterViewInit{

  author: Author[] = null;
  displayedColumns: string[] = ['avatar','fullname', 'birthDate', 'deathDate', 'owner', 'updated', 'menu'];
  languages = new Language();

  public filterValue: string = '';
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private authorService: AuthorService,
    private alertService: AlertService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.getData();
  }

  getData() {
    this.authorService.getAll().subscribe((res:any) => {
      if (res.succes == true) {
        this.author = res.payload.data;
        this.dataSource = new MatTableDataSource(this.author);
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
    const addDialog = this.dialog.open(AuthorFormComponent);
    addDialog.afterClosed().subscribe(result => {
      if (result) {
        this.authorService.add(result.form).subscribe(res => {
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
    const addDialog = this.dialog.open(AuthorFormComponent, {
      data: row
    });
    addDialog.afterClosed().subscribe(result => {
      if (result) {
        this.authorService.update(result.data._id, result.form).subscribe(res => {
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
        this.authorService.delete(row._id).subscribe((res: any) => {
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
