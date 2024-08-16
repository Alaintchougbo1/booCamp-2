<template>
  <form @submit.prevent="submitForm">
    <input v-model="event.title" placeholder="Title" />
    <textarea v-model="event.description" placeholder="Description"></textarea>
    <input v-model="event.start" type="datetime-local" />
    <input v-model="event.end" type="datetime-local" />
    <button type="submit">Save Event</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useEventsStore } from '@/stores/event'

export default {
  props: {
    eventId: Number
  },
  setup(props) {
    const eventsStore = useEventsStore()
    const event = ref({
      title: '',
      description: '',
      start: '',
      end: ''
    })

    if (props.eventId) {
      const existingEvent = eventsStore.events.find((e) => e.id === props.eventId)
      Object.assign(event.value, existingEvent)
    }

    const submitForm = () => {
      if (props.eventId) {
        eventsStore.updateEvent(props.eventId, event.value)
      } else {
        eventsStore.addEvent(event.value)
      }
    }

    return { event, submitForm }
  }
}
</script>

<style scoped>
</style>
