<script>
import { ref, provide } from 'vue';
export default {
    setup(){
        const items = ref([]);
        provide('validation', {
            register: ({ id, validate }) => {
                if (items.value.some((item) => item.id === id)) {
                console.warn(`Duplicate input name "${id}"`)
                }

                items.value.push({
                id,
                validate,
                isValid: null,
                errorMessages: []
                })
            },
            unregister: (id) => {
                items.value = items.value.filter((item) => {
                return item.id !== id
                })
            },
            update: (id, isValid, errorMessages) => {
                const found = items.value.find((item) => item.id === id)

                if (!found) return

                found.isValid = isValid
                found.errorMessages = errorMessages
            }
        })

    },
    methods:{
        async validate(extra = false) {
            const results = []
            let valid = true
            for (const item of this.$items.value) {
                const itemErrorMessages = await item.validate(extra)

                if (itemErrorMessages.length > 0) {
                valid = false

                results.push({
                    id: item.id,
                    errorMessages: itemErrorMessages
                })
                }
            }
            return { valid, errors: results }
        }
    }
};
</script>

<template>
  <div>
    <slot></slot>
  </div>
</template>
