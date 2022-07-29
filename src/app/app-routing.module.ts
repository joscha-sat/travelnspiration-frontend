import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { StateComponent } from './views/state/state.component';
import { AddTravelEntryComponent } from './views/add-travel-entry/add-travel-entry.component';
import { RegisterComponent } from './views/register/register.component';
import { TravelpostDetailedComponent } from './views/travelpost-detailed/travelpost-detailed.component';
import { MyTravelpostsComponent } from './views/my-travelposts/my-travelposts.component';
import { FavouriteListComponent } from './views/favourite-list/favourite-list.component';
import { LoggedGuard } from './guards/logged.guard';
import { ImprintComponent } from './views/imprint/imprint.component';

const routes: Routes = [
    // REDIRECT TO HOME
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
    // REGISTER NEW USER
    {
        path: 'signup',
        component: RegisterComponent,
    },
    // LOGIN
    {
        path: 'login',
        component: LoginComponent,
    },
    // ADD TRAVEL ENTRY
    {
        path: 'addTravelpost',
        component: AddTravelEntryComponent,
        canActivate: [LoggedGuard],
    },
    // EDIT TRAVEL POSTS
    {
        path: 'editTravelpost/:id',
        component: AddTravelEntryComponent,
        canActivate: [LoggedGuard],
    },
    // INNER STATE OVERVIEW
    {
        path: 'state/:state',
        component: StateComponent,
    },
    // TRAVEL POST DETAILED
    {
        path: 'state/:state/:id',
        component: TravelpostDetailedComponent,
    },
    // MY TRAVEL POSTS
    {
        path: 'myTravelPosts/:id',
        component: MyTravelpostsComponent,
        canActivate: [LoggedGuard],
    },
    // MY FAVOURITES
    {
        path: 'myFavourites/:userId',
        component: FavouriteListComponent,
        canActivate: [LoggedGuard],
    },
    // IMPRINT
    {
        path: 'imprint',
        component: ImprintComponent,
    },
    // if a "wrong/different" url is entered, redirect to home
    { path: '**', redirectTo: '/home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
