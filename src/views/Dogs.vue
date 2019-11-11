<template>
<div class="columns">
    <div class="column">
        <button class="button is-normal is-info is-outlined is-fullwidth"><span class="icon is-small"><i class="fas fa-plus"></i></span>&nbsp;&nbsp;Add new item</button><br />
        <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
                <tr>
                    <th><abbr title="Position">Pos</abbr></th>
                    <th>Team</th>
                    <th><abbr title="Played">Pld</abbr></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                      <th>1</th>
                      <td>
                          <a href="" title="">Leicester City</a> <strong>(C)</strong>
                      </td>
                      <td>38</td>
                </tr>
                <tr>
                    <th>2</th>
                    <td><a href="" title="">Arsenal</a></td>
                    <td>38</td>
                </tr>
                <tr>
                    <th>3</th>
                    <td><a href="" title="">Tottenham Hotspur</a></td>
                    <td>38</td>
                </tr>
                <tr class="is-selected">
                    <th>4</th>
                    <td><a href="" title="">Manchester City</a></td>
                    <td>38</td>
                </tr>
                <tr>
                    <th>5</th>
                    <td><a href="" title="">Manchester</a></td>
                    <td>38</td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
//import Guest from "@/components/Guest.vue";
import EventBus from '@/bus';

export default {
  name: "dogs",
  data() {
    return {
      modelName: 'dog'
    };
  },
  components: {
  },
  mounted () {
    EventBus.$emit('FETCH_MODEL', this.modelName);
  }
};
</script>
