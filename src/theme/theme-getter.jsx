import normal from './base-theme'
import dark from './dark-theme'

const themes = {
  normal,
  dark,
}

export default function getTheme(theme) {
    console.log(theme);
  return themes[theme]
}