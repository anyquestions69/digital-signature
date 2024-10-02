<template>
    <div class="header__conteiner-mobile">
            <nav class="conteiner__nav-mobile">
                <ul class="nav__list-mobile">
                    <li class="list__item-mobile" v-for="item in props.head_content.nav" :key="item.id">
                        <a href="#">
                            {{ item.name }}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';


const props = defineProps<{
    head_content: {
        nav: any[],
        button: Object
    }
}>()
</script>

<style scoped lang="scss">

.header__conteiner-mobile {
    margin-top: 20px;

    .conteiner__nav-mobile {

        .nav__list-mobile {
            display: flex;
            flex-direction: column;

            .list__item-mobile {
                text-align: center;
                border-top: 1px solid #ffffff4d;
                padding: 10px;

                &:hover {
                    background: #ffffff1a;
                }

                a {
                    background: transparent;
                }
            }
        }
    }
}
</style>