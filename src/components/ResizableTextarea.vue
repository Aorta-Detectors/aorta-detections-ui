<template>
    <div>
        <label :for="id" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
        <textarea
            :id="id"
            :value="modelValue"
            @input="resizeTextarea"
            ref="textarea"
            class="ad-input"
            rows='6'
        ></textarea>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      id: String,
      label: String,
      modelValue: String,
    },
    data() {
      return {
        text: '',
      };
    },

    emits: ["update:modelValue"],

    methods: {
      resizeTextarea(event) {
        this.$refs.textarea.style.height = 'auto';
        this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px';
        this.$emit('update:modelValue',  event.target.value)
      },
    },
  };
  </script>