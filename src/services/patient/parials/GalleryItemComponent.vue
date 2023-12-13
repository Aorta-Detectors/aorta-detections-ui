<template>
  <a
    :title="alt"
    data-fancybox="gallery"
    :href="'data:image/gif;base64,' + src"
    class="relative group h-[12rem] w-full bg-white shadow p-1"
  >
    <span
      class="absolute text-xs left-4 bottom-4 bg-white w-5 h-5 flex justify-center items-center rounded-full flex-shrink-0"
      >{{ id + 1 }}</span
    >
    <div
      @click.stop.prevent
      class="absolute right-4 top-4 z-10 space-x-2 group-hover:flex hidden items-center"
    >
      <button type="button" @click.prevent="HandleGetSliceInfo" class="bg-white rounded-full">
        <HeroIcon
          icon-type="outline"
          icon-name="EyeIcon"
          class="block h-6 w-6 text-black"
          aria-hidden="true"
        />
      </button>
    </div>
    <img
      class="h-full w-full max-w-full object-cover"
      :src="'data:image/gif;base64,' + src"
      :alt="alt"
    />
    <div
      aria-hidden="true"
      class="absolute inset-x-0 bottom-0 border h-[12rem] group-hover:flex hidden transition-all duration-200 bg-gradient-to-t from-black opacity-40"
    />
    <div
      @click.stop.prevent
      class="absolute transition-all duration-200 bottom-4 text-white group-hover:flex hidden w-full"
    ></div>
  </a>
</template>

<script>
import HeroIcon from '@/components/common/HeroIcon.vue'
export default {
  name: 'GalleryItemComponent',
  components: { HeroIcon },
  props: {
    modelValue: Array,
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: 'image name'
    },
    id: {
      type: [String, Number],
      required: true
    }
  },

  emits: ['onGetSliceInfo'],

  methods: {
    HandleGetSliceInfo() {
      this.$emit('onGetSliceInfo', this.id)
    }
  }
}
</script>