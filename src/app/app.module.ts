import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './features/settings/settings.module';
import { CoreModule } from './core/core.module';
import { LandingModule } from './landing/landing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    LandingModule,
    AuthModule,
    SettingsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
