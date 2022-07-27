import { Component, OnInit, Inject } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SharedService } from '../shared.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '../../alerts/alert.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  currentFile?: File;
  progress = 0;
  message = '';
  fileName:string;
  fileSize:string;
  fileType:string;
  fileInfos?: Observable<any>;

  constructor(
    private sharedService: SharedService,
    private alertService:AlertService,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<FileUploadComponent>) {
      console.log(this.data)
     }

  ngOnInit() {

  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
      this.fileSize = this.formatBytes(this.currentFile.size);
      this.fileType = this.currentFile.type;
      console.log(this.currentFile)
    }
  }

  upload(): void {
    this.progress = 0;
    this.message = "";
    if (this.currentFile) {
      this.sharedService.driveUpload(this.currentFile, this.data).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            if (event.body.succes) {
              this.alertService.success(event.body.mess, { 'keepAfterRouteChange': false, 'autoClose': true, 'spinner': false })
              this.dialogRef.close();
            } else {
              this.alertService.error(event.body.mess, { 'keepAfterRouteChange': false, 'autoClose': true, 'spinner': false })
            }
          }
        },
        (err: any) => {
          console.log(err);
          this.progress = 0;
          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }
          this.currentFile = undefined;
          this.alertService.error(this.message, { 'keepAfterRouteChange': false, 'autoClose': true, 'spinner': false })
        });
    }
  }
  close() {
    this.dialogRef.close();
  }
}
