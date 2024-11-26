import { useColorScheme } from 'react-native';

// Define the light and dark theme colors
const Colors = {
  light: {
    text: '#000',
    background: '#fff',
    primary: '#6200EE',
    secondary: '#03DAC6',
  },
  dark: {
    text: '#fff',
    background: '#121212',
    primary: '#BB86FC',
    secondary: '#03DAC6',
  },
};

// Custom hook to get the correct color based on the theme
export function useThemeColor(
  props = { light: undefined, dark: undefined },
  colorName
) {
  const theme = useColorScheme(); // Get the current system theme ('light' or 'dark')
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps; // Use color passed as prop
  } else {
    return Colors[theme][colorName]; // Fallback to theme colors
  }
}
