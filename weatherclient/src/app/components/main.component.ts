import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Params, Router } from '@angular/router';
import { WeatherQuery } from '../models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  fb = inject(FormBuilder)
  router = inject(Router)

  form!: FormGroup

  ngOnInit(): void {
    this.form = this.fb.group({
      city: this.fb.control<string>('', [ Validators.required
          , Validators.minLength(2) ]),
      units: this.fb.control<string>('metric', [ Validators.required ])
    })
  }

  process() {
    const query = this.form.value as WeatherQuery
    console.info('>>> query: ', query)
    const queryParams: Params =  { units: query.units }
    // to keep the city name in the url, not something to change
    // units is something that you may want to change
    this.router.navigate([ '/weather', query.city ], { queryParams: queryParams })
  }

}
