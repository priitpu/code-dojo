import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { ViewsComponent } from './components/views/views.component';
import { Kata01Component } from './components/views/kata01/kata01.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ViewsComponent,
    Kata01Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
