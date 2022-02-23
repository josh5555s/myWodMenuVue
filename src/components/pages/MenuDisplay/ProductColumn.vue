<template>
  <div class="table-container">
    <table class="table" v-for="(product, rowIndex) in tableData" :key="product">
      <column-sorter
        :tableIndex="tableIndex"
        :rowIndex="rowIndex"
        :sortBy="sortBy"
        :flipDirection="flipDirection"
        @update-sort-by="updateSortBy"
      ></column-sorter>

      <product-row :product="product" :productType="productType"></product-row>
    </table>
  </div>
</template>

<script>
import ColumnSorter from './ColumnSorter.vue';
import ProductRow from './ProductRow.vue';

export default {
  components: {
    ColumnSorter,
    ProductRow,
  },
  props: ['tableData', 'sortBy', 'productType', 'tableIndex', 'flipDirection'],
  emits: ['set-sort-by'],
  data() {
    return {};
  },
  computed: {},
  methods: {
    updateSortBy(byThis) {
      this.$emit('set-sort-by', byThis);
      this.$gtag.event('columnClick', {
        event_category: 'interaction',
        event_label: 'user clicked on a product column',
        value: byThis,
      });
    },
  },
};
</script>
