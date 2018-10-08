import { reactNative } from 'docz-plugin-react-native';
import magma from 'react-magma-dom';

const theme = magma.magma;

export default {
  title: 'React Magma',
  typescript: true,
  plugins: [reactNative()],
  themeConfig: {
    colors: {
      primary: theme.primary02,
      link: theme.primary02,
      sidebarBg: theme.primary03,
      sidebarText: theme.primary01,
      text: theme.primary01,
    },
    logo: {
      src: '/static/img/React_Magma_Logo_Full.f03d55c8.png',
      width: 150
    },
    styles: {
      h1: {
        color: theme.primary02,
        fontFamily: theme.headingFont,
        fontSize: '40px',
        fontWeight: 500,
        lineHeight: 1.1,
        margin: '20px 0 10px'
      },
      h2: {
        color: theme.primary02,
        fontFamily: theme.headingFont,
        fontSize: '32px',
        fontWeight: 500,
        lineHeight: 1.1,
        margin: '20px 0 10px'
      },
      h3: {
        color: theme.primary02,
        fontFamily: theme.headingFont,
        fontSize: '26px',
        fontWeight: 500,
        lineHeight: 1.1,
        margin: '20px 0 10px'
      }
    }
  }
};
