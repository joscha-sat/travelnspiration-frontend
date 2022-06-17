import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { StateComponent } from './views/state/state.component';
import { AddTravelEntryComponent } from './views/add-travel-entry/add-travel-entry.component';

const routes: Routes = [
    // HOME
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    // HOME
    {
        path: 'home',
        component: HomeComponent,
    },
    // LOGIN
    {
        path: 'login',
        component: LoginComponent,
    },
    // ADD TRAVEL ENTRY
    {
        path: 'addTravelEntry',
        component: AddTravelEntryComponent,
    },
    // INNER STATE OVERVIEW
    {
        path: 'state/:state',
        component: StateComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
