<template>
<table class="table is-fullwidth is-striped is-hoverable">
    <thead>
        <tr>
            <th v-for="(colName, index) in ths" :key="index">{{ colName }}</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(item, index) in items" :key="item.id" :class="{ 'is-selected': !index }">
            <th>{{ index + 1 }}</th>
            <td>
                <router-link :to="`/${model}/${item.id}`" exact>
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
export default {
  name: "List",
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
    }
  }
};
</script>
