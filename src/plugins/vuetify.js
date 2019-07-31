import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ru from 'vuetify/es5/locale/ru';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
	options: {
	customProperties: true,
	},
	themes: {
	light: {
	primary: '#ff5722',
	secondary: '#ff9800',
	accent: '#03a9f4',
	error: '#f44336',
	warning: '#ffeb3b',
	info: '#795548',
	success: '#8bc34a',
	},
	},
	},
	lang: {
	locales: { ru },
	current: 'ru',
	},
	icons: {
	iconfont: 'md',
	},
});
