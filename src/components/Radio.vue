<!-- <script setup>
import { ref, toRefs, computed, watch } from 'vue'
const props = defineProps({
  name: String,
  items: Array,
  inline: { type: Boolean, required: false, default: false },
  values: { type: Array, required: false },
  modelValue: { default: null },
  disabled: { type: Boolean, required: false, default: false }
})
const emit = defineEmits(['update:modelValue'])

const { name, inline, disabled, modelValue, values, items } = toRefs(props)

const options = computed(() => {
  return Array.from({ length: items.value.length }, (_, i) => ({
    item: items.value[i],
    value: (values.value ?? items.value)[i]
  }))
})

if (
  options.value?.[0]?.value &&
  (modelValue.value === undefined || modelValue.value === null || modelValue.value === '')
) {
  emit('update:modelValue', options.value[0].value)
}
watch([options, modelValue], () => {
  if (
    options.value?.[0]?.value &&
    (modelValue.value === undefined || modelValue.value === null || modelValue.value === '')
  ) {
    emit('update:modelValue', options.value[0].value)
  }
})
/*
text: placeholder
date: start, end
datetime: start, end
textarea: placeholder
*/
</script>

<template>
  <div class="py-2">
    <div v-for="(option, index) in options" class="mr-8" :class="{ 'inline-block': inline }">
      <label class="pl-[20px] leading-8">
        {{ option.item }}
        <input
          type="radio"
          :name="name"
          :value="option.value"
          :checked="modelValue == option.value"
          :disabled="disabled"
          @click="emit('update:modelValue', option.value), console.log(option.value)"
        />
        <span class="checkmark h-[16px] w-[16px]"></span>
      </label>
    </div>
  </div>
</template>

<style scoped>
label {
  @apply relative inline-block cursor-pointer;
}

label input {
  @apply absolute cursor-pointer opacity-0;
}

.checkmark {
  @apply absolute bottom-0 left-0 top-0 mx-0 my-auto rounded-full border-2 border-border bg-white;
}

/* On mouse-over, add a grey background color */
label:hover input ~ .checkmark {
  @apply bg-white;
}

/* When the radio button is checked, add a blue background */
label input:checked ~ .checkmark {
  @apply border-iconColor bg-iconColor;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  @apply absolute hidden content-[""];
}

/* Show the indicator (dot/circle) when checked */
label input:checked ~ .checkmark:after {
  @apply block;
}

/* Style the indicator (dot/circle) */
label .checkmark:after {
  @apply absolute bottom-0 left-0 right-0 top-0 m-auto h-[8px] w-[8px] rounded-full bg-white;
}
</style> -->
