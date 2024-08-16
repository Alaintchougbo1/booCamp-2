<template>
  <div>
    <vue-cal
      :events="events"
      @event-click="handleEventClick"
      @event-drop="handleEventDrop"
      @event-resize="handleEventResize"
      :default-view="view"
    />
  </div>
</template>

<script>
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { useEventsStore } from '@/stores/event'

export default {
  components: { VueCal },
  data() {
    return {
      view: 'month'
    }
  },
  setup() {
    const eventsStore = useEventsStore()
    eventsStore.loadEvents()

    return {
      events: eventsStore.events,
      handleEventClick(event) {
      },
      handleEventDrop(event) {
      },
      handleEventResize(event) {
      }
    }
  }
}
</script>

<style scoped>
</style>
