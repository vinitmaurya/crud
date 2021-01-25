import { Injectable } from '@angular/core';
import {HttpHeaders,HttpClient} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';

import { Post } from './post';


@Injectable({
  providedIn: 'root'
})
export class PostService {  
  private apiUrl = "https://jsonplaceholder.typicode.com";
  // errorHandler;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private httpClient:HttpClient) { }
  getAll():Observable<Post>{
    return this.httpClient.get<Post>(this.apiUrl + "/posts/")
    .pipe(
      catchError(this.errorHandler)
    )
  }
  create(post): Observable<Post>{
    return this.httpClient.post<Post>(this.apiUrl +'/posts/',JSON.stringify(post),this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  find(id):Observable<Post>{
    return this.httpClient.get<Post>(this.apiUrl+'/posts/'+id)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  update(id,post):Observable<Post>{
    return this.httpClient.put<Post>(this.apiUrl + '/posts/' + id, JSON.stringify(post),this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  delete(id){
    return this.httpClient.delete<Post>(this.apiUrl+'/posts/'+ id,this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  errorHandler(error){
    let errorMessage='';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }
    else{
      errorMessage = `Error code: ${error.status}\n Message: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
