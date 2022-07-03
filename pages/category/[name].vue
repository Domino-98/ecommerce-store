<script setup lang="ts">
const { find } = useStrapi4();
const route = useRoute();

let categoryName = ref<string>();
categoryName.value = route.params.name as string;
let categoryCapitalized: string =
  categoryName.value.charAt(0).toUpperCase() + categoryName.value.slice(1);
let products = ref();

onMounted(async () => {
  try {
    const response: any = await find("categories", {
      populate: {
        products: {
          populate: "*",
        },
      } as any,
      filters: {
        Name: {
          $eq: categoryCapitalized,
        },
      },
    });

    products.value = response.data[0].attributes.products.data;
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div>
    <h2 class="text-center mt-4">{{ categoryCapitalized }}</h2>
    <div class="container">
      <div class="row mt-2 g-0">
        <div
          class="col-12 col-md-6 col-lg-4 col-xl-3 py-3"
          v-for="product in products"
          :key="product.id"
        >
          <CardProduct
            :product="product"
            :key="product.id"
            :discount="product.attributes.discount.data?.attributes?.Discount_percent"
            @on-wishlist="(value) => (product.onWishlist = value)"
          />
        </div>

        <div
          v-if="!products"
          v-for="product in 4"
          class="col-12 col-md-6 col-lg-4 col-xl-3 py-3"
        >
          <CardSkeleton />
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
