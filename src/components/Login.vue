<template>
<div class="column is-half-tablet is-one-third-desktop">
<div class="box">
    <div class="field">
        <label for="" class="label">Username</label>
        <div class="control has-icons-left">
            <input type="text" placeholder="e.g. Username" class="input" :class="{'is-danger': !user && isSub}" v-model="user">
            <span class="icon is-small is-left">
            <i class="fa fa-user"></i></span>
            <input-val-mess v-show="!user && isSub">
                You must enter your user name!
            </input-val-mess>
        </div>
    </div>
    <div class="field">
        <label for="" class="label">Password</label>
        <div class="control has-icons-left">
            <input type="password" placeholder="******" class="input" :class="{'is-danger': !pass && isSub}" v-model="pass">
            <span class="icon is-small is-left">
            <i class="fa fa-lock"></i></span>
            <input-val-mess v-show="!pass && isSub">
                You must enter your password!
            </input-val-mess>
        </div>
    </div>
    <div class="field">
        <btn @click.native="emitLoginEvent" class="is-success">Login</btn>
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
      isSub: false
    }
  },
  components: {
    Btn,
    InputValMess
  },
  methods: {
    emitLoginEvent() {
      this.isSub = true;
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
