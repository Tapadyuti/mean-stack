import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from "../post.model";
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{

  // posts = [
  //   {title:"1st Post", content:'This is 1st Content,'},
  //   {title:"2nd Post", content:'This is 2nd Content,'},
  //   {title:"3rd Post", content:'This is 3rd Content,'}
  // ]
  posts:Post[]= [];  // @Input 
  private postsSub: Subscription ;
  

  //postsService: PostListComponent; //On setting public for any dependency injection in constructor the need of declaring is avoided
  // Public key word will automatically create postService property in this component and store the incoming value in that property 
  constructor(public postsService:PostsService, private router: Router, private rest:RestService, private route:ActivatedRoute) {
    //this.postsService = postsService; // this is commented as the postsService is made public.
  } 

  ngOnInit(){ // this is required whenever we implement OnInIt to the class 

    this.getPosts();
    //this.posts = this.postsService.getPosts();
   // this.postsSub = this.postsService.getPostsUpdatedListener()
    //  .subscribe((posts: Post[])=>{
    //    this.posts = posts;

   //   });
      // subscribe actualy takes 3 arguments 
      // 1st: function whenever new data is executed
      // 2nd: when error is emited 
      // 3rd: whenever the observable is completed 
      

  }
  ngOnDestroy(){
    this.postsSub.unsubscribe(); // this is done to prevent menory leak.
  }

  getPosts(){
    this.posts = [];
    this.rest.getPosts().subscribe((data:[])=>{
      console.log("Data : "+JSON.stringify(data));
      this.posts = data;
    })

  }


}
