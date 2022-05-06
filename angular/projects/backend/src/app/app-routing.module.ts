import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './components/category/category.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { EditPostComponent } from './components/post/edit-post/edit-post.component';
import { NewPostComponent } from './components/post/new-post/new-post.component';
import { PostComponent } from './components/post/post.component';
import { RegisterComponent } from './components/register/register.component';

import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'posts',
        children: [
          { path: '', component: PostComponent },
          { path: 'categories', component: CategoryComponent },
          { path: 'create', component: NewPostComponent },
          { path: 'edit/:slug', component: EditPostComponent },
          {
            path: '**',
            redirectTo: '',
            pathMatch: 'full',
          },
        ],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
