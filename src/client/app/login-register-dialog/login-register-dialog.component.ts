import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-login-register-dialog',
  templateUrl: './login-register-dialog.component.html',
  styleUrls: ['./login-register-dialog.component.sass']
})
export class LoginRegisterDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginRegisterDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  closeDialog() {
      this.dialogRef.close();
  }
  nagigate() {
      this.dialogRef.close();
      window.scrollTo(0, 0);
  }

}
