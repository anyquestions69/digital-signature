<template>
    <div class="info__body">
        <div class="body__header">
            <a :class="`personal-info ${ isInfoType ? '' : 'un' }active`" @click="infoSearch">Личная информация</a>
            <a :class="`chat ${ !isInfoType ? '' : 'un' }active`" @click="chatSearch">Чат</a>
            <a>Подать на подпись</a>
        </div>
        <div class="body__content">
            <div v-if="isInfoType" class="content__user-info">
                <h1>Личная информация</h1>

            </div>
            <div v-else class="content__chat" title="В разработке"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

var isInfoType = ref( true )

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
        width: 100%;
        height: 100%;

        .content__user-info {
            padding: 5% 10%;

            h1 {
                @include Title;
            }
        }

        .content__chat {
            display: none;
        }
    }
}
</style>