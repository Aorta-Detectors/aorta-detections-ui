<template>
  <ul
    class="text-red-500 list-inside text-sm mt-1.5"
    :class="{ 'list-disc': errors && errors?.length > 1 }"
    v-for="(error, index) in errors"
    :key="index"
  >
    <li class="error-msg">{{ error.$message }}</li>
  </ul>
</template>

<script>
export default {
  name: 'ErrorComponent',
  props: {
    errors: {
      type: [Array],
      default: () => []
    }
  }
}
</script>
