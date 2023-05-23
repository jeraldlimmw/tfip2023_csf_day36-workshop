import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Weather } from "./models";

const URL = '/api/weather'

@Injectable()
export class WeatherService {

    http = inject(HttpClient)

    getWeather(city: string, units = 'metric'): Observable<Weather[]> {

        const params = new HttpParams()
            .set('city', city)
            .set('units', units)

        // request to API is a GET
        // /api/weather?city=CITY&units=metric
        return this.http.get<Weather[]>(`${URL}`, { params })
    }
}