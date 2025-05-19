import { writable } from 'svelte/store';

export const themeStore = writable({
  primary: '#3B4852',
  secondary: '#f50057',
  fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
});