import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { StateComponent } from './views/state/state.component';

const routes: Routes = [
    // HOME
    {
        path: '',
        redirectTo: '/startseite',
        pathMatch: 'full',
    },
    {
        path: 'startseite',
        component: HomeComponent,
    },
    // INNER STATE OVERVIEW
    {
        path: 'bundesland/:bundesland',
        component: StateComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
