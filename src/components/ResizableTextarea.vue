<template>
    <div>
        <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
        <textarea
            :id="id"
            :v-model="model"
            @input="resizeTextarea"
            ref="textarea"
            class="ad-input"
        ></textarea>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      id: String,
      label: String,
      model: String,
    },
    data() {
      return {
        text: '',
      };
    },
    methods: {
      resizeTextarea() {
        this.$refs.textarea.style.height = 'auto';
        this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px';
      },
    },
  };
  </script>