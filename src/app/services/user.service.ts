import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../models/user.interface';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserInterface[]>{
    return this.http.get<UserInterface[]>('http://localhost:3000/users')
  }
  addUsers(item: UserInterface): Observable<any> {
    return this.http.post('http://localhost:3000/users', item);
  }
  // Observable string sources
  private emitChangeSource = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  // Service message commands
  emitChange(change: any) {
      this.emitChangeSource.next(change);
  }
}
