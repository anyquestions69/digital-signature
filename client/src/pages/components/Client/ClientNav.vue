<template>
    <div class="nav__panel">
        <div class="nav__person-info">
            <div class="person__img">
                <img src="../../../assets/img/user.png" alt="user" />
            </div>
            <div class="person__info">
                <p class="name">{{ user.name }}</p>
                <p class="position">{{ user.position }}</p>
            </div>
        </div>
        <ul class="panel__list">
            <li class="list__item">
                <p>
                    Мои документы
                </p>
            </li>
            <li class="list__item">
                <p>
                    Черновики
                </p>
            </li>
            <li class="list__item">
                <p>
                    Настройки
                </p>
            </li>
            <li class="list__item">
                <p>
                Чат
                </p>
            </li>
            <li class="list__item end">
                <p>
                    Выйти
                </p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

var user = ref({
    img: '../../../assets/img/logo.png',
    name: 'Андрей Сергеевич',
    position: 'Зам. нач. кафедры'
})
</script>

<style lang="scss">
.nav__panel {
    @include Flex;
    width: 100%;

    .nav__person-info {
        @include Flex( column, space-between, start );
        padding: 20px;
        width: 100%;
        height: 150px;
        border-bottom: 2px solid $border-color;
        gap: 10px;

        .person__img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: red;
            // background: url('../../../assets/img/user.png');

            img {
                user-select: none;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .person__info {
            p {

                &.name {
                    font-size: 20px;
                    font-weight: 600;
                }

                &.position {
                    margin-top: 10px;
                    font-size: 14px;
                    font-weight: 200;
                }
            }
        }
    }

    .panel__list {
        @include Flex;
        width: 100%;

        .list__item {
            width: 100%;
            height: 50px;
            cursor: pointer;
            @include FlexRow;
            padding: 5px 20px;

            &:hover {
                background: rgb(65, 65, 65);
            }

            p {
                background: transparent;
            }

            &.end {
                align-self: flex-end;
            }
        }
    }
}
</style>