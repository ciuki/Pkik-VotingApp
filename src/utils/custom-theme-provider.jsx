import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/core'
import getTheme from '../theme/theme-getter'


export const CustomThemeContext = React.createContext(
  {
    currentTheme: 'normal',
    setTheme: null,
  },
)

const CustomThemeProvider = (props) => {
  const { children } = props
  const currentTheme = localStorage.getItem('appTheme') || 'normal'
  const [themeName, _setThemeName] = useState(currentTheme)
  const theme = getTheme(themeName)
  const setThemeName = (name) => {
    localStorage.setItem('appTheme', name)
    _setThemeName(name)
  }

  const contextValue = {
    currentTheme: themeName,
    setTheme: setThemeName,
  }

  return (
    <CustomThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CustomThemeContext.Provider>
  )
}

export default CustomThemeProvider