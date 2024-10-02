import { defineStore } from "pinia";

export const usePageStore = defineStore( 'pages', {
    state: () => ({
        regContent: {
            title: 'Регистрация',
            btn_text: 'Зарегистрироваться'
        }
    }),
    actions: {},
    getters: {}
} )