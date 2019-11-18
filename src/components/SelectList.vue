<template>
    <div class="field">
        <label class="label">{{ label }}:</label>
        <div class="control">
            <div class="select">
                <select :value="value" @input="$emit('input', +$event.target.value)">
                    <optgroup :label="label">
                        <option v-for="item in items" :value="item.id" :key="item.id">
                            {{ item[fieldName] }}
                        </option>
                    </optgroup>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SelectList",
    props: {
        label: {
            required: true,
            type: String
        },
        fieldName: {
            required: true,
            type: String
        },
        items: {
            required: true,
            type: Array
        },
        value: {
            required: true,
            type: Number
        }
    }
};
</script>
