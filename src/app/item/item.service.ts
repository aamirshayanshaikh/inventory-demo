import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiURL = "http://localhost:9090/app";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(pageSize: number, page: number, sortBy: string): Observable<any> {

    let params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('page', page.toString())
      .set('sortBy', sortBy);
    return this.httpClient.get(this.apiURL + '/items-by-pagination', { params })


  }

  create(item:Item): Observable<any> {

    return this.httpClient.post(this.apiURL + '/item/', JSON.stringify(item), this.httpOptions)

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

    return this.httpClient.put(this.apiURL + '/item/' + id, JSON.stringify(item), this.httpOptions)

      .pipe(
        catchError(this.errorHandler)
      )
  }


  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/item/' + id, this.httpOptions)

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
