<script>
export default {
  data() {
    return {
      leftWidth: 500, // Initial width of the left block
      isDragging: false, // State to track whether the user is dragging
    }
  },
  methods: {
    startResizing() {
      this.isDragging = true

      // Listen for mousemove and mouseup events
      document.addEventListener('mousemove', this.resize)
      document.addEventListener('mouseup', this.stopResizing)
    },
    resize(event) {
      if (!this.isDragging)
        return

      // Calculate the new width of the left block
      const containerRect = event.target.closest('.h-screen').getBoundingClientRect()
      const newLeftWidth = event.clientX - containerRect.left

      // Prevent the left block from becoming too small or too large
      const minWidth = 100
      const maxWidth = containerRect.width - 100
      this.leftWidth = Math.max(minWidth, Math.min(newLeftWidth, maxWidth))
    },
    stopResizing() {
      this.isDragging = false

      // Remove mousemove and mouseup listeners
      document.removeEventListener('mousemove', this.resize)
      document.removeEventListener('mouseup', this.stopResizing)
    },
  },
}
</script>

<template>
  <div class="h-screen flex">
    <!-- Left Block -->
    <div
      class="overflow-auto"
      :style="{ flexBasis: `${leftWidth}px` }"
    >
      <slot name="left" />
    </div>

    <!-- Divider -->
    <div
      class="w-2 bg-gray-400 hover:bg-gray-600 cursor-ew-resize"
      @mousedown="startResizing"
    />

    <!-- Right Block -->
    <div class="flex-1 overflow-auto">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped>
/* Optional: Add smooth transitions to the blocks */
div {
  transition: flex-grow 2s ease !important;
}
</style>
