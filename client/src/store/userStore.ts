import { defineStore } from "pinia";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });


const BASE_URL = process.env.BASE_URL || "http://localhost:3000/api";

export const userStore = defineStore( 'userStore', {
    state: () => ({}),
    actions: {
        async getUserList(  ) {
            try {

            } catch ( error ) {
                console.error( error );
            }
        },
        async getTargetUser(  ) {
            try {

            } catch ( error ) {
                console.error( error );
            }
        }
    },
    getters: {}
} )