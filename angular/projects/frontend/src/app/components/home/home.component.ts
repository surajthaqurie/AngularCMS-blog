import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'projects/models/category.interface';
import { Post } from 'projects/models/post.interface';
import { ApiService } from 'projects/tools/src/lib/api.service';

import { map, Subject, Subscription, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  posts: Post[] = [];

  sub$ = new Subject();

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.sub$)).subscribe((params) => {
      const catTitle = params.get('title');

      if (this.router.url === `/post/category/${catTitle}`) {
        this.apiService
          .getAllPost()
          .pipe(
            map((posts) => posts.filter((p) => p.category.title === catTitle)),
            takeUntil(this.sub$)
          )
          .subscribe((post) => (this.posts = post));
      } else {
        this.apiService
          .getAllPost()
          .pipe(takeUntil(this.sub$))
          .subscribe((res) => (this.posts = res));
      }
    });
  }
  // console.log(this.user);  }
  ngOnDestroy(): void {
    this.sub$.next(void 0);
    this.sub$.complete();
  }
}
