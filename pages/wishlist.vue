<script setup lang="ts">
import { useProducts } from "~~/stores/productStore";

let productStore = useProducts();
</script>

<template>
  <div>
    <h2 class="text-center mt-4">Twoja lista życzeń</h2>
    <div class="container">
      <div class="row mt-2 g-0">
        <div
          v-if="productStore.getWishlistProducts.length"
          class="col-12 col-md-6 col-lg-4 col-xl-3 py-3"
          v-for="product in productStore.getWishlistProducts"
          :key="product.id"
        >
          <CardProduct
            :product="product"
            :discount="product.attributes.discount.data?.attributes?.Discount_percent"
            @on-wishlist="(value) => (product.onWishlist = value)"
          />
        </div>
        <div v-else class="alert alert-info mt-4 text-center" role="alert">
          Brak produktów na twojej liście życzeń
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 85vh;
}
</style>
