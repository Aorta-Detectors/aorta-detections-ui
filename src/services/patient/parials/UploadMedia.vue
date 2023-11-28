<template>
  <div>
    <input
      :disabled="isUploading"
      @change.prevent='zipFileInserted'
      ref="zipFile"
      class="hidden"
      type="file" id="zipFile" name="zipFile" accept=".zip"
    />
    <label
      for="zipFile"
      :class="isUploading ? 'cursor-not-allowed' : 'hover:bg-opacity-100'"
      class="bg-black text-white bg-opacity-50 px-4 cursor-pointer py-2 inline-flex space-x-2 items-center leading-none rounded-full text-sm"
    >
      <HeroIcon
        :class="isUploading ? 'animate-spin' : ''"
        icon-type="outline"
        :icon-name="isUploading ? 'ArrowPathIcon' : 'CloudArrowUpIcon'"
      />
      <span>{{ isUploading ? "Загрузка..." : "Загрузить файлы" }}</span>
    </label>
  </div>
</template>

<script>
import HeroIcon from '@/components/common/HeroIcon.vue'
import InfoRequests, { infoBasePath } from '@/services/patient/requests'
import api from '@/http'

export default {
  name: "UploadMedia",
  components: { HeroIcon },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
    appointment_id: {
      type: [String,Number],
      required: true,
    },
  },

  emits: ["onSeeNormalVersion"],

  data() {
    return {
      options: {
        Carousel: {
          infinite: false,
        },
      },
      value: 0,
      max: 100,
      total: 0,
      files: null,
      isUploading: false,
      uploadedImages: [],
    };
  },

  methods: {
    async zipFileInserted() {
      this.isUploading = true;

      this.files = this.$refs.zipFile.files;
      let fd = new FormData();
      fd.append("file", this.files[0]);
      await this.sendFile(fd);
    },

    resetPreviewState() {
      this.value = 0;
      this.files = null;
    },

    async sendFile(file) {
      await api.put(`${infoBasePath}/add_file?appointment_id=${this.appointment_id}`, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 1000000 // TODO: choose the optimal one
      });

      this.isUploading = false
    },
  },
};
</script>

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>
