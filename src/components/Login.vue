<template>
    <div class="column is-half-tablet is-one-third-desktop">
        <div class="box">
            <div class="field">
                <label class="label">Username</label>
                <div class="control has-icons-left has-icons-right">
                    <input type="text" placeholder="e.g. Username" class="input" :class="{'is-danger': !user && hasBeenSubmitted}" v-model="user" @keyup.enter="emitLoginEvent">
                    <span class="icon is-small is-left">
                    <i class="fa fa-user"></i></span>
                    <span v-show="!user && hasBeenSubmitted" class="icon is-small is-right">
                        <i class="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
                <input-val-mess v-show="!user && hasBeenSubmitted">
                    You must enter your user name!
                </input-val-mess>
            </div>
            <div class="field">
                <label class="label">Password</label>
                <div class="control has-icons-left has-icons-right">
                    <input type="password" placeholder="******" class="input" :class="{'is-danger': !pass && hasBeenSubmitted}" v-model="pass" @keyup.enter="emitLoginEvent">
                    <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i></span>
                    <span v-show="!pass && hasBeenSubmitted" class="icon is-small is-right">
                        <i class="fas fa-exclamation-triangle"></i>
                    </span>
                </div>
                <input-val-mess v-show="!pass && hasBeenSubmitted">
                    You must enter your password!
                </input-val-mess>
            </div>
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
import InputValMess from "@/components/InputValidationMessage.vue";
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
        InputValMess
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
