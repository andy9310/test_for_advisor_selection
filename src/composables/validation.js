import { getUid } from '../utils/uid'
import { computed, unref, inject, ref, onBeforeMount, onBeforeUnmount, onMounted, watch, nextTick } from 'vue'

export function useValidation(props, validationModel, id = getUid()) {
  const form = inject('validation')
  const uid = computed(() => props.title ?? unref(id))
  const internalErrorMessages = ref([])

  const isValid = computed(() => {
    if (!props.rules.length) return true
    else {
      return !internalErrorMessages.value.length
    }
  })
  const isValidating = ref(false)

  const validate = async (final = false) => {
    const results = []

    isValidating.value = true
    for (const rule of final ? [...props.rules, ...props.extraRules] : props.rules) {
      const result = await rule(validationModel.value)

      if (result === true) continue

      if (result !== false && typeof result !== 'string') {
        console.warn(
          `${result} is not a valid value. Rule functions must return boolean true or a string.`
        )

        continue
      }

      results.push(result || '')
    }

    internalErrorMessages.value = results
    nextTick(() => isValidating.value = false)

    return internalErrorMessages.value
  }

  onBeforeMount(() => {
    form?.register({
      id: uid.value,
      validate
    })
  })

  onBeforeUnmount(() => {
    form?.unregister(uid.value)
  })

  onMounted(async () => {
    form?.update(uid.value, isValid.value, internalErrorMessages.value)
  })

  watch(isValid, () => {
    form?.update(uid.value, isValid.value, internalErrorMessages.value)
  })

  watch(
    props.validateOnRuleChange ? [validationModel, () => props.rules] : validationModel,
    () => {
      if (validationModel.value != null) {
        validate()
      }
    }
  )

  return {
    errorMessages: internalErrorMessages,
    isValid,
    isValidating,
    validate
  }
}

