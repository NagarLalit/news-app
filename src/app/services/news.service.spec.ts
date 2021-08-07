import { inject, TestBed } from '@angular/core/testing';
import {
    NewsApiService,
    NgnewsModule,
    TopHeadlinesConfig,
} from 'angular-news-api';
import { of } from 'rxjs';
import { articleResponse } from '../mock-response';

import { NewsService } from './news.service';

class NewsAPIServiceStub {
    topHeadlines(config: TopHeadlinesConfig) {
        return of(articleResponse);
    }
}

describe('NewsService', () => {
    let service: NewsService;
    let apiMockService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgnewsModule],
            providers: [
                { provide: NewsApiService, useClass: NewsAPIServiceStub },
            ],
        });
        apiMockService = new NewsAPIServiceStub();
    });

    it('should be created', () => {
        service = TestBed.get(NewsService);
        expect(service).toBeTruthy();
    });
});
