import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/tutorials';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(baseUrl);
  }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: { firstname: string; lastname: string; gender: string; emailid: string; phoneno: string; }): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: { firstname: any; lastname: any; gender: any; emailid: any; phoneno: any; }): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(q: string): Observable<any> {
    return this.http.get(`${baseUrl}?q=${q}`);
  }
}
