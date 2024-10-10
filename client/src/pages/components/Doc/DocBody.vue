<template>
    <div class="main-documents__body">
        <div class="document_nav-panel">
            <select name="" id="">
                <option value="">Наименование</option>
                <option value="">Должностное лицо</option>
                <option value="" selected>Дата</option>
            </select>
            <div>
                <input type="text">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                </svg>
            </div>
        </div>
        <ul class="document__list">
            <li v-for="elem in PostStore.postList" :key="elem.id"   class="list__elem">
                <div class="elem__text">
                    <div>
                        <p>{{ elem.title }}</p>
                        <p>Должностное лицо: 
                            <span>Неизвестно</span>
                        </p>
                        <p>Дата:
                            <span>Неизвестно</span>
                        </p>
                    </div>
                </div>
                <RouterLink  :to="`document/id=${ elem.id }`">
                    <button>
                        <p>Перейти</p>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
                        </svg>
                    </button>
                </RouterLink>
            </li>
        </ul>
        <button class="document__btn">Показать ещё...</button>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { postStore } from '../../../store/postStore'


const PostStore =  postStore()

onMounted(() => {
    postStore().getPostList()
})


</script>

<style lang="scss">
.main-documents__body {
    @include Flex;
    width: 100%;

    .document_nav-panel {
        @include Flex( row, space-around, center );
        width: 90%;
        padding: 10px 20px;
        border: 2px solid rgb(51, 51, 51);
        box-shadow: 1px 1px 5px white;
        border-radius: 20px;

        select {
            border: 1px solid wheat;
            padding: 5px 10px;
            border-radius: 10px;
        }

        div {
            position: relative;

            input {
                border-radius: 10px;
                padding: 5px 10px;
                border: 1px solid wheat;
            }

            svg {
                position: absolute;
                background: transparent;
                width: 20px;
                top: 5px;
                right: 10px;

                path {
                    fill: $main-font-color;
                }
            }
        }

        button {
            border-radius: 10px;
            padding: 10px 20px;
            font-size: 18px;
        }
    }

    .document__list {
        margin-top: 30px;
        @include Flex;
        width: 80%;
        padding: 40px 20px;
        gap: 20px;

        .list__elem {
            padding: 10px 10px 10px 30px;
            border-radius: 20px;
            width: 100%;
            border: 2px solid white;
            @include FlexRow;

            .elem__text {
                background: transparent;

                div {
                    p {
                        background: transparent;
                        &:first-of-type {
                            margin-bottom: 20px;
                        }

                        &:last-of-type {
                            margin-top: 10px;
                            
                            span {
                                margin-left: 20px;
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }

            button {
                padding: 20px 10px;
                @include ItemLink( 5px );
                background: transparent;
                height: 100%;
                border: none;

                p {
                    background: transparent;
                }

                svg {
                    background: transparent;
                }
            }
        }
    }

    .document__btn {
        padding: 10px 20px;
        margin-top: 30px;
        font-size: 20px;
        width: 40%;
        border-radius: 20px;
    }
}
</style>