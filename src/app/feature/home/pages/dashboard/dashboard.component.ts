import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../../../core/service/app.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  categories: any[] = [];
  featuredData: any[] = [];
  selectedCategoryId: string | null = null;
  isMainFeaturedData: any[] = [];
  featuredDataByCategory: any[] = [];

  newCategoryName: string = '';
  newFeaturedData: {
    title: string;
    categoryId: string | null;
    is_main: boolean;
  } = {
    title: '',
    categoryId: null,
    is_main: false,
  };

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadFeaturedData();
  }

  // Cargar todas las categorías
  loadCategories(): void {
    this.appService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  // Cargar todos los featuredData
  loadFeaturedData(): void {
    this.appService.getAllFeaturedData().subscribe((data) => {
      this.featuredData = data;
      this.isMainFeaturedData = data.filter((item: any) => item.is_main);
    });
  }

  // Crear nueva categoría
  addCategory(): void {
    if (this.newCategoryName) {
      this.appService
        .createCategory({ name: this.newCategoryName })
        .subscribe(() => {
          this.newCategoryName = '';
          this.loadCategories();
        });
    }
  }

  // Crear nuevo featuredData
  addFeaturedData(): void {
    if (this.newFeaturedData.title) {
      this.appService.createFeaturedData(this.newFeaturedData).subscribe(() => {
        this.newFeaturedData = { title: '', categoryId: null, is_main: false };
        this.loadFeaturedData();
      });
    }
  }

  // Mostrar featuredData por categoría seleccionada
  showFeaturedDataByCategory(categoryId: string): void {
    this.selectedCategoryId = categoryId;
    this.featuredDataByCategory = this.featuredData.filter(
      (item: any) => item.category && item.category.id === categoryId
    );
  }

  // Verificar si un featuredData pertenece a una categoría
  hasCategory(item: any): boolean {
    return item.category === null;
  }
}
