<template>
    <div class="nav-panel__search">
        <input type="text"
                v-model="PagesStore.docPage.searchValue"/>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
            />
        </svg>
    </div>
</template>

<script setup lang="ts">
import { pagesStore } from '../../../store/pagesStore';

const PagesStore = pagesStore()
</script>

<style lang="scss" scoped>
.nav-panel__search {
    position: relative;

    input {
        border-radius: 10px;
        padding: 5px 10px;
        border: 1px solid wheat;
        padding: 5px 35px 5px 30px;
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
</style>