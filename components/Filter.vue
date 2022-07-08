<script setup lang="ts">
let router = useRouter();
let route = useRoute();
let minPrice = computed(() => route.query.minPrice);
let maxPrice = computed(() => route.query.maxPrice);
let minPriceValue = ref<number>();
let maxPriceValue = ref<number>();

const onlyNumber = ($event) => {
  let keyCode = $event.keyCode ? $event.keyCode : $event.which;
  if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
    $event.preventDefault();
  }
};

let showFilter = ref<boolean>(false);
const toggleFilter = () => {
  showFilter.value = !showFilter.value;
};

let activeFilters = ref([]);

const filterPrice = () => {
  router.replace({
    query: {
      ...route.query,
      minPrice: minPriceValue.value || undefined,
      maxPrice: maxPriceValue.value || undefined,
      page: 1,
    },
  });
};

const removeFilter = (index: number, queryName: string) => {
  router.replace({
    query: {
      ...route.query,
      [queryName]: undefined,
    },
  });
};

const setFilter = (queryName: string, name: string, value: number) => {
  if (value) {
    let filterToAdd = {
      queryName: queryName,
      name: name,
      value: value,
    };
    let foundFilter = activeFilters.value.find(
      (filterObj) => filterObj.queryName === queryName
    );

    if (foundFilter) {
      foundFilter.value = value;
    } else {
      activeFilters.value.push(filterToAdd);
    }
  } else {
    let index = activeFilters.value.findIndex(
      (filterObj) => filterObj.queryName === queryName
    );
    activeFilters.value.splice(index, 1);
  }
};

onMounted(() => {
  if (minPrice.value) setFilter("minPrice", "Cena od: ", +minPrice.value);
  if (maxPrice.value) setFilter("maxPrice", "Cena do: ", +maxPrice.value);
});

watch(minPrice, () => {
  setFilter("minPrice", "Cena od: ", +minPrice.value);
});
watch(maxPrice, () => {
  setFilter("maxPrice", "Cena do: ", +maxPrice.value);
});
</script>

<template>
  <div class="d-flex gap-2 gap-lg-3 align-items-center">
    <div class="position-relative ms-3">
      <button @click="toggleFilter" class="btn btn-info btn-md text-light" type="button">
        Filtruj
        <i :class="{ flip: showFilter }" class="bi bi-chevron-down"></i>
      </button>
      <Transition name="fade">
        <div
          v-if="showFilter"
          v-click-outside="toggleFilter"
          class="position-absolute mt-2 bg-white p-3 shadow-sm start-0 filter-menu"
        >
          <div class="d-flex flex-column gap-2">
            <h5 class="text-center mb-0">Cena:</h5>
            <div class="d-flex gap-2 align-items-center">
              <label currency="zł" class="price-label">
                <input
                  @keyup.enter="filterPrice()"
                  @keypress="onlyNumber"
                  placeholder="Min"
                  v-model="minPriceValue"
                  type="text"
                  class="price-input"
                />
              </label>
              <span>-</span>
              <label currency="zł" class="price-label">
                <input
                  @keyup.enter="filterPrice()"
                  @keypress="onlyNumber"
                  placeholder="Max"
                  v-model="maxPriceValue"
                  type="text"
                  class="price-input"
              /></label>
            </div>
          </div>

          <button
            @click="filterPrice(), toggleFilter()"
            class="btn btn-outline-info btn-md mt-3 w-100"
          >
            Zastosuj
          </button>
        </div>
      </Transition>
    </div>
    <div class="d-flex flex-wrap gap-2 me-3 me-md-0">
      <div
        class="d-flex align-items-center gap-2 py-1 px-2 text-light filter-item"
        v-for="(filter, index) in activeFilters"
        :key="filter.name"
      >
        <p>
          {{ filter.name }} <span class="fw-bold">{{ filter.value }}zł</span>
        </p>
        <i @click="removeFilter(index, filter.queryName)" class="bi bi-x-lg"></i>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter-menu {
  z-index: 1000;
  min-width: 15rem;
}

.filter-item {
  border-radius: 2rem;
  background-color: #4dd3ff;
  font-size: 0.9rem;
}

.bi {
  cursor: pointer;
}

.price-label {
  position: relative;
}

.price-label::after {
  content: "" attr(currency);
  position: absolute;
  display: block;
  right: 0.5rem;
  bottom: 0.4rem;
  font-family: arial, helvetica, sans-serif;
  font-size: 1rem;
}

.price-input {
  width: 100%;
  padding: 0.35rem 0.5rem;
  padding-right: 1.5rem;
  border: 1px solid #b9b9b9;
  outline: none;
  text-align: right;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s;
}

.price-input:focus {
  outline: none;
  box-shadow: 0 0 4px #4dd3ff;
}

.bi-chevron-down {
  display: inline-block;
  transform: rotate(0deg);
  transition: all 0.3s;
}

.bi-chevron-down.flip {
  transform: rotate(180deg);
}
</style>
