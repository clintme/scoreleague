
// getLocale
export function getLocale(query) {
  let locale = '';

  if (query && query.locale) {
    locale = `?locale=${query.locale}`;
  }

  return locale;
}
