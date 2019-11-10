<template>
<section class="section has-background-light is-size-5">
<div class="container">
    <nav class="navbar has-background-light" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="/">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Dog.svg" height="52">
            </a>
            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item is-active">Dogs</a>
                <a class="navbar-item">Trustees</a>
                <a class="navbar-item">Payments</a>
            </div>
            <div class="navbar-end">
                <a @click.prevent="logout" class="navbar-item has-text-danger">Log out</a>
            </div>
        </div>
    </nav>
</div>
<div class="container">
    <div class="notification has-text-centered is-italic y-5">
          <strong>Hi, Username!</strong> Use the navigation links above to visit corresponding page.
    </div>
</div>
</section>
</template>

<script>
import EventBus from '@/bus';

export default {
  name: "Welcome",
  methods: {
    logout() {
      EventBus.$emit('LOGOUT');
    }
  }
};
</script>
