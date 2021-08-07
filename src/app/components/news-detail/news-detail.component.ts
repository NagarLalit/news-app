import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { I18nPluralPipe } from '@angular/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { comments } from './comments';
import { articleDetail } from './mock-article-detail';
import { environment } from 'src/environments/environment';
import { Article } from 'angular-news-api';

@Component({
    selector: 'app-news-detail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.scss'],
})
export class NewsDetailComponent implements OnInit {
    public article$: Observable<Article>;
    public comments: any[] = comments;
    commentsPluralMapping = {
        '=0': '0 Comments',
        '=1': '1 Comment',
        other: '# Comments',
    };

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {}

    public ngOnInit() {
        /**
         * User will be redirected to list view if he/she tries to access the link directly
         */
        this.article$ = this.activatedRoute.paramMap.pipe(
            map(() => {
                if (environment.mock) {
                    return articleDetail;
                } else {
                    if (!window.history.state.title) {
                        this.router.navigate(['news']);
                    }
                    return window.history.state;
                }
            })
        );
    }

    public goToArticle(url: string): void {
        // Open original article in new tab
        window.open(url, '_blank');
    }
}
