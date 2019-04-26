import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { Question } from '../question/question.model';

@Injectable({ providedIn: 'root' })
export class QuestionService {
  constructor(private http: HttpClient) {}

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>('question/all').pipe(catchError(this.handleError));
  }

  createQuestion(title: string): void {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post('question', title, { headers: httpHeaders, responseType: 'text' }).subscribe(res => console.log(res));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
