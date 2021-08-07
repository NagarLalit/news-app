import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewsComponent, NewsDetailComponent } from './components/';

const routes: Routes = [
    { path: '', redirectTo: '/news', pathMatch: 'full' },
    {
        path: 'news',
        component: NewsComponent,
        data: { animation: 'NewsComponent' },
    },
    {
        path: 'article',
        component: NewsDetailComponent,
        data: { animation: 'NewsDetailComponent' },
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
