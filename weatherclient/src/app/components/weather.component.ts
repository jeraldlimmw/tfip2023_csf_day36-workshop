import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Weather } from '../models';
import { WeatherService } from '../weather.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit{

  activatedRoute = inject(ActivatedRoute)
  title = inject(Title)
  weatherSvc = inject(WeatherService)
  
  city = ''
  weather$!: Observable<Weather[]>

  ngOnInit(): void {
    this.city = this.activatedRoute.snapshot.params['city']
    // get the units value. Else default to metric
    const units = this.activatedRoute.snapshot.queryParams['units'] || 'metric'
    
    this.title.setTitle(`Weather: ${this.city}`)

    this.weather$ = this.weatherSvc.getWeather(this.city, units)
  }
  
}
