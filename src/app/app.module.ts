import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './components/navigation/navigation.component';
import { GermanySvgComponent } from './components/germany-svg/germany-svg.component';
import { HomeComponent } from './views/home/home.component';
import { StateComponent } from './views/state/state.component';
import { BaseCardComponent } from './components/a-custom-components/base-card/base-card.component';
import { LoginComponent } from './views/login/login.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { AddTravelEntryComponent } from './views/add-travel-entry/add-travel-entry.component';
import { TravelEntryFormComponent } from './components/forms/travel-entry-form/travel-entry-form.component';
import { BaseTextInputComponent } from './components/a-custom-components/base-text-input/base-text-input.component';
import { BaseTextAreaInputComponent } from './components/a-custom-components/base-text-area-input/base-text-area-input.component';
import { BaseNumberInputComponent } from './components/a-custom-components/base-number-input/base-number-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseSelectComponent } from './components/a-custom-components/base-select/base-select.component';
import { RegisterFormComponent } from './components/forms/register-form/register-form.component';
import { RegisterComponent } from './views/register/register.component';
import { FilterTravelButtonComponent } from './components/filter-travel-button/filter-travel-button.component';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        GermanySvgComponent,
        HomeComponent,
        StateComponent,
        BaseCardComponent,
        LoginComponent,
        LoginFormComponent,
        AddTravelEntryComponent,
        TravelEntryFormComponent,
        BaseTextInputComponent,
        BaseTextAreaInputComponent,
        BaseNumberInputComponent,
        BaseSelectComponent,
        RegisterFormComponent,
        RegisterComponent,
        FilterTravelButtonComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        // ngx-translate and the loader module
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        ReactiveFormsModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}
