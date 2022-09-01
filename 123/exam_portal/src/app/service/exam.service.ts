import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../appmodel/report';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http:HttpClient) { }

  getQuestions(courseid:number,levelid:number) : Observable<any> {
    let url = "http://localhost:8054/admin-restapi/questions/"+courseid+"/"+levelid;
   return this.http.get(url); 
  }

  sendReport(report:Report):Observable<any>{
    let url = "http://localhost:8054/user-restapi/submit_answers";
    return this.http.post(url,report,{responseType: 'text'});
  }
}
