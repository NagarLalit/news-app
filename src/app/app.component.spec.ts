import { TestBed, async } from '@angular/core/testing';
import {
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
} from '@angular/material';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    let fixture;
    let component: AppComponent;
    let router: Router;
    const routerEvent$ = new BehaviorSubject<RouterEvent>(null);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatMenuModule,
                MatIconModule,
                MatToolbarModule,
            ],
            declarations: [AppComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(AppComponent);
        router = TestBed.get(Router);
        (router as any).events = routerEvent$.asObservable();

        component = fixture.componentInstance;
    }));

    it('should create the app', () => {
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should display back button if article is false', () => {
        fixture.article = true;
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.back-button')).toBeDefined();
    });

    xit('should set the article to false', () => {
        const navigateSpy = spyOn(router, 'navigate');
        routerEvent$.next(new NavigationEnd(200, '/article', ''));
        expect(navigateSpy).toHaveBeenCalled();
    });

    it('should call window history back method', () => {
        const historyBackMock = spyOn(window.history, 'back');
        component.goBack();
        expect(historyBackMock).toHaveBeenCalled();
    });
});
