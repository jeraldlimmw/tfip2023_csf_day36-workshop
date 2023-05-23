package app.weatherserver.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import app.weatherserver.services.WeatherException;
import app.weatherserver.services.WeatherService;
import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;

@Controller
@RequestMapping(path="/api")
public class WeatherController {

    @Autowired
    private WeatherService weatherSvc;
    
    @GetMapping(path="/weather", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> getWeather(@RequestParam String city, @RequestParam String units) {
        System.out.printf(">>> incoming request: city - %s\n", city);

        try {
            JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
            weatherSvc.getWeather(city, units).stream()
                .map(d -> Json.createObjectBuilder()
                        .add("main", d.main())
                        .add("description", d.description())
                        .add("icon", d.icon())
                        .build())
                .forEach(arrBuilder::add);
            return ResponseEntity.ok(arrBuilder.build().toString());

        } catch (WeatherException ex) {
            return ResponseEntity.status(400)
                .body(
                    Json.createObjectBuilder()
                        .add("error", ex.getMessage())
                        .build().toString()
                );
        }
    }
}
