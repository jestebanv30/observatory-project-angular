import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../../../core/service/app.service';
import { PreviewDataCategoryComponent } from '../../components/preview-data-category/preview-data-category.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    PreviewDataCategoryComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  categories: any[] = [];
  featuredData: any[] = [];
  selectedCategoryId: number | null = null;
  isMainFeaturedData: any[] = [];
  featuredDataByCategory: any[] = [];

  newCategoryName: string = '';
  newFeaturedData: {
    name: string;
    categoryId: string | null;
    is_main: boolean;
  } = {
    name: '',
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
      console.log('Categorias cargadas: ', data);
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
    if (this.newFeaturedData.name) {
      this.appService.createFeaturedData(this.newFeaturedData).subscribe(() => {
        this.newFeaturedData = { name: '', categoryId: null, is_main: false };
        this.loadFeaturedData();
      });
    }
  }

  // Funcion para abrir el modal y mostrar los featuredData de una categoria
  showFeaturedDataByCategory(categoryId: number): void {
    console.log('CategoryId: ', categoryId);
    this.selectedCategoryId = categoryId; // Selecciona la categoria y abre el modal
  }

  onModalClose(): void {
    this.selectedCategoryId = null; // Cierra el modal
  }

  // Verificar si un featuredData pertenece a una categoría
  hasCategory(item: any): boolean {
    return item.category === null;
  }
}
