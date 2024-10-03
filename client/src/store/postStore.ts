import { defineStore } from "pinia";
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config({ path: '.env' })

interface Post {
    id: number;
}

const BASE_URL = process.env.BASE_URL || "http://localhost:3000/api";


export const postStore = defineStore( 'postStore', {
    state: () => ({
        postList: [] as Post[]
    }),
    actions: {
        async getPostList(  ) {
            try {

            } catch ( error ) {
                console.error( error );
            }
        },
        async getPost(  ) {
            try {

            } catch ( error ) {
                console.error( error );
            }
        },
        async subscribePost(  ) {
            try {

            } catch ( error ) {
                console.error( error );
            }
        }
    },
    getters: {}
} )