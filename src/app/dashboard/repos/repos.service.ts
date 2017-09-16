import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ReposService {
  private _repourl = 'https://api.github.com/users/craig-o-curtis/repos';

  constructor(private _http: HttpClient) { }

  getRepos(): Observable<any[]> {
    return this._http.get<any[]>(this._repourl)
      .map( (res) => res)
      .catch( this._handleError);
  }

  private _handleError(err: HttpErrorResponse) {
    console.error(err);
    return Observable.throw(err);
  }
}
