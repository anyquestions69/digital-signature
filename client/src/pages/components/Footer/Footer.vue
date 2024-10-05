<template>
    <footer class="wrapper__footer box">
        <div class="footer__conteiner">
            <div class="conteiner__preview">
                <img src="../../../assets/img/logo_mozh.png" alt="logo">
                <p>&COPY; 2024 Все права защищены!</p>              
            </div>
            <div class="conteiner__state">
                <ul>
                    <li>
                        <a href="#">МО РФ</a>
                    </li>
                    <li>
                        <a href="#">Центр ИБ</a>
                    </li>
                    <li>
                        <a href="#">Программа конфиденциональности</a>
                    </li>
                </ul>
            </div>
            <div class="conteiner__env">
                <button title="Перейти к шапке страницы" >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm11.3-395.3l112 112c4.6 4.6 5.9 11.5 3.5 17.4s-8.3 9.9-14.8 9.9l-64 0 0 96c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-96-64 0c-6.5 0-12.3-3.9-14.8-9.9s-1.1-12.9 3.5-17.4l112-112c6.2-6.2 16.4-6.2 22.6 0z"/>
                    </svg>
                </button>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.wrapper__footer {
    padding-top: 20px;
    padding-bottom: 20px;
    border-top: 3px solid $main-line-color;

    .footer__conteiner {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .conteiner__preview {
            img {
                width: 100px;
                height: auto;
                user-select: none;
            }

            p {
                margin-top: 20px;
            }
        }

        .conteiner__state {
            height: 100%;

            ul {
                margin-top: 25px;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-content: space-between;
                gap: 30px;
            }
        }

        .conteiner__env {
            transition: all 0.5s ease;

            button {
                height: 90px;
                border: 2px solid white;
                cursor: pointer;
                display: flex;
                justify-content: center;
                align-items: end;
                padding: 5px;
                border-radius: 40px;
                width: 50px;
                transition: all 0.5s ease;

                &:hover {
                    
                    svg {
                        translate: 0 -40px;
                    }
                }

                svg {
                    bottom: 5px;
                    border-radius: 50%;
                    width: 40px;
                    transition: all 0.5s ease;

                    path {
                        fill: #1dc7cd;
                    }
                }
            }
        }
    }
}
</style>