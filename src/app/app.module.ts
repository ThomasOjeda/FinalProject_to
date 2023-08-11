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
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

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
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
