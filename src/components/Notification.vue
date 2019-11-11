<template>
    <div class="is-fixed">
        <div v-for="notification in notifications" :key="notification.id" class="notification" :class="{ 'is-danger': ifToAddClass(notification.type, 'error'), 'is-success': ifToAddClass(notification.type, 'success') }">
            <button @click="remove(notification.id)" class="delete"></button>
            {{ notification.message }}
        </div>
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
    remove (id) {
      EventBus.$emit("REMOVE_NOTIFICATION", id);
    },
    ifToAddClass (notificationType, classType) {
      return notificationType === classType;
    }
  }
};
</script>
