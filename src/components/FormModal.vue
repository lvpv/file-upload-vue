<template>
  <el-dialog
    v-model="dialogVisible"
    lock-scroll
    draggable
    append-to-body
    destroy-on-close
    title="新增用户"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-scrollbar height="400px">
      <el-form label-position="top" ref="createUserForm" :model="user" :rules="userRules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input-number v-model="user.age" :controls="true" />
        </el-form-item>
        <el-form-item label="头像" error="文件不能为空">
          <el-button @click="handleUpload" type="primary">选择文件</el-button>
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <div>
        <el-button text @click="handlerReset">重置</el-button>
        <el-button @click="handlerCancel">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handlerSubmit">添加</el-button>
      </div>
    </template>
  </el-dialog>
  <FileUpload title="上传文件" :files="user.files" ref="fileUpload" />
</template>

<script setup lang="ts" name="FormModal">
import { reactive, ref } from 'vue'
import type { User } from '@/api/system/User'
import FileUpload from '@/components/FileUpload.vue'
import type { FormInstance, FormRules } from 'element-plus'

const createUserForm = ref<FormInstance>()
const fileUpload = ref<InstanceType<typeof FileUpload>>()
const dialogVisible = ref<boolean>(false)
const submitLoading = ref<boolean>(false)

const user = ref<User>({
  username: '',
  age: null,
  files: []
})

const validatorAge = (_: any, value: number, callback: any) => {
  if (!value) {
    callback(new Error('请输入年龄'))
  } else if (value < 0 || value > 150) {
    callback(new Error('年龄必须在0-150之间'))
  } else {
    callback()
  }
}

const userRules = reactive<FormRules<User>>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { validator: validatorAge, trigger: 'blur' }
  ],
  files: [{ required: true, message: '请上传头像', trigger: 'change' }]
})

/**
 * 显示添加表单Dialog
 */
const openModal = () => {
  dialogVisible.value = true
}
/**
 * 向父组件暴露方法
 */
defineExpose({ openModal })

/**
 * 上传文件按钮点击事件
 */
const handleUpload = () => {
  fileUpload.value?.openUploadDrawer()
}
/**
 * 重置事件
 */
const handlerReset = () => {
  createUserForm?.value.resetFields()
}

/**
 * 取消提交
 */
const handlerCancel = () => {
  handlerReset()
  dialogVisible.value = false
}

/**
 * 添加用户
 */
const handlerSubmit = () => {
  submitLoading.value = true
  try {
    createUserForm?.value.validate((valid: boolean) => {
      if (valid) {
        console.log(user.value)
        dialogVisible.value = false
      } else {
        console.log('error submit!!')
      }
    })
  } catch (err) {
    console.log(err)
  } finally {
    submitLoading.value = false
  }
}
</script>

<style scoped></style>
