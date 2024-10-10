import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environments.development';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Categorías
  getAllCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/`);
  }

  createCategory(category: { name: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories/`, category);
  }

  // FeaturedData
  getAllFeaturedData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/featuredData/`);
  }

  createFeaturedData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/featuredData/`, data);
  }

  getAllFeaturedDataByCategoryId(categoryId: number) {
    return this.http.get<any[]>(
      `${this.apiUrl}/featuredData/category/${categoryId}`
    );
  }
}
