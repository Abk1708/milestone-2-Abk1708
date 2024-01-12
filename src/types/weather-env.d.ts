interface WeatherData {
    main: {
        humidity: number;
        temp: number;
    };
    wind: {
        speed: number;
    };
    name: string;
    weather: {
        icon: string;
    }[];
}
