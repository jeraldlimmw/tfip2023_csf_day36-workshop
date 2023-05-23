export interface WeatherQuery {
    city: string
    units: string
}

export interface Weather {
    main: string
    description: string
    icon: string
}