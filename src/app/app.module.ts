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
import { BaseCardComponent } from './components/base-card/base-card.component';
import { LoginComponent } from './views/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

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
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        // ngx-translate and the loader module
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http);
}
