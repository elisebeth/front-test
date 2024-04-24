<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { ElTable } from 'element-plus'

import { Search } from '@element-plus/icons-vue'

import { debounce } from '@/lib/debounce'

import { type ITableListItem, useIpStore } from '@/stores'

import MainIcon from '@/components/ui/Icon/MainIcon.vue'

const router = useRouter()
const route = useRoute()

const multipleTableRef = ref<InstanceType<typeof ElTable>>(null)
const ipStore = useIpStore()
const { removeTableItemByIndex } = ipStore
const { tableList } = storeToRefs(ipStore)

const selectedValues = ref<ITableListItem[]>([])

const selectionChange = (value: any) => {
  selectedValues.value = [...value]
}

const remove = (index: number) => {
  removeTableItemByIndex(index)
}

const searchValue = ref<string | null>('')

const filteredTable = ref<ITableListItem[]>(tableList.value)

const setQueryValue = async (queryName: string, value: string) => {
  await router.push({
    query: {
      ...route.query,
      [queryName]: value
    }
  })
}

const filterTable = () => {
  setQueryValue('searchQuery', searchValue.value as string)

  filteredTable.value = tableList.value.filter((row) => {
    if (!searchValue.value || !searchValue.value.length) {
      return true
    }

    return row.query.search(RegExp(`${searchValue.value}`)) !== -1
  })
}

watch(searchValue, () => {
  debounce(filterTable, 250)
})
</script>

<template>
  <div class="flex flex-col gap-5 flex-start">
    <ElInput
      v-model="searchValue"
      size="large"
      class="!w-[620px]"
      placeholder="поиск по таблице..."
      :prefix-icon="Search"
    />
    <ElTable
      ref="multipleTableRef"
      :data="filteredTable"
      highlight-current-row
      border
      style="width: 100%"
      @selectionChange="selectionChange"
    >
      <ElTableColumn type="selection" width="48" />
      <ElTableColumn sortable label="IP" width="300">
        <template #default="scope">
          <div class="flex items-center gap-2">
            <MainIcon v-if="scope.row.status !== 'fail'" :path="`${scope.row.country}/Flag/Off`" />
            <span class="text-[#2C2C2C]">
              {{ scope.row.query }}
            </span>
            <img
              v-if="selectedValues.includes(scope.row)"
              src="@/assets/icons/outline/16/trash-alt.svg"
              alt="trash"
              class="w-4 h-4 ml-auto cursor-pointer"
              @click="remove(scope.$index)"
            />
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn sortable property="country" label="Country" width="414" />
      <ElTableColumn sortable property="city" label="City/Town" />
      <ElTableColumn width="48">
        <template #default="scope">
          <div class="">
            <ElPopover
              v-if="scope.row.status === 'success'"
              title="Успешно"
              placement="top-start"
              trigger="hover"
              width="100"
            >
              <template #reference>
                <img
                  src="@/assets/icons/outline/16/check.svg"
                  alt="success"
                  class="w-4 h-4 cursor-pointer"
                />
              </template>
            </ElPopover>
            <ElPopover
              v-else-if="scope.row.status === 'pending'"
              title="Выполняется"
              placement="top-start"
              trigger="hover"
              width="100"
            >
              <template #reference>
                <img
                  src="@/assets/icons/outline/16/sync.svg"
                  alt="pending"
                  class="w-4 h-4 cursor-pointer"
                />
              </template>
            </ElPopover>
            <ElPopover v-else title="Не успешно" width="100" placement="top-start" trigger="hover">
              <template #reference>
                <div class="hover:bg-[#F8E8E8] transition-colors duration-200">
                  <img
                    src="@/assets/icons/outline/16/times.svg"
                    alt="fail"
                    class="w-4 h-4 cursor-pointer"
                  />
                </div>
              </template>
            </ElPopover>
          </div>
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<style>
.el-table {
  border-radius: 8px !important;
}

.el-table tr {
  background: #f7f7f7 !important;
}

.el-table tr:nth-of-type(2n) {
  background: #f2f0f0 !important;
}
</style>
