
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// ...existing code...

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    @Inject('API_BASE_URL') private baseUrl: string
  ) {}

  getData() {
    return this.http.get(`${this.baseUrl}/data`);
  }

  // ...existing code...
}