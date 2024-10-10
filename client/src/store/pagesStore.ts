import { defineStore } from "pinia";

export const pagesStore = defineStore('pagesStore', {
    state: () => ({
        clientPage: {
            isOpenEditor: false,
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
        //actions to ClientPage
        changeNavVariant( variantId: number ) {
            this.clientPage.navVariant = variantId
        },
        toggleEditor() {
            this.clientPage.isOpenEditor = !this.clientPage.isOpenEditor
        },
        editClientInfo() {
            this.toggleEditor()
        }
    }
})