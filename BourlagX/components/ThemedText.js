import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeColor } from './hooks/useThemeColor'; // Ensure the correct path for the hook

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'italic' ? styles.italic : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

ThemedText.propTypes = {
  lightColor: PropTypes.string,
  darkColor: PropTypes.string,
  type: PropTypes.oneOf(['default', 'title', 'defaultSemiBold', 'subtitle', 'link', 'italic']),
  style: PropTypes.any,
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
  italic: {
    fontStyle: 'italic',
  },
});
