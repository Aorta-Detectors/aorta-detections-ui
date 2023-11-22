<template>
    <form
    v-if="!isDragging"
    @submit.prevent
    @dragover.prevent="handleDragOver"
    @dragenter.prevent="handleDragEnter"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
    class="bg-white col-span-2 text-gray-300 group border hover:border-2 duration-300 hover:cursor-pointer transition-all relative border-dashed border-theme-primary0 h-[400px] rounded-xl flex justify-center items-center w-full"
    >
    <div class="flex items-center justify-center flex-col space-y-2 group-hover:text-theme-primary10">
        <HeroIcon icon-type="outline" icon-name="ArrowUpTrayIcon" />
        <span>Загрузить DICOM файл</span>
    </div>
    <input
        type="file"
        ref="fileInput"
        @change="handleFileChange"
        style="display: none"
    />
    </form>
    <a v-else="!isDragging" href="#" class="group block col-span-2 rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg hover:bg-slate-100">
        <div class="flex items-center">
            <svg class="h-6 w-6 stroke-sky-500" fill="none" viewBox="0 0 24 24"><!-- ... --></svg>
            <h3 class="text-slate-900 text-sm font-semibold">{{ fileName }}</h3>
            <button @click="deleteFile()" class="ml-auto bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"> Удалить </button>
        </div>
    </a>
</template>
  
<script>
  import HeroIcon from '@/components/common/HeroIcon.vue'
  export default {
    data() {
      return {
        isDragging: false,
        fileName: "пустое имя файла",
        file: null
      };
    },
    components: { HeroIcon },
    methods: {
      handleDragOver(event) {
        event.dataTransfer.dropEffect = 'copy'; // or 'move'
        this.isDragging = false;
      },
      handleDragEnter() {
        this.isDragging = false;
      },
      handleDragLeave() {
        this.isDragging = false;
      },
      handleDrop(event) {
        event.preventDefault();
        this.isDragging = true;
  
        const files = event.dataTransfer.files;
        this.handleFiles(files);
      },
      handleFileChange() {
        const files = this.$refs.fileInput.files;
        this.handleFiles(files);
      },
      handleFiles(files) {
        this.file = files[0]
        this.fileName = this.file.name
        this.$emit('file_changed', this.file);
        console.log("fileName: ", this.fileName);
        console.log(files);
      },
      deleteFile(){
        this.isDragging = false
        this.fileName = "пустое имя файла"
        this.file = null
        this.$emit('file_changed', this.file);
      },
    },
  };
  </script>
  

  