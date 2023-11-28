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
    <el-scrollbar height="550px" class="p-x-2">
      <el-form label-position="top" ref="createUserForm" :model="user" :rules="userRules">
        <el-form-item label="附件" prop="attachments">
          <FileUpload title="请选择附件" ref="fileUpload" @change-files="changeFiles" />
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
  <!--  <FileUploadDrawer title="上传文件" @change-files="changeFiles" ref="fileUploadDrawer" />-->
</template>

<script setup lang="ts" name="FormModal">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
// import FileUploadDrawer from '@/components/FileUploadDrawer.vue'
import FileUpload from '@/components/FileUpload/FileUpload.vue'

const createUserForm = ref<FormInstance>()
// const fileUploadDrawer = ref<InstanceType<typeof FileUploadDrawer>>()
const fileUpload = ref<InstanceType<typeof FileUpload>>()
const dialogVisible = ref<boolean>(false)
const submitLoading = ref<boolean>(false)

const user = ref<{ attachments: File[] }>({
  attachments: []
})

/*const validatorAge = (_: any, value: number, callback: any) => {
  if (!value) {
    callback(new Error('请输入年龄'))
  } else if (value < 0 || value > 150) {
    callback(new Error('年龄必须在0-150之间'))
  } else {
    callback()
  }
}*/

const userRules = reactive<FormRules<{ attachments: File[] }>>({
  /* username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { validator: validatorAge, trigger: 'blur' }
  ],
  files: [{ required: true, message: '请上传头像', trigger: 'change' }],*/
  attachments: [{ required: true, message: '请上传附件', trigger: 'change' }]
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

const changeFiles = (files: File[]) => {
  console.log('FormModal', files)
  user.value.attachments = files
  console.log(user.value)
}

/**
 * 上传文件按钮点击事件
 *!/
const handleUpload = () => {
  if (user.value.files && user.value.files.length > 0) {
    const files = user.value.files.map((file) => {
      return {
        uid: file.id,
        name: file.name,
        url: file.path,
        status: 'success'
      } as UploadUserFile
    })
    fileUploadDrawer.value?.openUploadDrawer(files)
  } else {
    fileUploadDrawer.value?.openUploadDrawer([])
  }
}*/
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
