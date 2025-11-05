export type Coordinates = {
  lat: number;
  lon: number;
};

//Базові координати
const KYIV_COORDS: Coordinates = {
  lat: 50.4501,
  lon: 30.5234,
};

export const  getCoordinates = async (): Promise<Coordinates> => {
  if (!('geolocation' in navigator)) {
    console.log('Браузер не підтримує геолокацію');
    return KYIV_COORDS;
  }

  return new Promise((resolve) => {
    const timeoutMs = 8000;
    const timeout = setTimeout(() => {
      resolve(KYIV_COORDS);
    }, timeoutMs);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeout);

        const userCoords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        console.log('Отримані координати:', userCoords)
        resolve(userCoords);
      },
      (error) => {
        clearTimeout(timeout);

        console.log('Не вдалося використати геолокацію:', error.message)
        console.log('Київ за замовчуванням')

        resolve(KYIV_COORDS);
      },
      {
        enableHighAccuracy: false,
        timeout: timeoutMs,
        maximumAge: 60000,
      },
    );
  });
};
