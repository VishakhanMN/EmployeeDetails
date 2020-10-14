import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {

  constructor(
    private http: HttpClient,
    private router: Router) { }


  public saveEmployeeDetails(request): void {
    const url = "https://5f869807c8a16a0016e6b6de.mockapi.io/empDetail";
    this.http.post(url, request, {
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json'
      }
    }).subscribe(result => {
      console.log("result: ", result);
      this.router.navigate(['home'])
    }, error => {
      console.error("error: ", error);
    })

  }

  public getEmployeeDetails(): any {
    return this.http.get('https://5f869807c8a16a0016e6b6de.mockapi.io/empDetail');
  }

  // uploadImage(fileToUpload: File): Observable<any> {
  //   // const fd = new FormData();
  //   // fd.append('imageFile', fileToUpload, fileToUpload.name);
  //   // return this.http.post('https://5f869807c8a16a0016e6b6de.mockapi.io/empDetail', fd)
  //   //   ;
  //   const endpoint = 'https://5f869807c8a16a0016e6b6de.mockapi.io/empDetail';
  //   const formData: FormData = new FormData();
  //   formData.append('fileKey', fileToUpload, fileToUpload.name);
  //   return this.http
  //     .post(endpoint, formData, {
  //       headers: {
  //         "Content-Type": 'multipart/form-data',
  //         "Accept": 'application/json'
  //       }
  //     })
  // }

  public uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    const url = "https://5f869807c8a16a0016e6b6de.mockapi.io/empDetail";
    return this.http.post(url, formData, {
      headers: {
        "Content-Type": 'multipart/form-data',
        "Accept": 'application/json'
      }
    })

  }
}
