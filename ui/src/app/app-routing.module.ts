import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './post/post-list/post-list.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'posts',
    component: PostListComponent,
    data: { title: 'Product List' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  FormsModule,
  BrowserModule,
  HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
