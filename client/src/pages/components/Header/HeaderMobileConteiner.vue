<template>
    <div class="header__conteiner-mobile">
            <nav class="conteiner__nav-mobile">
                <ul class="nav__list-mobile">
                    <li class="list__item-mobile" v-for="item in props.headerContent.nav" :key="item.id">
                        <a href="#">
                            {{ item.text }}
                        </a>
                    </li>
                </ul>
                <RouterLink class="nav-mobile__btn" 
                            to="#"
                >
                    {{ props.headerContent.button.text }}
                </RouterLink>
            </nav>
        </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { HeaderContent } from './HeaderInterfaces';


const props = defineProps<{
    headerContent: HeaderContent
}>()
</script>

<style scoped lang="scss">

.header__conteiner-mobile {
    margin-top: 20px;

    .conteiner__nav-mobile {
        text-align: center;

        .nav__list-mobile {
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;

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
        
        .nav-mobile__btn {
            border: 2px solid $main-font-color;
            padding: 10px 20px;

            &:hover {
				translate: 5px -5px;
				color: $main-line-color;
				box-shadow: -5px 5px 5px $main-line-color;
			}
        }
    }
}
</style>