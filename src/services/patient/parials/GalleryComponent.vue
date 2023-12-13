<script>
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export default {
  props: {
    options: Object,
    mediaContainer: String,
  },
  mounted() {
    Fancybox.bind(this.$refs.container, "[data-fancybox]", {
      ...(this.options || {}),
    });
  },
  updated() {
    Fancybox.unbind(this.$refs.container);
    Fancybox.close();

    Fancybox.bind(this.$refs.container, "[data-fancybox]", {
      ...(this.options || {}),
    });
  },
  unmounted() {
    Fancybox.destroy();
  },
};
</script>

<template>
  <div
    ref="container"
    :class="
      !!mediaContainer
        ? mediaContainer
        : 'grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-4'
    "
  >
    <slot></slot>
  </div>
</template>

<style></style>
