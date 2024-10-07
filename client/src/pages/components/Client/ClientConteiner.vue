<template>
    <div class="main-client__conteiner box">
        <div class="conteiner__content">
            <div class="content__nav">
                <ClientNav />
            </div>
            <div class="content__info">
                <component :is="ContentVariant[ PagesStore.clientPage.navVariant ]" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ClientNav from './ClientNav.vue'
import ClientInfo from './ClientInfo.vue'
import ClientChat from './ClientChat.vue'
import ClientDrafts from './ClientDrafts.vue'
import ClientDocToSignature from './ClientDocToSignature.vue'
import ClientSettings from './ClientSettings.vue'

import { pagesStore } from '../../../store/pagesStore.ts'


const PagesStore = pagesStore()

const ContentVariant = [
    ClientInfo,
    ClientDocToSignature,
    ClientDrafts,
    ClientChat,
    ClientSettings
]
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