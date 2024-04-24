<script lang="ts" setup>
import { ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useIpStore } from '@/stores'

import MainContainer from '@/components/ui/Containers/MainContainer.vue'

import IpForm from '@/components/Main/Forms/IpForm.vue'
import IpTable from '@/components/Main/Table/IpTable.vue'

const { ipListLength } = storeToRefs(useIpStore())
</script>

<template>
  <main class="main-page">
    <MainContainer>
      <IpForm v-if="!ipListLength" />
      <IpTable v-else />
    </MainContainer>
  </main>
</template>
