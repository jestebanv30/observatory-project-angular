import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../../../../core/service/app.service';

@Component({
  selector: 'app-preview-data-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview-data-category.component.html',
  styleUrls: ['./preview-data-category.component.css'],
})
export class PreviewDataCategoryComponent implements OnInit {
  @Input() categoryId: number | null = null;
  @Output() close = new EventEmitter<void>(); // Evento para notificar el cierre
  featuredDataByCategory: any[] = [];

  constructor(private appService: AppService) {}

  ngOnInit() {
    if (this.categoryId) {
      this.loadFeaturedDataByCategory();
    }
  }

  loadFeaturedDataByCategory() {
    if (this.categoryId) {
      console.log('categoryId: ', this.categoryId);

      this.appService.getAllFeaturedDataByCategoryId(this.categoryId).subscribe(
        (data) => {
          console.log('Datos recibidos: ', data);
          this.featuredDataByCategory = data;
        },
        (error) => {
          console.error('Error cargando "featuredData" by category', error);
        }
      );
    }
  }

  // Cerrar el modal
  closeModal(): void {
    this.close.emit(); // Emite el evento de cierre
  }
}
