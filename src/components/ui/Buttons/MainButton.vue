<script lang="ts" setup>
export interface IMainButtonEmits {
  (e: 'click'): void
}

const emit = defineEmits<IMainButtonEmits>()
</script>

<template>
  <button class="py-3 px-5 bg-[#F2F0F0]" @click="emit('click')">
    <slot />
  </button>
</template>
