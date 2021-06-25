import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts : any;
  private url = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http : HttpClient) { 
    http.get(this.url)
    .subscribe(response=>{
      this.posts = response;
    })
  }

  createPost(input : HTMLInputElement)
  {
    let post ={title : input.value}
    input.value = '';
    this.http.post(this.url,JSON.stringify(post))
    .subscribe(response=>{
        post['id'] = response['id']
        this.posts.splice(0,0,post)
    })
  }

  updatePost(post)
  {
    this.http.patch(this.url + "/" + post.id,JSON.stringify(post))
    .subscribe(response=>{
      post.title = "Post Updated..." ;
    })
  }

  deletePost(post)
  {
    this.http.delete(this.url + "/" + post.id )
    .subscribe(response=>{
      let index = this.posts.indexOf(post);
      this.posts.splice(index,1)
    })
  }

  ngOnInit(): void {
  }

}
