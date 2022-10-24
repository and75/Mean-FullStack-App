import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { SharedService } from '../shared.service';
import { AlertService } from '../../alerts/alert.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import { Comment } from 'src/app/_models/comment';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.scss']
})
export class CommentViewComponent implements OnInit, OnChanges {

  @Input() relObject:any;
  @Input() relType:any;
  data:Comment[];
  comment:Comment= new Comment()
  submitted: boolean = false;
  form: FormGroup;
  
  constructor(
    private service:SharedService, 
    private alertService:AlertService,
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.setForm();
  }

  ngOnChanges() {
    this.getData();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }
  

  setForm() {
    this.submitted = false;
    this.form = null;
    this.form = new FormGroup(
      {
        text: new FormControl(this.comment.text, { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(200)] })
      }, { updateOn: "blur" }
    );
  }

  logError(key: string, value: any) {
    const error = {
      required: "This fields is required",
      minlength: "The entered value is too short. Required lenght is  min : " + value?.requiredLength,
      maxlength: "The entered value is too long. Required lenght is  max : " + value?.requiredLength,
    }
    return error[key];
  }

  getData(){
    this.service.commentGetAll(this.relObject).subscribe((res:any) => {
      if (res.succes == true) {
        this.data = res.payload.data;
      }
    })
  }

  add(data:any){
    this.service.commentAdd(data).subscribe((res:any) => {
      if (res.success) {
        this.getData();
        this.alertService.success(res.mess, { 'keepAfterRouteChange': false, 'autoClose': true, 'spinner': false })
      } else {
        this.alertService.error(res.mess, { 'keepAfterRouteChange': false, 'autoClose': true, 'spinner': false })
      }
    })
  }

  delete(row:any){
    const deleteDialog = this.dialog.open(ConfirmDialogComponent, {
      data: `Are you sure you want to delete the comment:\n\n ${row.text} ?`
    });
    deleteDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.service.commentDelete(row._id).subscribe((res: any) => {
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

  save() {
    this.submitted = true;
    console.log(this.form.status, this.form);
    if (this.form.status == 'VALID') {
      const comment = {
        text : this.form.value.text,
        relObject : this.relObject,
        relType: this.relType
      }
      this.add(comment)
    }
  }
}
