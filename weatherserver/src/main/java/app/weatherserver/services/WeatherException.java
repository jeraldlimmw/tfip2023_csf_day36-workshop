package app.weatherserver.services;

public class WeatherException extends Exception{
    public WeatherException(){}

    public WeatherException(String msg) {
        super(msg);
    }    
}
