import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterCategoryComponent } from './pages/register-category/register-category.component';

const routes: Routes = [
  {
    path: 'register-category',
    component: RegisterCategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
