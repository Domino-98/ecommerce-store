<script setup lang="ts">
const { find } = useStrapi4();
const route = useRoute();
const router = useRouter();
let minPrice = computed(() => route.query.minPrice);
let maxPrice = computed(() => route.query.maxPrice);
let sort = computed(() => route.query.sort);
let currentPage = computed(() => +route.query.page || 1);
let pageSize = ref<number>(12);

let categoryName = ref<string>();
categoryName.value = route.params.name as string;
let categoryCapitalized: string =
  categoryName.value.charAt(0).toUpperCase() + categoryName.value.slice(1);

let products = ref();
let pagination = ref();
let found = ref<boolean>();

onMounted(async () => {
  fetchProducts();
});

const fetchProducts = async () => {
  products.value = null;
  pagination.value = null;

  try {
    const response: any = await find("products", {
      populate: "*",
      filters: {
        category: {
          Name: {
            $eq: categoryCapitalized,
          },
        },
        $or: [
          {
            $and: [
              { New_price: { $notNull: true } },
              { New_price: { $gte: minPrice.value } },
              { New_price: { $lte: maxPrice.value } },
            ],
          },
          {
            $and: [
              { New_price: { $null: true } },
              { Price: { $gte: minPrice.value } },
              { Price: { $lte: maxPrice.value } },
            ],
          },
        ],
      },
      sort: sort.value || "Name:asc",
      pagination: {
        pageSize: pageSize.value,
        page: currentPage.value || 1,
      },
    });

    products.value = response.data;
    pagination.value = response.meta.pagination;

    response.data.length === 0 ? (found.value = false) : (found.value = true);
  } catch (error) {
    console.log(error);
  }
};

const changePage = (page: number) => {
  router.replace({
    query: {
      ...route.query,
      page: page,
    },
  });
  window.scrollTo(0, 0);
};

watch([currentPage, minPrice, maxPrice, sort], fetchProducts);
</script>

<template>
  <div>
    <h3 class="text-center mt-4">{{ categoryCapitalized }}</h3>
    <div class="container d-flex flex-column">
      <div
        :class="{ 'flex-column gap-2': minPrice || maxPrice }"
        class="d-flex flex-md-row justify-content-between mt-2"
      >
        <Filter />

        <Sort />
      </div>
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
          v-if="found === false"
          class="alert alert-info mt-4 text-center"
          role="alert"
        >
          Nie znaleziono takich produktów
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

.price-filter {
  z-index: 1000;
}

.sort-menu {
  overflow: hidden;
  right: 0;
  z-index: 1000;
}

.price-label {
  position: relative;
}

.price-label::after {
  content: "" attr(currency);
  position: absolute;
  right: 0.5rem;
  bottom: 0.4rem;
  font-family: arial, helvetica, sans-serif;
  font-size: 1rem;
  display: block;
}

.price-input {
  padding: 0.35rem 0.5rem;
  padding-right: 1.5rem;
  border: 1px solid #b9b9b9;
  text-align: right;
  outline: none;
  font-size: 1rem;
  width: 5rem;
  font-weight: 500;
  transition: all 0.3s;
}

.price-input:focus {
  outline: none;
  box-shadow: 0 0 3px #4dd3ff;
}
</style>
