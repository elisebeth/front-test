<script lang="ts" setup>
export interface INavigationListItem {
  title: string
  path: `/${string}`
}

const navigationList: INavigationListItem[] = [
  {
    title: 'Documentation',
    path: '/docs'
  },
  {
    title: 'Contacts',
    path: '/contacts'
  },
  {
    title: 'Log In',
    path: '/authorization'
  }
]
</script>

<template>
  <ul class="flex items-center gap-8">
    <li class="" v-for="(route, index) of navigationList" :key="index">
      <RouterLink class="whitespace-nowrap font-medium cursor-pointer" :to="route.path">
        {{ route.title }}
      </RouterLink>
    </li>
  </ul>
</template>
