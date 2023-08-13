import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module'; //Do not remove
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { ProjectModule } from './features/project/project.module'; //Do not remove
import { SharedModule } from './shared/shared.module';
import { EpicModule } from './features/epic/epic.module';
import { StoryModule } from './features/story/story.module';
import { TaskModule } from './features/task/task.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './features/settings/settings.module';

@NgModule({
  declarations: [AppComponent, PlaceholderComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ProjectModule,
    EpicModule,
    StoryModule,
    TaskModule,
    AuthModule,
    SettingsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
