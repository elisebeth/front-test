<script lang="ts" setup>
import { ref } from 'vue'

const searchValue = ref<string | null>(null)

import { Search } from '@element-plus/icons-vue'
</script>

<template>
  <ElInput
    :prefix-icon="Search"
    size="large"
    placeholder="95.213.138.174"
    class=""
    type="text"
    v-model="searchValue"
  />
</template>
