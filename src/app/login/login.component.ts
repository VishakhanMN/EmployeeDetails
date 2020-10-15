import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeDetails, ImageSnippet } from '../employee-detail-model';
import { EmployeeDetailsService } from '../employee-details.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public getEmpDetails = {};
  public geocoder;
  public imageUrl: any;
  public url: any;
  public fileToUpload: File = null;

  public selectedFile: ImageSnippet;
  public loginForm: FormGroup;

  constructor(
    public employeeDetailsService: EmployeeDetailsService
  ) { }

  ngOnInit() {
    this.initializeLoginForm();
    this.loginForm.get('locLattitude').disable();
    this.loginForm.get('locLongitude').disable();
  }

  private initializeLoginForm(): void {
    this.loginForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      address1: new FormControl('', [Validators.required]),
      address2: new FormControl('', [Validators.required]),
      locLattitude: new FormControl('', [Validators.required]),
      locLongitude: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
    });

  }

  public saveEmployeeDetails(): void {
    const details: EmployeeDetails = {
      ...this.loginForm.value,
      locLattitude: this.loginForm.get('locLattitude').value,
      locLongitude: this.loginForm.get('locLongitude').value,
      // imageURL: this.url
    };
    this.employeeDetailsService.saveEmployeeDetails(details);

  }

  public getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.geoSuccess(pos)
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  geoSuccess(position) {
    this.loginForm.get('locLattitude').setValue(position.coords.latitude);
    this.loginForm.get('locLongitude').setValue(position.coords.longitude);
  }

  geoError() {
    console.log("Geocoder failed.");
  }

  processFile(event) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      if (event.target)
        this.url = (event.target as any).result;
    }
  }

  // processFile(fileList: FileList) {
  //   this.fileToUpload = fileList.item(0);
  //   this.employeeDetailsService.uploadImage(this.fileToUpload).subscribe(data => {
  //     console.log("data", data)

  //   }, error => {
  //     console.log(error);
  //   });
  //Show image preview
  // let reader = new FileReader();
  // reader.onload = (event: any) => {
  //   this.imageUrl = event.target.result;
  // }
  // reader.readAsDataURL(this.fileToUpload);
  // const file: File = fileList.files[0];
  // const reader = new FileReader();

  // reader.addEventListener('load', (event: any) => {
  //   this.selectedFile = new ImageSnippet(event.target.result, file);
  //   this.employeeDetailsService.uploadImage(this.selectedFile.file).subscribe(
  //     (res) => {
  //       this.onSuccess();
  //     },
  //     (err) => {
  //       this.onError();
  //     })
  // });

  // reader.readAsDataURL(file);

  // private onSuccess() {
  //   this.selectedFile.pending = false;
  //   this.selectedFile.status = 'ok';
  // }

  // private onError() {
  //   this.selectedFile.pending = false;
  //   this.selectedFile.status = 'fail';
  //   this.selectedFile.src = '';
  // }
}
