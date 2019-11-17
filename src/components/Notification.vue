<template>
    <div class="is-fixed">
        <article v-for="notification in notifications" :key="notification.id" class="message" :class="{ 'is-danger': ifToAddClass(notification.type, 'error'), 'is-success': ifToAddClass(notification.type, 'success') }">
            <div class="message-header">
                <p v-if="notification.type == 'error'">Ups, something happened...</p>
                <p v-else>We are good!..</p>
                <button @click="remove(notification.id)" class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body">
                {{ notification.message }}
            </div>
        </article>
    </div>
</template>

<script>
import EventBus from '@/bus';

export default {
  name: "Notification",
  props: {
    notifications: {
      required: true,
      type: Array
    }
  },
  methods: {
    remove(id) {
      EventBus.$emit("REMOVE_NOTIFICATION", id);
    },
    ifToAddClass(notificationType, classType) {
      return notificationType === classType;
    }
  }
};
</script>
