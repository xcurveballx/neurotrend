<template>
<table class="table is-fullwidth is-striped is-hoverable">
    <thead>
        <tr>
            <th v-for="(colName, index) in ths" :key="index">{{ colName }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(item, index) in items" :key="item.id" :class="{ 'is-selected': index == selected }">
            <th>{{ index + 1 }}</th>
            <td>
                <router-link @click.native="sel(index)" :to="`/${model}/${item.id}/`" exact>
                    {{ item.name || item.purpose || item.fio }}
                </router-link>
            </td>
            <td>
                {{ item.kind ? item.kind : item.sum ? `$${item.sum}` : '-' }}
            </td>
        </tr>
    </tbody>
</table>
</template>

<script>
import EventBus from '@/bus';

export default {
  name: "List",
  methods: {
    sel (index) {
      EventBus.$emit('ITEM_SELECTED', index);
    },
    showFirst () {
      if (!this.$route.params.id && !this.selected)
        this.$router.push(`/${this.model}/${this.items[0].id}/`);
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
    }
  },
  created() {
    this.showFirst();
  },
  updated() {
    this.showFirst();
  }
};
</script>
