<template>
    <table class="table is-fullwidth is-striped is-hoverable">
        <thead>
            <tr>
                <th v-for="(colName, index) in ths" :key="index">{{ colName }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in items" :key="item.id" :class="{ 'is-selected': currentCount + index == selected }">
                <th>{{ currentCount + index + 1 }}</th>
                <td>
                    <router-link @click.native="sel(currentCount, index)" :to="`/${model}/${item.id}/`" exact>
                        {{ item.name || item.purpose || item.fio }}
                    </router-link>
                </td>
                <td>
                    {{ item.kind ? item.kind : item.sum ? `$${item.sum}` : '-' }}
                </td>
            </tr>
        </tbody>
        <tfoot class="is-hidden">
          <!-- to make this component always update and invoke updated hook -->
          {{ trick }}
        </tfoot>
    </table>
</template>

<script>
export default {
    name: "List",
    methods: {
        sel(currentCount, index) {
            this.$eventBus.$emit('ITEM_SELECTED', currentCount + index);
        },
        showFirst() {
            if (!['item', 'add'].includes(this.$route.name) && !this.selected) {
                this.$router.push(`/${this.model}/${this.items[0].id}/`);
            }
        }
    },
    props: {
        ths: {
            required: true,
            type: Array
        },
        model: {
            required: true,
            type: String
        },
        items: {
            required: true,
            type: Array
        },
        selected: {
            required: true,
            type: Number
        },
        trick: {
            required: true,
            type: Number
        },
        currentCount: {
            required: true,
            type: Number
        },
    },
    created() {
        this.showFirst();
    },
    updated() {
        this.showFirst();
    },
};
</script>
