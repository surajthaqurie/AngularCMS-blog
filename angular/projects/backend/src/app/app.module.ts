import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { PostComponent } from './components/post/post.component';
import { AllPostComponent } from './components/post/all-post/all-post.component';
import { NewPostComponent } from './components/post/new-post/new-post.component';
import { EditPostComponent } from './components/post/edit-post/edit-post.component';
import { CategoryComponent } from './components/category/category.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    PostComponent,
    AllPostComponent,
    NewPostComponent,
    EditPostComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    TabViewModule,
    InputTextModule,
    InputTextareaModule,
    ProgressBarModule,
    ToastModule,
    ButtonModule,
    EditorModule,
    BrowserAnimationsModule, 
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
