<template>
    <div class="main-client__conteiner box">
        <div class="conteiner__content">
            <div class="content__nav">
                <ClientNav />
            </div>
            <div class="content__info">
                <ClientInfo />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ClientNav from './ClientNav.vue'
import ClientInfo from './ClientInfo.vue'
</script>

<style lang="scss">
.main-client__conteiner {
    @include Flex( row, center, center );
    height: 85dvh;
    margin: 25px 0;

    .conteiner__content {
        @include Flex( row, space-between, center );
        width: 100%;
        height: 100%;
        border: 2px solid $border-color;

        .content__nav {
            width: 300px;
            height: 100%;
            border-right: 2px solid $border-color;
        }

        .content__info {
            width: 90%;
            height: 100%;
        }
    }
}
</style>