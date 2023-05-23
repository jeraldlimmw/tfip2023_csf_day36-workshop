import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { WeatherService } from './weather.service';

import { AppComponent } from './app.component';
import { MainComponent } from './components/main.component';
import { WeatherComponent } from './components/weather.component';

const appRoutes : Routes = [
  { path: '', component: MainComponent, title: 'Weather'},
  { path: 'weather/:city', component: WeatherComponent },
  { path: '**', redirectTo:'/', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, HttpClientModule, 
    RouterModule.forRoot(appRoutes, {useHash : true})
  ],
  providers: [ WeatherService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
