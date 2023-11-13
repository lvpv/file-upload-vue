<template>
  <div>
    <el-button type="danger" @click="handleCreate">新增数据</el-button>
    <FormModal ref="formModal" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormModal from '@/components/FormModal.vue'

const formModal = ref<InstanceType<typeof FormModal>>()
const handleCreate = () => {
  formModal.value?.openModal()
}
</script>

<style scoped></style>
