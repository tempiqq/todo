import { useEffect, useState } from 'react';
import {
  fetchCurrentWeatherByCoords,
  type CurrentWeather,
} from '../api/weather';
import { getCoordinates } from '../utils/getCoordinates';

export type WeatherState =
  | { status: 'loading' }
  | { status: 'success'; data: CurrentWeather }
  | { status: 'error'; message: string };

export const useCurrentWeather = () => {
  const [weatherState, setWeatherState] = useState<WeatherState>({
    status: 'loading',
  });

  useEffect(() => {
    async function loadWeather() {
      setWeatherState({ status: 'loading' });

      try {
        const coordinates = await getCoordinates();

        const weatherData = await fetchCurrentWeatherByCoords(
          coordinates.lat,
          coordinates.lon,
        );

        setWeatherState({ status: 'success', data: weatherData });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unknown error';

        setWeatherState({ status: 'error', message: errorMessage });
      }
    }

    loadWeather();

    const updateInterval = 10 * 60 * 1000; //10 хвилин
    const interval = setInterval(loadWeather, updateInterval);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return weatherState;
};
