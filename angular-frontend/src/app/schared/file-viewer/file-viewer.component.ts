import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { SharedService } from '../shared.service'
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { DriveModel } from 'src/app/_models/drive';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss']
})
export class FileViewerComponent implements OnInit, OnChanges, OnDestroy {

  @Input() data:DriveModel;
  public fileData:Blob=null;
  private subscriptions:Subscription[]=[];
  progress:any = null;
  private ApiServiceUrl = `${environment.apiUrl}`;
  urlPdf:string;


  constructor(
    private service:SharedService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges():void{
    if(this.data!==undefined && !this.fileData){
      this.download(this.data);
    }
  }

  ngOnDestroy(): void {
    this.cleanData();
  }

  cleanData(){
    console.info('FileViewerComponent -- Clean File Data and Subscription');
    this.fileData = null;
    if(this.subscriptions.length>0){
      this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    }
  }

  download(data:any){
    this.subscriptions.push(this.service.driveDownload(data._id).subscribe(
      (event: HttpEvent<any>) => {
  
        switch (event.type) {
          case HttpEventType.Sent:
            //console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            //console.log('Response header has been received!');
            break;
          case HttpEventType.DownloadProgress:
            this.progress = Math.round(event.loaded / this.data.size * 100);
            //console.log(`Dowloaded .. ${this.progress}%`);
            break;
          case HttpEventType.Response:
            //console.log('User successfully created!', event.body);
            setTimeout(() => {
              this.progress = 0;
              this.fileData  = event.body;
              //console.log(this.fileData);
            }, 1500);
        }
      }   
    ));
  }
}
