import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppserviceService } from './appservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FRONTEND';
  timerForm : any;
  constructor(
    private _fb: FormBuilder,
    private apiServicesService: AppserviceService,

  ) { }
  ngOnInit(): void {
    this.timerForm = this._fb.group({
      timer : ['', Validators.required ],
      requested_by : [""]
    });
  }

  setTimer(){
    if(this.timerForm){
      let headers = {
        "timer": this.timerForm.value.timer,
        "requested_by":this.timerForm.value.requested_by
      }
      this.apiServicesService.post("schedular",headers ).subscribe(schedularResponse =>{
        if(schedularResponse.code == 200){
          console.log("/", schedularResponse.message)
          this.apiServicesService.successToast(schedularResponse.message)
        }else{
          this.apiServicesService.errorToast(schedularResponse.message)
        }
      },(error)=>{
        this.apiServicesService.errorToast("Error in Scheduling task")
      })
    }
  }

}
