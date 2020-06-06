import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ToastrManager } from 'ng6-toastr-notifications';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  static readonly API_URL = environment.baseUrl;
  public httpCode: number;
  public message: string;
  constructor(
    private http: HttpClient,
    public toastr: ToastrManager,
  ) { 
    
  }
  createHeader(header : any){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Cache-Control', 'no-cache');
    headers = headers.append('Content-Type', 'application/json');
    if (header) {
        for (var key in header) {
          let type = typeof header[key];
          if (type !== 'string') {
            headers = headers.append(key, JSON.stringify(header[key]));
          } else {
            headers = headers.append(key, header[key]);
          }
        }
      }
  
      let httpOptions = {
        headers: headers
      };
      return httpOptions;
  }
  post(url:string, header :any){
    let httpOptions = this.createHeader(header);
    return this.http.post<any>(`${AppserviceService.API_URL}/` + url,  {}, httpOptions);
  }
  successToast(message: string) {
    this.toastr.successToastr(message);
  }

  /* error toaster */
  errorToast(message: string) {
    this.toastr.errorToastr(message);
  }

}
