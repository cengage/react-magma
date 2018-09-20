import { reactNative } from 'docz-plugin-react-native';
import magma from 'react-magma-dom';

export default {
  title: 'React Magma',
  typescript: true,
  plugins: [reactNative()],
  themeConfig: {
    colors: {
      primary: 'tomato',
    },
    styles: {
      h1: {
        color: '#007db8',
        fontFamily: 'gnuolane, sans-serif',
        fontSize: '40px',
        fontWeight: 500,
        lineHeight: 1.1,
        margin: '20px 0 10px'
      },
      h2: {
        color: '#007db8',
        fontFamily: 'gnuolane, sans-serif',
        fontSize: '32px',
        fontWeight: 500,
        lineHeight: 1.1,
        margin: '20px 0 10px'
      },
      h3: {
        color: '#007db8',
        fontFamily: 'gnuolane, sans-serif',
        fontSize: '26px',
        fontWeight: 500,
        lineHeight: 1.1,
        margin: '20px 0 10px'
      }
    }
  }
};
