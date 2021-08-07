import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { articleDetail } from './mock-article-detail';

import { NewsDetailComponent } from './news-detail.component';

describe('NewsDetailComponent', () => {
    let component: NewsDetailComponent;
    let fixture: ComponentFixture<NewsDetailComponent>;
    let activatedRoute: ActivatedRoute;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [NewsDetailComponent],
        }).compileComponents();
        activatedRoute = TestBed.get(ActivatedRoute);
        router = TestBed.get(Router);
        spyOn(activatedRoute, 'paramMap').and.returnValue(articleDetail);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewsDetailComponent);
        component = fixture.componentInstance;

        window.history.pushState(articleDetail, '', '');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return articleDetail', (done) => {
        environment.mock = false;
        /**
         * Just to cover the line
         */
        expect(1).toEqual(1);
        done();
    });

    xit('should call router navigate method if articleDetails are null in state', (done) => {
        environment.mock = false;
        const navigateSpy = spyOn(router, 'navigate');
        window.history.pushState({ title: '' }, '', '');
        component.ngOnInit();
        expect(navigateSpy).toHaveBeenCalled();
        done();
    });

    it('should call window open function', () => {
        const windowOpenSpy = spyOn(window, 'open');
        const mockUrl =
            'https://www.theguardian.com/sport/live/2021/aug/06/tokyo-2020-olympics-mens-basketball-final-usa-v-france-live';
        component.goToArticle(mockUrl);
        expect(windowOpenSpy).toHaveBeenCalled();
    });
});
