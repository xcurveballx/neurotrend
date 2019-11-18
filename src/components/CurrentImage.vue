<template>
    <div class="field">
        <label class="label">Current image:</label>
        <div class="control">
            <input disabled class="input" type="text" :value="photo">
        </div>
    </div>
</template>

<script>
export default {
    name: "CurrentImage",
    props: {
        photo: {
            required: true,
            type: String
        }
    }
};
</script>
