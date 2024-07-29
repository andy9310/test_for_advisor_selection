<!-- <script setup>
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config.js'

const {
  theme: { colors }
} = resolveConfig(tailwindConfig)

const { theme } = defineProps({
  theme: { type: String }
})
</script>
<template>
  <span
    :style="{
      backgroundColor:
        theme == 'gold' ? colors.goldBg : theme == 'blue' ? colors.blueTagBg : colors.succeedBg,
      color: theme == 'gold' ? colors.gold : theme == 'blue' ? colors.blueTag : colors.succeed
    }"
    class="mx-1 inline-block rounded-md px-2 py-1"
  >
    <slot></slot>
  </span>
</template> -->
