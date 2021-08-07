import { tick } from '@angular/core/src/render3';
import {
    async,
    ComponentFixture,
    fakeAsync,
    TestBed,
} from '@angular/core/testing';
import {
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { articleResponse } from 'src/app/mock-response';
import { NewsService } from 'src/app/services';

import { NewsComponent } from './news.component';

class NewsServiceStub {
    getArticles(searchTerm) {
        return of(articleResponse);
    }
}

describe('NewsComponent', () => {
    let component: NewsComponent;
    let fixture: ComponentFixture<NewsComponent>;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatProgressBarModule,
                MatFormFieldModule,
                MatInputModule,
                RouterTestingModule,
                BrowserAnimationsModule,
            ],
            providers: [{ provide: NewsService, useClass: NewsServiceStub }],
            declarations: [NewsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewsComponent);
        router = TestBed.get(Router);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set articles to empty array and hide loader if error is thrown from api', () => {
        const service = fixture.debugElement.injector.get(NewsService);
        spyOn(service, 'getArticles').and.returnValue(throwError('error'));
        component.ngOnInit();
        expect(component.articles.length).toEqual(0);
        expect(component.showLoader).toBeFalsy();
    });

    it('should set articles to empty array if no results are returned from api', () => {
        const service = fixture.debugElement.injector.get(NewsService);
        spyOn(service, 'getArticles').and.returnValue(of({ totalResults: 0 }));
        component.ngOnInit();
        expect(component.articles.length).toEqual(0);
    });

    it('should trigger searchSubject next method', () => {
        const searchSubjectSpy = spyOn(component.searchSubject, 'next');
        component.onSearch({ target: { value: 'tokyo' } });
        expect(component.showLoader).toBeTruthy();
        expect(searchSubjectSpy).toHaveBeenCalled();
    });

    it('should call the router navigate method', () => {
        const navigateSpy = spyOn(router, 'navigate');
        component.articles = articleResponse.articles;
        component.navigateToDetailsPage(0);
        expect(navigateSpy).toHaveBeenCalled();
    });
});
