<script setup lang="ts">
const { find } = useStrapi4();
const route = useRoute();
const router = useRouter();
let searchQuery = computed(() => route.query.name);
let currentPage = computed(() => +route.query.page || 1);
let pageSize = ref<number>(8);

let products = ref();
let pagination = ref();
let found = ref<boolean>();

onMounted(() => {
  fetchProducts();
});

const fetchProducts = async () => {
  products.value = null;
  pagination.value = null;

  try {
    const response: any = await find("products", {
      populate: "*",
      filters: {
        Name: {
          $containsi: searchQuery.value,
        },
      },
      pagination: {
        pageSize: pageSize.value,
        page: currentPage.value || 1,
      } as any,
    });

    products.value = response.data;
    pagination.value = response.meta.pagination;

    console.log(products.value);

    response.data.length === 0 ? (found.value = false) : (found.value = true);
  } catch (error) {
    console.log(error);
  }
};

const changePage = (page: number) => {
  router.push({
    path: "/search",
    query: { name: searchQuery.value, page: page },
  });
};

watch(searchQuery, fetchProducts);
watch(currentPage, fetchProducts);
</script>

<template>
  <div>
    <h3 class="text-center mt-4">
      <span class="fw-light">Wynik wyszukiwania dla: </span
      >{{ searchQuery || "Wszystkie produkty" }}
    </h3>
    <div class="container d-flex flex-column">
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
          v-for="product in 8"
          class="col-12 col-md-6 col-lg-4 col-xl-3 py-3"
        >
          <CardSkeleton />
        </div>

        <div
          v-else-if="found === false"
          class="alert alert-info mt-4 text-center"
          role="alert"
        >
          Nie znaleziono produktów z podaną nazwą
        </div>
      </div>

      <div v-if="pagination && products.length" class="mt-4 align-self-center">
        <vue-awesome-paginate
          :total-items="pagination?.total"
          :items-per-page="pageSize"
          :max-pages-shown="5"
          :current-page="currentPage"
          :on-click="changePage"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 85vh;
}

:global(.pagination-container) {
  display: flex;
  column-gap: 10px;
}

:global(.paginate-buttons) {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
:global(.paginate-buttons:hover) {
  background-color: #d8d8d8;
}
:global(.active-page) {
  background-color: #4dd3ff;
  border: 1px solid #4dd3ff;
  color: white;
}
:global(.active-page:hover) {
  background-color: #4dd3ff;
}
</style>
