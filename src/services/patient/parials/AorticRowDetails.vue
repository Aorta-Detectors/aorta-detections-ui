<script setup lang='ts'>
const props = defineProps({
  label: String,
  labelKey: String,
  appointmentForm: {
    type: Object,
    default: ()=>{}
  }
})
const getAorticInfo = (labelKey) =>
  props.appointmentForm && props.appointmentForm.hasOwnProperty(labelKey) && props.appointmentForm[labelKey] !== null
    ? props.appointmentForm[labelKey]
    : 'None'
</script>

<template>
  <li class="">
    {{
      `${label}:  ${getAorticInfo(props.labelKey)} `
    }}
  </li>
</template>