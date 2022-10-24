/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
import { OnChanges, SimpleChanges, Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import custom validator  class
import { CustomValidators } from './../../_providers/CustomValidators';
import { UserService } from '../user.service';
import { User, UserModel } from './../../_models/user';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnChanges {

  submitted: boolean = false;
  userForm: FormGroup;
  update: boolean = false;
  default: User = {
    _id: "",
    username: "",
    firstName: "",
    lastName: "",
    istitution: "",
    presentation: "",
    email: "",
    password: "",
    avathar: "",
    enable: true,
    role: "guest",
  }
  roles: string[] = ['admin', 'guest', 'team'];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserModel,
    private dialogRef: MatDialogRef<UserFormComponent>,
    private UserService: UserService) {
    if (!this.data) {
      this.data = this.default;
    } else {
      this.update = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) { }

  ngOnInit() {
    this.setForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.userForm.controls;
  }

  setForm() {
    this.submitted = false;
    this.userForm = null;
    this.userForm = new FormGroup(
      {
        firstName: new FormControl(this.data.firstName, { validators: [Validators.required] }),
        lastName: new FormControl(this.data.lastName, { validators: [Validators.required] }),
        email: new FormControl(this.data.email, { validators: [Validators.required, Validators.email] }),
        istitution: new FormControl(this.data.istitution, { validators: [Validators.required] }),
        presentation: new FormControl(this.data.presentation, { validators: [Validators.minLength(6), Validators.maxLength(300)] }),
        password: new FormControl('', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(12)] }),
        passwordConfirm: new FormControl('', { validators: [Validators.required, Validators.minLength(6), Validators.maxLength(12)] }),
        role: new FormControl(this.data.role, { validators: [Validators.required], updateOn: "change" }),
      }, { updateOn: "blur" },
      CustomValidators.mustMatch('password', 'passwordConfirm')
    );
  }

  logError(key: string, value: any) {
    const error = {
      required: "This fields is required",
      email: "The format of the email entered is not valid!",
      minlength: "The entered value is too short. Required lenght is  min : " + value?.requiredLength,
      maxlength: "The entered value is too long. Required lenght is  max : " + value?.requiredLength,
      mustMatch: "Password and confirm not match"
    }
    return error[key];
  }

  save() {
    this.submitted = true;
    console.log(this.userForm, this.userForm.status, this.update);
    if (this.userForm.status == 'VALID') {
      this.dialogRef.close(
        {
          data: this.data,
          form: this.userForm.value
        }
      )
    }
  }

  close() {
    this.dialogRef.close();
  }

}
