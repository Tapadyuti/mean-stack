import { Component } from '@angular/core'; //EventEmitter, Output

//import { Post } from "../post.model"; // as now we are not emmiting rather we are posting to the service
import { NgForm } from '@angular/forms';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { RestService } from '../../rest.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  
  private enteredTitle = "";
  private enteredContent ="";
  
  // @Output is a decorator.
  //@Output() postCreated = new EventEmitter<Post>(); // this is done to emit the event to outside of the component.
  constructor(public postsService:PostsService, private router: Router, private rest:RestService, private route:ActivatedRoute) { 
  }


  //onAddPost(postInput: HTMLTextAreaElement){
  /*onAddPost(){
    //console.dir(postInput)
    //this.newPost = postInput.value;
    //this.newPost = this.enteredValue;
    const post:Post  = {
      title: this.enteredTitle,
      content:this.enteredContent
    };
    this.postCreated.emit(post);

  }*/

  onAddPost(form: NgForm){
    if(form.invalid)
      return;

    const post  = {
      title: form.value.title,
      content: form.value.content
    };

    //this.postCreated.emit(post); // this is now commented as we are not emiting it any more but throwing to service
    //this.postsService.addPosts(form.value.title, form.value.content);
    this.rest.addPosts(post).subscribe((result) => {
      //this.router.navigate(['/product-details/'+result._id]);
    }, (err) => {
      console.log(err);
    });
    form.resetForm();

  }

}
