import { Post } from "./post.model";
import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from "../rest.service";

@Injectable({providedIn:'root'}) // this to provide in the root level, this means now angular will find it

export class PostsService{
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();
    private postsSub: Subscription ;

    constructor(public postsService:PostsService, private router: Router, private rest:RestService, private route:ActivatedRoute) {
        //this.postsService = postsService; // this is commented as the postsService is made public.
    }

    getPosts(){
        
        this.posts = [];
        this.rest.getPosts().subscribe((data:[])=>{
            console.log("Data : "+data);
            this.posts = data;
        });
        return [...this.posts]; // the use of ... befor this.posts inside '[ ]' is spread operator and [] is denotes as it is new array.
        // by doing this will not affect original array if any changes done to the return object
    }

    getPostsUpdatedListener(){
        //return this.postsUpdated.asObservable();
    };

    addPosts(title: string, content: string){
        const post: Post = {
            title: title,
            content: content
        }
        //this.posts.push(post);
        
        this.rest.addPosts(post).subscribe((result) => {
            //this.router.navigate(['/product-details/'+result._id]);
          }, (err) => {
            console.log(err);
          });

        this.postsUpdated.next([...this.posts]);// this pushes/emits new value and this value is a copy of this posts after updating them.
        //After this a listener is required

    }
}

