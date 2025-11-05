export const formateDate = (): string => {
  const now = new Date();
  const userLanguage = navigator.language || 'en-US';

  const formatSettings: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: '2-digit',
  };

  const formatter = new Intl.DateTimeFormat(userLanguage, formatSettings);

  const formattedDate = formatter.format(now);
  const firstLetter = formattedDate.charAt(0).toUpperCase();
  const restOfString = formattedDate.slice(1);

  return firstLetter + restOfString;
}
