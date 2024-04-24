<script lang="ts" setup>
import { ref, watchEffect } from 'vue'

export interface IMainIconProps {
  path: string
}

const props = defineProps<IMainIconProps>()

const DEFAULT_ICONS_PATH: string = '/src/assets/icons/Flags'

const icon = ref<string | Record<string, any>>('')

const getIcon = async () => {
  try {
    const importedIcons = import.meta.glob('@/assets/icons/Flags/**/**/**.svg', {
      query: '?raw',
      import: 'default',
      eager: false
    })

    // @ts-ignore
    icon.value = await importedIcons[`${DEFAULT_ICONS_PATH}/${props.path}.svg`]()
  } catch (e) {
    console.error(`[main-icon] Icon ${props.path}.svg not defined!`)
  }
}

watchEffect(getIcon)
</script>

<template>
  <span class="" v-html="icon"> </span>
</template>
