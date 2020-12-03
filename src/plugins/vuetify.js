import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#673ab7',
        accent: '#9c27b0',
        error: 'gray',
        // error: '#e91e63',
        warning: '#ff5722',
        info: '#607d8b',
        success: '#009688'
      },
      // dark: {
      //   primary: '#3f51b5',
      //   secondary: '#673ab7',
      //   accent: '#9c27b0',
      //   error: '#e91e63',
      //   warning: '#ff5722',
      //   info: '#607d8b',
      //   success: '#009688'
      // }
    }
  }
});
