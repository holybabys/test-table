<template>
  <div>
    <v-table
        :table_data="getItems"
    />
 </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import vTable from './components/table/v-table'
export default {

  name: 'App',
  components: {
    vTable
  },
  methods: {
...mapActions(['getDataFromApi'])
  },
  computed: {
    ...mapGetters(['getItems'])
  },
  mounted() {
    this.getDataFromApi()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
