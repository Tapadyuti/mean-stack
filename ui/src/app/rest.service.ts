import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) {}
  public endpoint = 'http://localhost:3000/';
  public httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
    })
  };
  

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getPosts(): Observable<any> {
    return this.http.get(this.endpoint + 'posts').pipe(
      map(this.extractData));
  }

  addPosts(post): Observable<any> {
    //return this.http.post(this.endpoint + 'posts').pipe(
    //  map(this.extractData));

    return this.http.post<any>(this.endpoint + 'posts', JSON.stringify(post), this.httpOptions).pipe(
      tap((post) => console.log(`added product w/ id=`+JSON.stringify(post))),
      catchError(this.handleError<any>('addPosts'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }





}
