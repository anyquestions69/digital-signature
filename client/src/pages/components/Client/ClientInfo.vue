<template>
    <div class="info__body">
        <div class="body__header">
            <a :class="`personal-info ${ isInfoType ? '' : 'un' }active`" @click="infoSearch">Личная информация</a>
            <a :class="`chat ${ !isInfoType ? '' : 'un' }active`" @click="chatSearch">Мои документы</a>
        </div>
        <div class="body__content">
            <div v-if="isInfoType" class="content__user-info">
                <h1 class="content__title">Личная информация</h1>
                <div class="content__inform">
                    <div class="inform__item">
                        <h4>ФИО:</h4>
                        <p>{{ AuthStore.name }}</p>
                    </div>
                    <div class="inform__item">
                        <h4>Должность:</h4>
                        <p>{{ AuthStore.post }}</p>
                    </div>
                    <div class="inform__item">
                        <h4>Подразделение:</h4>
                        <p>{{ AuthStore.division }}</p>
                    </div>
                </div>
                <button class="user-info__edit" title="Редактировать профиль" @click="PagesStore.toggleEditor">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
                    </svg>
                </button>
            </div>
            <div v-else class="content__my-docs" title="В разработке" style="padding: 30px;">
                <p>В разработке</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { authStore } from '../../../store/authStore.ts'
import { pagesStore } from '../../../store/pagesStore.ts'


var isInfoType = ref( true )
const AuthStore = authStore()
const PagesStore = pagesStore()
 
const infoSearch = () => {
    isInfoType.value = true
}

const chatSearch = () => {
    isInfoType.value = false
}
</script>

<style lang="scss">
.info__body {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .body__header {
        border-bottom: 2px solid $border-color;
        height: 40px;
        @include Flex( row, start, center );

        a {
            height: 100%;
            width: 22%;
            border-right: 2px solid $border-color;
            cursor: pointer;
            overflow: hidden;
            word-wrap: none;
            @include Flex( row, center, center );

            &.active {
                box-shadow: 0px 0px 4px white inset;
            }

            &.unactive {

                &:hover {
                    box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.5) inset;
                }
            }
        }
    }

    .body__content {
        position: relative;
        width: 100%;
        height: 100%;

        .content__user-info {
            padding: 5% 10%;

            .content__title {
                @include Title;
            }

            .content__inform {
                margin-top: 30px;
                margin-left: 30px;

                .inform__item {
                    margin-top: 30px;
                    @include FlexRow;

                    h4 {
                        text-decoration: underline;
                    }

                    p {
                        margin-left: 100px;
                    }
                }
            }

            .user-info__edit {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 30px;
                height: auto;
                border: none;
                transition: all 1s ease;

                @keyframes bell-animation {
                    0% {
                        transform: rotate(0);
                    }
                    
                    25% {
                        transform: rotate(20deg);
                    }
                    
                    50% {
                        transform: rotate(0deg);
                    }
                    
                    75% {
                        transform: rotate(-20deg);
                    }
                    
                    100% {
                        transform: rotate(0);
                    }
                }

                &:hover {
                    scale: 1.1;
                    animation: bell-animation 2s linear infinite;
                }

                svg {
                    path {
                        fill: $main-font-color;
                    }
                }
            }
        }

        .content__my-docs {}
    }
}
</style>