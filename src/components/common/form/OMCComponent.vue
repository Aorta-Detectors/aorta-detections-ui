<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <label for="OMC" class="block mb-2 text-sm font-medium text-gray-900"
        >Номер полиса ОМС:</label
      >
      <LoadingComponent :is-loading="isLoading" />
    </div>
    <input
      type="text"
      v-imask="mask"
      @accept="onAccept"
      @complete="onComplete"
      @keyup.delete="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
      id="OMC"
      class="ad-input text-2xl font-bold text-center"
      placeholder=""
    />
    <ErrorComponent :errors="errorsList" />
  </div>
</template>

<script>
import { IMaskDirective } from 'vue-imask'
import ErrorComponent from '@/components/common/ErrorComponent.vue'
import HeroIcon from '@/components/common/HeroIcon.vue'
import LoadingComponent from '@/components/common/LoadingComponent.vue'
export default {
  name: 'OMCComponent',
  components: { LoadingComponent, HeroIcon, ErrorComponent },
  props: {
    modelValue: String,
    isLoading: Boolean,
    modelValueError: {
      type: Boolean,
      default: false
    },

    errorsList: {
      type: [Array, Object],
      default: () => []
    }
  },

  directives: {
    imask: IMaskDirective
  },

  data() {
    return {
      value: '',
      mask: {
        mask: '0000-0000-0000-0000',
        lazy: false
      }
    }
  },

  emits: ['update:modelValue', 'onCompleted', 'onAccept'],

  methods: {
    onAccept(e) {
      const maskRef = e.detail
      this.value = maskRef.value
      this.$emit('onAccept', maskRef.unmaskedValue)
      //TODO: if not complete event
    },
    onComplete(e) {
      const maskRef = e.detail
      this.$emit('update:modelValue', maskRef.unmaskedValue)
      this.$emit('onCompleted', maskRef.unmaskedValue)
    }
  }
}
</script>
