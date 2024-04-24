<script lang="ts" setup>
import { computed } from 'vue'

export interface IMainTextAreaProps {
  modelValue?: string | null
  placeholder?: string
}

export interface IMainTextAreaEmits {
  (e: 'update:modelValue', value: string): void
}

const emit = defineEmits<IMainTextAreaEmits>()
const props = defineProps<IMainTextAreaProps>()

const placeholderText = computed(() =>
  props.placeholder ? props.placeholder : 'Введите IP адреса'
)
</script>

<template>
  <textarea
    :placeholder="placeholderText"
    class="p-3 border border-[#DADADA] w-full rounded resize-none min-h-[112px] outline-none"
    :value="modelValue"
    @input="(e) => emit('update:modelValue', e.target?.value as string)"
  />
</template>
