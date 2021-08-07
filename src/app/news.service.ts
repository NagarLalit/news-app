import { Injectable } from '@angular/core';
import { NewsApiService } from 'angular-news-api';
import { Observable, of } from 'rxjs';
import { articleResponse } from './mock-response';
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

    getArticles(searchTerm: string) {
        // return this.newsApiService.topHeadlines({
        //     country: "us",
        //     language: "en",
        //     q: searchTerm,
        // });
        return of(articleResponse);
        //https://newsapi.org/v2/top-headlines?country=us&apiKey=081663c9e7db42c180219dcb3f23fbc3
    }
}
