import { defineStore } from "pinia";

export const pagesStore = defineStore('pagesStore', {
    state: () => ({
        clientPage: {
            navVariant: 0,
            navList: [
                {   
                    id: 0,
                    text: 'Личная информация'
                },
                {   
                    id: 1,
                    text: 'Подать на подпись'
                },
                {   
                    id: 2,
                    text: 'Черновики'
                },
                {   
                    id: 3,
                    text: 'Чат'
                },
                {   
                    id: 4,
                    text: 'Настройки'
                }
            ]
        }
    }),

    actions: {
        changeNavVariant( variantId: number ) {
            this.clientPage.navVariant = variantId
        }
    }
})