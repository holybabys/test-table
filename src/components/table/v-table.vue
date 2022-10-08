<template>
  <div class="v-table">
    <div class="v-table_settings">
      <select class="mr-10" v-model="selectColumn">
        <option v-for="(select, index) in columnOptions" :key="index" :value="select.value">
          {{ select.text }}
        </option>
      </select>
      <select class="mr-10" v-model="selectСondition">
        <option v-for="(select, index) in conditionOptions" :key="index" :value="select.value">
          {{ select.text }}
        </option>
      </select>
      <input class="mr-10" v-model="text" type="text">
      <button class="btn success-btn" v-if="show" @click="filter">
        Применить фильтр
      </button>
      <button class="btn error-btn" v-if="!show" @click="reset">
        Сбросить фильтр
      </button>
    </div>

    <div v-if="validError" class="error">
      Все поля обязательны для заполенения
    </div>
    <div class="v-table_header">
      <p>Дата</p>
      <p>Название</p>
      <p>Количество</p>
      <p>Расстояние</p>
    </div>
    <div class="v-table_body">
      <p v-if="!paginatednData[0]">
        Данных нет
      </p>
      <v-table-row
          v-for="row in  paginatednData"
          :key="row.id"
          :row_data="row"
      />

    </div>
    <div class="v-table_pagination">
      <div v-for="page in pages" :key="page" :class="{'page_selected':page === pageNumber}" class="page"
           @click="pagination(page)">
        {{ page }}
      </div>
    </div>
  </div>
</template>

<script>
import vTableRow from './v-table-row'
import {mapActions, mapMutations} from "vuex";

export default {
  name: "v-table",
  components: {
    vTableRow
  },
  props: {
    table_data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      perPage: 10,
      pageNumber: 1,
      columnOptions: [
        {text: 'Название', value: 'name'},
        {text: 'Количество', value: 'quantity'},
        {text: 'Расстояние', value: 'distance'}
      ],
      conditionOptions: [
        {text: 'Равно', value: 'equally'},
        {text: 'Содержит', value: 'contains'},
        {text: 'Больше', value: '>'},
        {text: 'Меньше', value: '<'},
      ],
      selectColumn: '',
      selectСondition: '',
      text: '',
      show: true,
      validError: false
    }
  },
  methods: {
    ...mapMutations(['SET_FILTER', 'SET_ITEMS']),
    ...mapActions(['getDataFromApi']),
    pagination(page) {
      this.pageNumber = page
    },
    filter() {
      if (this.selectColumn !== '' && this.selectСondition !== '' && this.text !== '') {
        this.SET_FILTER({column: this.selectColumn, method: this.selectСondition, text: this.text})
        this.show = false
        this.validError = false
      } else {
        this.validError = true
      }
    },
    reset() {
      this.getDataFromApi()
      this.text = ''
      this.selectColumn = ''
      this.selectСondition = ''
      this.show = true
    }
  },
  computed: {
    pages() {
      return Math.ceil(this.table_data.length / 10)
    },
    paginatednData() {
      let from = (this.pageNumber - 1) * this.perPage
      let to = from + this.perPage
      return this.table_data.slice(from, to)
    },
  }
}
</script>

<style scoped>
.v-table_header {
  display: flex;
  border-bottom: solid 2px gray;
  justify-content: space-between;
}

.v-table_header p {
  flex-basis: 25%;
  text-align: left;
}

.v-table_pagination {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.page {
  padding: 8px;
  border: solid 1px gray;
  margin-right: 5px;
}

.page:hover {
  background: slategray;
  cursor: pointer;
  color: white;
}
.btn {
  border-radius: 5px;
  padding: 4px;
  text-align: center;
}
.page_selected {
  background: slategray;
}
.mr-10 {
  margin-right: 10px;
}
.success-btn {
  background-color: #9dd035;
  border-color: #9dd035;
}
.error-btn {
  background-color: red;
  border-color: red;
}
.error {
  color: red;
}
</style>