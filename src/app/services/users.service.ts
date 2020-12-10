import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
  }

  create(obj): any {
    return this.http.post(environment.apiUrl + '/users/add', obj, {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  update(obj): any {
    return this.http.put(environment.apiUrl + '/users/update', obj, {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getOne(id): any {
    return this.http.get(environment.apiUrl + '/users/get-one/' + id, {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getFiles(status): any {
    return this.http.get(environment.apiUrl + '/users/get-file/' + status, {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getList(): any {
    return this.http.get(environment.apiUrl + '/users/get-all', {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  search(obj): any {
    return this.http.post(environment.apiUrl + '/users/search/', obj, {headers: this.headers}).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error): any {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
