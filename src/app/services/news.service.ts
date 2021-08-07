import { Injectable } from '@angular/core';
import { NewsApiService, TopHeadlinesResponse } from 'angular-news-api';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { articleResponse } from '../mock-response';
@Injectable({
    providedIn: 'root',
})
export class NewsService {
    constructor(private newsApiService: NewsApiService) {}

    /**
     * Consume the NewsApiService here, make sure
     * to set the language to 'en' english and built
     * in the search functionality using the 'q'
     * variable in API calls to news-api
     */

    getArticles(searchTerm: string): Observable<TopHeadlinesResponse> {
        if (environment.mock) {
            return of(articleResponse as TopHeadlinesResponse);
        } else {
            return this.newsApiService.topHeadlines({
                country: 'us',
                language: 'en',
                q: searchTerm,
            });
        }
    }
}
