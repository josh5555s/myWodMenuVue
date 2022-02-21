<template>
  <tr class="flower-info-container" v-if="tableIndex === 0 && rowIndex === 0">
    <td class="product-name" @click="updateSortBy('name')">
      <i class="fas fa-arrow-down" :class="{ active: activeSorting('name', false) }"></i>
      <i class="fas fa-arrow-up" :class="{ active: activeSorting('name', true) }"></i>
    </td>

    <td class="product-test" @click="updateSortBy('test')">
      <i class="fas fa-arrow-down" :class="{ active: activeSorting('test', false) }"></i>
      <i class="fas fa-arrow-up" :class="{ active: activeSorting('test', true) }"></i>
    </td>

    <td class="product-type" @click="updateSortBy('type')">
      <i class="fas fa-arrow-down" :class="{ active: activeSorting('type', false) }"></i>
      <i class="fas fa-arrow-up" :class="{ active: activeSorting('type', true) }"></i>
    </td>

    <td class="product-price" @click="updateSortBy('price')">
      <i class="fas fa-arrow-down" :class="{ active: activeSorting('price', true) }"></i>
      <i class="fas fa-arrow-up" :class="{ active: activeSorting('price', false) }"></i>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['tableIndex', 'rowIndex', 'sortBy', 'flipDirection'],
  methods: {
    updateSortBy(byThis) {
      this.$emit('update-sort-by', byThis);
    },
    activeSorting(name, reverse) {
      return name === this.sortBy && reverse === this.flipDirection;
    },
  },
};
</script>
