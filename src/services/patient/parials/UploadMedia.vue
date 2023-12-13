<template>
  <div>
    <input
      :disabled="isUploading"
      @change.prevent="zipFileInserted"
      ref="zipFile"
      class="hidden"
      type="file"
      :id="id"
      name="zipFile"
      accept=".zip"
    />
    <label
      :for="id"
      :class="isUploading ? 'cursor-not-allowed' : 'hover:bg-opacity-100'"
      class="bg-black text-white bg-opacity-50 px-4 cursor-pointer py-2 inline-flex space-x-2 items-center leading-none rounded-full text-sm"
    >
      <HeroIcon
        :class="isUploading ? 'animate-spin' : ''"
        icon-type="outline"
        :icon-name="isUploading ? 'ArrowPathIcon' : 'CloudArrowUpIcon'"
      />
      <span>{{ isUploading ? 'Загрузка...' : 'Загрузить файлы' }}</span>
    </label>
  </div>
</template>

<script>
import HeroIcon from '@/components/common/HeroIcon.vue'
import { infoBasePath } from '@/services/patient/requests'
import api from '@/http'

export default {
  name: 'UploadMedia',
  components: { HeroIcon },
  props: {
    id: String,
    apiUrl: {
      type: String,
      required: true
    },
    appointment_id: {
      type: [String, Number],
      required: true
    }
  },

  emits: ['onUploadCompleted'],

  data() {
    return {
      files: null,
      isUploading: false,
      uploadedImages: []
    }
  },

  methods: {
    async zipFileInserted() {
      this.isUploading = true

      this.files = this.$refs.zipFile.files
      let fd = new FormData()
      fd.append('file', this.files[0])
      await this.sendFile(fd)
      this.$emit('onUploadCompleted')
    },

    async sendFile(file) {
      await api.put(`${infoBasePath}/add_file?appointment_id=${this.appointment_id}`, file, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 1000000 // TODO: choose the optimal one
      })

      this.isUploading = false
    }
  }
}
</script>
