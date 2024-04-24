import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios, { type AxiosDefaults } from 'axios'
import { api } from '@/api'
import { useRouter } from 'vue-router'

const NAMESPACE: string = 'ip-store'

export interface ITableListItem {
  query: string
  status: 'success' | 'fail' | 'pending'
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: number
  lon: number
  timezone: string
  isp: string
  org: string
  as: string
  statusText?: string
}

export interface IIpListItem {
  query: string
  validation: 'pass' | 'fail'
}

export const useIpStore = defineStore(NAMESPACE, () => {
  const ipList = ref<IIpListItem[]>([])
  const tableList = ref<ITableListItem[]>([])

  const setIpList = (list: IIpListItem[]) => {
    ipList.value = list
  }

  const updateTableListItemByIndex = (value: ITableListItem, index: number) => {
    tableList.value[index] = { ...value }
  }

  const addTableListItem = (value: ITableListItem) => {
    tableList.value.push(value)
  }

  const setTableList = (value: ITableListItem[]) => {
    tableList.value = [...value]
  }

  const ipListLength = computed(() => ipList.value.length)

  const sendIpListApi = async (values: IIpListItem[]) => {
    setIpList(values)

    ipList.value.map(async (item: IIpListItem, index: number) => {
      try {
        addTableListItem({ query: item.query, status: 'pending' } as ITableListItem)

        if (item.validation === 'fail') {
          updateTableListItemByIndex({ query: item.query, status: 'fail' } as ITableListItem, index)
          return
        }

        const res = await api.get<ITableListItem>(`/${item.query}`)
        updateTableListItemByIndex(res.data, index)
      } catch (error) {
        updateTableListItemByIndex({ status: 'fail', statusText: error } as ITableListItem, index)
      }
    })
  }

  const removeTableItemByIndex = (index: number) => {
    tableList.value.splice(index, 1)
  }

  return {
    ipList,
    tableList,
    ipListLength,
    setIpList,
    sendIpListApi,
    setTableList,
    addTableListItem,
    removeTableItemByIndex
  }
})
