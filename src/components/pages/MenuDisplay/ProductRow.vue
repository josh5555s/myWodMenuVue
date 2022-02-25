<template>
  <div :class="{ selected: isSelected }">
    <tr class="flower-info-container" @click="displayProduct">
      <td
        class="product-name"
        :class="[dynamicNameClass, dynamicPriceColor(product.price)]"
      >
        <a>
          {{ product.productName }}
        </a>
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
    </tr>

    <tr v-if="isSelected && isAuthenticated" class="flower-info-container ">
      <td class="quantity-selector mt">Select quantity:</td>
      <input
        v-if="productType !== 'flower'"
        type="text"
        value="1"
        @change="updateSelectedQuantity"
      />

      <select
        v-else
        v-model="selectedFlowerQuantity"
        name="Select quantity"
        id="selectedFlowerQuantity"
        @change="updateSelectedQuantity"
      >
        <option v-for="flowerPrice in flowerPriceBreaks" :key="flowerPrice">
          {{ flowerPrice.weight }}G (${{ flowerPrice.price }})
        </option>
      </select>

      <td class="add-to-cart active">
        <button @click="addToCart(product)">Add To Cart</button>
      </td>
    </tr>

    <tr v-if="isSelected && !isAuthenticated" class="flower-info-container ">
      <td class="quantity-selector mt">
        <router-link
          v-if="!isAuthenticated"
          @click="toggleMenu('close')"
          :to="`${'/sign-in'}`"
        >
          Sign in to make an online order!
        </router-link>
      </td>
    </tr>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: ['product', 'productType'],
  data() {
    return {
      autoTesting: ['flower', 'preroll', 'cartridge', 'concentrate'],
      productsWithWeight: ['preroll', 'cartridge', 'concentrate'],
      isSelected: false,
      selectedFlowerQuantity: '',
    };
  },
  computed: {
    ...mapGetters(['flowerPricePoints', 'isAuthenticated']),
    flowerPriceBreaks() {
      const priceBreaksObj = this.flowerPricePoints.filter(
        (point) => point.g1 == this.product.price
      )[0];
      const priceArray = Object.values(priceBreaksObj);
      const weightArray = Object.keys(priceBreaksObj);
      const priceObjects = weightArray.map((weight, i) => {
        const numWeight = parseInt(weight.substring(1, weight.length), 10);
        return { weight: numWeight, price: priceArray[i] };
      });
      return priceObjects;
    },
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
    displayProduct() {
      this.isSelected = !this.isSelected;
      if (this.isSelected) {
        this.selectedFlowerQuantity = `${this.flowerPriceBreaks[0].weight}G ($${this.flowerPriceBreaks[0].price})`;
      }
    },
    addToCart(product) {
      console.log(product, this.selectedFlowerQuantity);
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

.mt {
  padding-top: 15px;
}
</style>
