<!-- <script setup>
import { computed, toRefs, watch } from 'vue'
import { useValidation } from '../composables/validation'
import { useProxiedModel } from '../utils/functions'

const props = defineProps({
  name: String,
  items: Array,
  inline: { type: Boolean, required: false, default: false },
  values: { type: Array, required: false },
  modelValue: { type: Array, required: false, default: [] },
  rules: { type: Array, required: false, default: [] },
  extraRules: { type: Array, required: false, default: [] },
})
const emit = defineEmits(['update:modelValue'])
const modelValue = useProxiedModel(props, 'modelValue')
const { name, items, values, inline, rules } = toRefs(props)
const { errorMessages, isValid, validate, isValidating } = useValidation(props, modelValue)

if (rules?.length > 0) {
  watch(isValidating, () => {
    console.log('validating!')
    if (isValidating.value == false && isValid.value) {
      emit('update:modelValue', modelValue.value)
    }
  })
} else {
  watch(modelValue, () => {
    emit('update:modelValue', modelValue.value)
  }, {deep: true})
}

const options = computed(() => {
  return Array.from({ length: items.value.length }, (_, i) => ({
    item: items.value[i],
    value: (values.value ?? items.value)[i]
  }))
})

const toggleOption = (optionIndex) => {
  const optionValue = options.value[optionIndex].value
  const index = modelValue.value.findIndex((item) => item == optionValue)
  if (index === -1) {
    modelValue.value.push(optionValue)
  } else {
    modelValue.value.splice(index, 1)
  }
}

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
          type="checkbox"
          :name="name"
          :value="option.value"
          @click="toggleOption(index)"
          :checked="modelValue.includes(option.value)"
        />
        <span class="checkmark h-[16px] w-[16px]"></span>
      </label>
    </div>
    <p v-if="errorMessages[0]" class="pt-1 text-sm text-error">
      {{ errorMessages[0] }}
    </p>
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
  @apply absolute bottom-0 left-0 top-0 mx-0 my-auto rounded-md border-2 border-border bg-white;
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
  @apply block h-full w-full bg-center bg-no-repeat;
  background-image: url("data:image/svg+xml,%3Csvg width='8' height='6' viewBox='0 0 8 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7.36195 0.699219L2.98945 5.07172L1.00195 3.08422' stroke='white' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
}
</style> -->
