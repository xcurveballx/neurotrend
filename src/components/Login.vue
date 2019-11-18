<template>
    <div class="column is-half-tablet is-one-third-desktop">
        <div class="box">

            <input-val label="Username" placeholder="e.g. Username" :condition="!user && hasBeenSubmitted" v-model="user" @keyup.native.enter="emitLoginEvent" msg="You must enter your user name!">
                <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                </span>
            </input-val>

            <input-val label="Password" placeholder="******" :condition="!pass && hasBeenSubmitted" v-model="pass" @keyup.native.enter="emitLoginEvent" msg="You must enter your password!">
                <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                </span>
            </input-val>

            <div class="field">
                <btn @click.native="emitLoginEvent" class="is-success">
                    Login
                </btn>
            </div>
            
        </div>
    </div>
</template>

<script>
import Btn from "@/components/Button.vue";
import InputVal from "@/components/InputWithValidation.vue";
import EventBus from '@/bus';

export default {
    name: "Login",
    data() {
        return {
            user: '',
            pass: '',
            hasBeenSubmitted: false
        }
    },
    components: {
        Btn,
        InputVal
    },
    methods: {
        emitLoginEvent() {
            this.hasBeenSubmitted = true;
            if (!this.user || !this.pass) return;
            let payload = {
                user: this.user,
                pass: this.pass
            };
            EventBus.$emit('LOGIN', payload);
        }
    }
};
</script>
