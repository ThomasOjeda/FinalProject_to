import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module'; //Do not remove
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { ProjectModule } from './features/project/project.module'; //Do not remove
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, PlaceholderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    ProjectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
