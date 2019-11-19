<template>
    <div class="field">
        <label class="label">{{ label }}</label>
        <div class="control has-icons-left has-icons-right">
            <input :type="type" :placeholder="placeholder" class="input" :class="{'is-danger': condition}" :value="value" @input="$emit('input', $event.target.value)">
            <slot></slot>
            <span v-show="condition" class="icon is-small is-right">
                <i class="fas fa-exclamation-triangle"></i>
            </span>
        </div>
        <p v-show="condition" class="help is-danger">
            {{ String(msg) }}
        </p>
    </div>
</template>

<script>
export default {
    name: "InputWithValidation",
    props: {
        condition: {
            required: true,
            type: Boolean
        },
        msg: {
            required: false,
            type: [Array, String]
        },
        label: {
            required: true,
            type: String
        },
        placeholder: {
            required: true,
            type: String
        },
        value: {
            required: true,
            type: String
        },
        type: {
            required: false,
            type: String,
            default: "text"
        },
    }
};
</script>
