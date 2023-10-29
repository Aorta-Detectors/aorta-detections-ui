<template>
  <component :class="[iconSize ? `w-${iconSize}` : 'w-5']"  :is="getIcon(iconName,iconType)" />
</template>


<script>
import * as solid from "@heroicons/vue/24/solid";
import * as outline from "@heroicons/vue/24/outline";

export default {
  name: "HeroIcon",

  props:{
    iconName: {
      type: String,
      required:true
    },
    iconType: {
      type: String,
      required: true
    },
    iconSize: {
      type: [Number, String],
      default: 5
    }
  },

  computed: {
    icons() {
      return { solid, outline };
    },

    icon() {
      return this.icons[this.outline ? 'outline' : 'solid'][this.name];
    },
  },

  methods: {
    getIcon(name, type) {
      return this.icons[type][name]
    },
  }
}

</script>