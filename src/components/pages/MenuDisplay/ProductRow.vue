<template>
  <div :class="{ selected: isSelected }" @click="displayProduct(product)">
    <tr class="flower-info-container">
      <td
        class="product-name"
        :class="[dynamicNameClass, dynamicPriceColor(product.price)]"
      >
        {{ product.productName }}
      </td>
      <td v-if="hasTest" class="product-test" :class="dynamicTestClass">
        {{ product.thc }}%, {{ product.cbd }}%
      </td>
      <td v-if="hasWeight" class="product-weight" :class="dynamicWeightClass">
        {{ product.weight }}
      </td>
      <td
        v-if="this.product !== 'topical'"
        class="product-type"
        :class="[dynamicTypeClass, dynamicTypeColor(product.type)]"
      >
        {{ product.type }}
      </td>
      <td
        class="product-price"
        :class="[dynamicPriceClass, dynamicPriceColor(product.price)]"
      >
        ${{ product.price }}
      </td>
    </tr>

    <tr v-if="isSelected" class="flower-info-container">
      <td class="farm-name">by {{ product.farm }}</td>
      <td class="add-to-cart active">
        <button>Add To Cart</button>
      </td>
    </tr>
  </div>
</template>

<script>
export default {
  props: ['product', 'productType'],
  data() {
    return {
      autoTesting: ['flower', 'preroll', 'cartridge', 'concentrate'],
      productsWithWeight: ['preroll', 'cartridge', 'concentrate'],
      isSelected: false,
    };
  },
  computed: {
    hasWeight() {
      return this.productsWithWeight.indexOf(this.productType) !== -1;
    },
    hasTest() {
      return this.autoTesting.indexOf(this.productType) !== -1;
    },
    dynamicNameClass() {
      return `${this.productType}-name`;
    },
    dynamicTestClass() {
      return `${this.productType}-test`;
    },
    dynamicWeightClass() {
      return `${this.productType}-weight`;
    },
    dynamicTypeClass() {
      return `${this.productType}-type`;
    },
    dynamicPriceClass() {
      return `${this.productType}-price`;
    },
  },
  methods: {
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
      if (this.productType === 'flower') {
        if (price === 5 || price === 3) {
          return 'highlight';
        }
      }
    },
    displayProduct(product) {
      this.isSelected = !this.isSelected;
      console.log(product);
    },
  },
};
</script>

<style lang="scss">
.selected {
  // background-color: var(--app-background-color);
  // color: var(--highlight-text-color);
  border: 2px solid var(--highlight-text-color);
  border-radius: 5px;
  padding: 5px;
  margin: 5px 0 5px 0;
}

.farm-name {
  font-style: italic;
}
</style>
