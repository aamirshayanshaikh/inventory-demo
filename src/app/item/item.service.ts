import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiURL = "https://jsonplaceholder.typicode.com";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {

    return this.httpClient.get(this.apiURL + '/posts/')

      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(item:Item): Observable<any> {

    return this.httpClient.post(this.apiURL + '/posts/', JSON.stringify(item), this.httpOptions)

      .pipe(
        catchError(this.errorHandler)
      )
  }

  find(id:number): Observable<any> {

    return this.httpClient.get(this.apiURL + '/posts/' + id)

      .pipe(
        catchError(this.errorHandler)
      )
  }


  update(id:number, item:Item): Observable<any> {

    return this.httpClient.put(this.apiURL + '/posts/' + id, JSON.stringify(item), this.httpOptions)

      .pipe(
        catchError(this.errorHandler)
      )
  }


  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/posts/' + id, this.httpOptions)

      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


}
