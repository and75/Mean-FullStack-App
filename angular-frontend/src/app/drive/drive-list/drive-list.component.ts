import { OnInit, AfterViewInit, Component, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DriveService } from '../drive.service';
import { AlertService } from '../../alerts/alert.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DriveFormComponent } from './../drive-form/drive-form.component';
import { DriveViewComponent } from './../drive-view/drive-view.component';
import { DriveModel, Drive } from '../../_models/drive';
import { ConfirmDialogComponent } from '../../schared/confirm-dialog/confirm-dialog.component';
import { FileUploadComponent } from 'src/app/schared/file-upload/file-upload.component';

@Component({
  selector: 'app-drive-list',
  templateUrl: './drive-list.component.html',
  styleUrls: ['./drive-list.component.scss']
})
export class DriveListComponent implements OnInit, AfterViewInit, OnDestroy {

  drive: DriveModel[] = null;
  subscriptions:Subscription[] = [];
  displayedColumns: string[] = ['avatar', 'title', 'owner', 'mimetype', 'size', 'updated', 'relationschip','enable', 'menu'];

  public filterValue: string = '';
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private driveService: DriveService,
    private alertService: AlertService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.getData();
  }

  ngOnDestroy():void{
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  getData() {
    this.subscriptions.push(
      this.driveService.getDrivers().subscribe((res: any) => {
        if (res.succes == true) {
          this.drive = res.payload.data;
          console.log(this.drive);
          this.dataSource = new MatTableDataSource(this.drive);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      })
    );
  }

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(row: any) {
    let mess = `Are you sure you want to delete the file: ${row.title} ?\n`;
    if(row.relationschip && row.relationschip.length>0){
      mess += `This file is associated with the following contents:\n\n`;
      row.relationschip.forEach((element)=>{
            mess += `- ${element.type} / ${element.label} \n`;
      })
      mess += `\nIf the file is deleted the association will be deleted`;
    }
    const deleteDialog = this.dialog.open(ConfirmDialogComponent, {
      data: mess
    });
    deleteDialog.afterClosed().subscribe(result => {
      console.log('afterClosed',result);
      if (result === true) {
        this.driveService.deleteDrive(row._id).subscribe((res: any) => {
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

  view(row: DriveModel) {
    const uploadDialog = this.dialog.open(DriveViewComponent, {
      width: '800px',
      height: '600px',
      data: row
    });
  }

  edit(row:DriveModel) {
    const uploadDialog = this.dialog.open(FileUploadComponent, {
      data: {
        type: 'Drive',
        old : row._id
      }
    });
  }

}
