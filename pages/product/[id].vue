<script setup lang="ts">
const { findOne } = useStrapi4();
const route = useRoute();

let product = ref();
let categoryName = ref<string>();

onMounted(() => {
  fetchProduct();
});

const fetchProduct = async () => {
  try {
    const response: any = await findOne("products", route.params.id as string, {
      populate: "*",
    });

    product.value = response.data;
    product.value.attributes.discountPrice =
      product.value.attributes.Price -
      product.value.attributes.Price *
        (product.value.attributes.discount?.data?.attributes?.Discount_percent / 100);
    console.log(product.value);
    categoryName.value = response.data.attributes.category.data.attributes.Name;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div>
    <div class="container mt-4">
      <div v-if="product">
        <div class="d-flex gap-1 navigation">
          <NuxtLink to="/">Strona główna</NuxtLink>
          <i class="bi bi-chevron-right grey"></i>
          <NuxtLink :to="`/category/${categoryName?.toLowerCase()}`">{{
            categoryName
          }}</NuxtLink>
          <i class="bi bi-chevron-right grey"></i>
          <NuxtLink to="#">{{ product.attributes.Name }}</NuxtLink>
        </div>

        <Product
          :product="product"
          @on-wishlist="(value) => (product.onWishlist = value)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 85vh;
}

.navigation a {
  transition: color 0.3s;
  cursor: pointer;
}

.navigation a:hover {
  color: #00bfff;
}
</style>
