import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5115/api/user';

  constructor(private http: HttpClient) {}

  getUsersList(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(this.apiUrl, user);
  }

  updateUser(id: string, user: Object): Observable<Object> {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
