<template>
<div class="v-table-row">
  <div class="row_item">{{row_data.date}}</div>
  <div class="row_item">{{row_data.name}}</div>
  <div class="row_item">{{row_data.quantity}}</div>
  <div class="row_item">{{row_data.distance}}</div>
</div>
</template>

<script>
export default {
  name: "v-table-row",
  props: {
    row_data: {
      type: Object,
    }
  }
}
</script>

<style scoped>
.row_item {
  flex-basis: 25%;
  text-align: left;
  padding: 4px 8px;
}
.v-table-row {
  display: flex;
  justify-content: space-around;
}
</style>