import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { StateComponent } from './views/state/state.component';
import { AddTravelEntryComponent } from './views/add-travel-entry/add-travel-entry.component';
import { RegisterComponent } from './views/register/register.component';
import { TravelpostDetailedComponent } from './views/travelpost-detailed/travelpost-detailed.component';
import { MyTravelpostsComponent } from './views/my-travelposts/my-travelposts.component';

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
        path: 'addTravelEntry',
        component: AddTravelEntryComponent,
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
    // TRAVEL POST DETAILED
    {
        path: 'myTravelPosts/:id',
        component: MyTravelpostsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
