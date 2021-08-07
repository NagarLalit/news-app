import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NewsService } from '../../services';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, OnDestroy {
    public articles: any[] = [];
    private subscription = new Subscription();
    searchSubject = new Subject();
    searchText = '';
    showLoader = false;

    constructor(private newsService: NewsService, private router: Router) {}

    public ngOnInit() {
        this.showLoader = true;
        this.subscription.add(
            this.searchSubject
                .pipe(debounceTime(200))
                .subscribe((searchTerm: string) => {
                    this.fetchArticles(searchTerm);
                })
        );
        this.fetchArticles();
    }

    private fetchArticles(search?: string): void {
        this.subscription.add(
            this.newsService.getArticles(search).subscribe(
                (response) => {
                    if (response.totalResults) {
                        this.articles = response.articles;
                    } else {
                        this.articles = [];
                    }
                    this.showLoader = false;
                },
                (error) => {
                    this.showLoader = false;
                }
            )
        );
    }

    onSearch(event) {
        this.showLoader = true;
        this.searchText = event.target.value;
        this.searchSubject.next(this.searchText);
    }

    navigateToDetailsPage(index) {
        const article = this.articles[index];
        this.router.navigate(['article'], { state: article });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
