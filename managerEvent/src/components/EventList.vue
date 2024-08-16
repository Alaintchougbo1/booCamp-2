<template>
  <ul>
    <li v-for="event in events" :key="event.id">
      <h3>{{ event.title }}</h3>
      <p>{{ event.description }}</p>
      <p>{{ event.start }} - {{ event.end }}</p>
      <button @click="editEvent(event.id)">Edit</button>
      <button @click="removeEvent(event.id)">Delete</button>
    </li>
  </ul>
</template>

<script>
import { useEventsStore } from '@/stores/event'
import { ref } from 'vue'

export default {
  setup() {
    const eventsStore = useEventsStore()
    const events = ref(eventsStore.events)

    const editEvent = (id) => {
    }

    const removeEvent = (id) => {
      eventsStore.removeEvent(id)
    }

    return { events, editEvent, removeEvent }
  }
}
</script>

<style scoped>

</style>
