import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { VocabularyService } from '../vocabulary.service';
import { AlertService } from '../../alerts/alert.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { VocabularyViewComponent } from './../vocabulary-view/vocabulary-view.component'
import { VocabularyFormComponent } from './../vocabulary-form/vocabulary-form.component'
import { Vocabulary } from '../../_models/vocabulary';
import { Language } from 'src/app/_models/lang';
import { ConfirmDialogComponent } from '../../schared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-vocabulary-list',
  templateUrl: './vocabulary-list.component.html',
  styleUrls: ['./vocabulary-list.component.scss']
})
export class VocabularyListComponent implements OnInit, AfterViewInit {

  tag: Vocabulary[] = null;
  displayedColumns: string[] = ['avatar', 'el','la', 'de', 'en', 'fr', 'it', 'owner', 'updated', 'menu'];
  languages = new Language();

  public filterValue: string = '';
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private service: VocabularyService,
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
    const addDialog = this.dialog.open(VocabularyFormComponent, {width: '400px',height: '650px'});
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
    const addDialog = this.dialog.open(VocabularyFormComponent, {
      data  : row,
      width : '400px',
      height: '650px'
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
      data: `Are you sure you want to delete the term: ${row.el} / ${row.la} / ${row.de} ... ?`
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

  view(row:Vocabulary){
    const addDialog = this.dialog.open(VocabularyViewComponent, {
      data: row,
      width: '800px',
      height: '600px'
    });
  }

}
