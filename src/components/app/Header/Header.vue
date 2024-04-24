<script lang="ts" setup>
import AppHeaderSearch from '@/components/app/Header/Search.vue'
import AppHeaderNavigationList from '@/components/app/Header/NavigationList.vue'
</script>

<template>
  <header
    class="px-[100px] py-[26px] gap-[126px] w-full bg-[#F2F0F0] h-[100px] flex items-center justify-between font"
  >
    <RouterLink to="/">
      <h2 class="text-2xl font-semibold whitespace-nowrap cursor-pointer">IP-PN.COM</h2>
    </RouterLink>
    <AppHeaderSearch />
    <AppHeaderNavigationList />
  </header>
</template>

<style scoped></style>
