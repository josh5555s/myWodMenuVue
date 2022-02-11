<template>
  <div id="table-container">
    <table id="table" v-for="product in tableData" :key="product">
      <tr class="flower-info-container">
        <td
          class="product-name"
          :class="[dynamicNameClass, dynamicPriceColor(product.price)]"
          @click="updateSortBy('name')"
        >
          {{ product.productName }}
        </td>
        <td
          v-if="hasTest"
          class="product-test"
          :class="dynamicTestClass"
          @click="updateSortBy('test')"
        >
          {{ product.thc }}%, {{ product.cbd }}%
        </td>
        <td v-if="hasWeight" class="product-weight" :class="dynamicWeightClass">
          {{ product.weight }}
        </td>
        <td
          v-if="this.product !== 'topical'"
          class="product-type"
          :class="[dynamicTypeClass, dynamicTypeColor(product.type)]"
          @click="updateSortBy('type')"
        >
          {{ product.type }}
        </td>
        <td
          class="product-price"
          :class="[dynamicPriceClass, dynamicPriceColor(product.price)]"
          @click="updateSortBy('price')"
        >
          ${{ product.price }}
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  props: ['tableData', 'sortBy', 'product'],
  emits: ['flip-direction', 'set-sort-by'],
  data() {
    return {
      autoTesting: ['flower', 'preroll', 'cartridge', 'concentrate'],
      productsWithWeight: ['preroll', 'cartridge', 'concentrate'],
    };
  },
  computed: {
    hasWeight() {
      return this.productsWithWeight.indexOf(this.product) !== -1;
    },
    hasTest() {
      return this.autoTesting.indexOf(this.product) !== -1;
    },
    dynamicNameClass() {
      return `${this.product}-name`;
    },
    dynamicTestClass() {
      return `${this.product}-test`;
    },
    dynamicWeightClass() {
      return `${this.product}-weight`;
    },
    dynamicTypeClass() {
      return `${this.product}-type`;
    },
    dynamicPriceClass() {
      return `${this.product}-price`;
    },
  },
  methods: {
    updateSortBy(byThis) {
      this.$emit('set-sort-by', byThis);
      this.$gtag.event('columnClick', {
        event_category: 'interaction',
        event_label: 'user clicked on a product column',
        value: byThis,
      });
    },
    dynamicTypeColor(type) {
      if (type == 'Hybrid' || type == 'Balanced') {
        return 'blue';
      } else if (type == 'Sativa' || type == 'Uplifting') {
        return 'red';
      } else if (type == 'Relaxing' || type == 'Relaxed') {
        return 'purple';
      } else if (type == 'CBD') {
        return 'green';
      }
    },
    dynamicPriceColor(price) {
      if (this.product === 'flower') {
        if (price === 5 || price === 3) {
          return 'highlight';
        }
      }
    },
  },
};
</script>
