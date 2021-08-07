import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgnewsModule } from 'angular-news-api';
import { NewsApiKeyConfig } from 'angular-news-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { components } from './components/';
import { environment } from 'src/environments/environment';

const newsApiConfig: NewsApiKeyConfig = {
    key: environment.newsAPIKey,
};

@NgModule({
    declarations: [AppComponent, [...components]],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatCardModule,
        NgnewsModule.forRoot(newsApiConfig),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
