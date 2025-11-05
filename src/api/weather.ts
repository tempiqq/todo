import axios from 'axios';

export type CurrentWeather = {
  name: string;
  main: {
    temp: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
};

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getApiKey = (): string => {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY;

  if (!key) {
    throw new Error('API ключ openweather не знайдено');
  }

  return key;
};

export const fetchCurrentWeatherByCoords = async (
  lat: number,
  lon: number,
): Promise<CurrentWeather> => {
  const apiKey = getApiKey();

  try {
    const response = await axios.get<CurrentWeather>(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: apiKey,
        units: 'metric',
        lang: 'ua',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data || error.message;
      throw new Error(`Помилка OpenWeather (код ${status}): ${message}`);
    }

    throw error;
  }
};
