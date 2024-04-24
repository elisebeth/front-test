<script setup lang="ts">
import MainButton from '@/components/ui/Buttons/MainButton.vue'
import MainTextArea from '@/components/ui/Inputs/MainTextArea.vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { useField, useForm } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { type IIpListItem, useIpStore } from '@/stores'

const validationSchema = toTypedSchema(
  zod.object({
    ipList: zod.string().ip({ version: 'v4' }).array()
  })
)

const { handleSubmit, errors, setFieldValue } = useForm({
  validationSchema
})

const { value: ipList } = useField('ipList', {}, { initialValue: [] })

const modelValue = ref<string | null>('')

const { setIpList, sendIpListApi } = useIpStore()

const DEFAULT_POPUP_DESCRIPTION: string = `Вы ввели неккоректные ip адреса или что-то пошло не так!\nПожалуйста, обновите страницу и попробуйте снова!`

const rawIps = computed(() => (modelValue.value as string).split('\n'))

const setLocalIps = () => {
  if (!modelValue.value || !modelValue.value.length) return

  const ips: string[] = []

  for (const ip of rawIps.value) {
    if (!ip.length) continue

    ips.push(ip)
  }

  setFieldValue('ipList', ips)
}

const ipValidate = (ip: string): IIpListItem => {
  const ipValidation = zod.string().ip({ version: 'v4' })

  try {
    const res = ipValidation.parse(ip)

    return { query: ip, validation: 'pass' }
  } catch (e) {
    return { query: ip, validation: 'fail' }
  }
}

const onSubmit = async () => {
  await sendIpListApi(ipList.value.map((ip) => ({ ...ipValidate(ip) })))
}

watch(rawIps, () => {
  setLocalIps()
})
</script>

<template>
  <form class="flex flex-col gap-5 w-[620px] items-start" @submit.prevent="onSubmit">
    <ElPopover
      :visible="errors.ipList !== undefined"
      trigger="contextmenu"
      width="300"
      placement="right-start"
      :content="DEFAULT_POPUP_DESCRIPTION"
      title="Что-то пошло не так :("
    >
      <template #reference>
        <MainTextArea v-model="modelValue" />
      </template>
    </ElPopover>
    <!--        <MainIcon path="Venezuela/Flag/Off" />-->
    <MainButton>Отправить</MainButton>
  </form>
</template>
