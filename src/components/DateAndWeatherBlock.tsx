import { useTodayDate } from '../hooks/useTodayDate';
import { useCurrentWeather } from '../hooks/useCurrentWeather';

export const DateAndWeatherBlock = () => {
  const today = useTodayDate();
  const weatherState = useCurrentWeather();

  return (
    <div className="px-6 py-2 flex items-center justify-between border-b border-todo-border dark:border-dark-border">
      <div>
        <span className="text-sm  text-todo-text dark:text-dark-text">
          {today}
        </span>
      </div>

      {weatherState.status === 'loading' && (
        <div>
          <span className="text-sm text-todo-text dark:text-dark-text">
            Погода завантажується...
          </span>
        </div>
      )}

      {weatherState.status === 'error' && (
        <div>
          <span className="text-sm text-todo-text dark:text-dark-text">
            Погода недоступна.
          </span>
        </div>
      )}

      {weatherState.status === 'success' && (
        <div className="flex items-center gap-2">
          <img
            className='bg-black/30 rounded-lg dark:bg-transparent'
            src={`https://openweathermap.org/img/wn/${weatherState.data.weather[0]?.icon}@2x.png`}
            alt={weatherState.data.weather[0]?.description || 'weather icon'}
            width={28}
            height={28}
          />
          <span className="text-sm text-todo-text dark:text-dark-text">
            {Math.floor(weatherState.data.main.temp)}°C,{' '}
            {weatherState.data.name}
          </span>
        </div>
      )}
    </div>
  );
};
