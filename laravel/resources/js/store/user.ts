import {defineStore} from 'pinia';
import axiosClient from "@/axios";

type User = {
    id: number;
    name: string;
    email: string;
};

const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
        hasCheckedAuth: false
    }),
    actions: {
        setUser(user: User) {
            this.user = user;
            this.hasCheckedAuth = true;
        },
        async fetchUser() {
            try {
                const { data } = await axiosClient.get('/api/user');
                this.user = data;
                return data as User;
            } catch (error) {
                this.user = null;
                return null;
            } finally {
                this.hasCheckedAuth = true;
            }
        },
        clearUser() {
            this.user = null;
            this.hasCheckedAuth = true;
        }
    }
});


export default useUserStore;
