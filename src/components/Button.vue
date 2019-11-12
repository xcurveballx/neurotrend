<template>
    <button class="button" :class="{'is-loading': $store.getters.isAppBusy, 'is-static': $store.getters.isAppBusy}">
        <slot></slot>
    </button>
</template>
