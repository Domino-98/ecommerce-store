<script setup lang="ts">
let router = useRouter();
let route = useRoute();

let sortArray = reactive([
  {
    name: "Cena - od Min do Max",
    value: "Price:asc",
  },
  {
    name: "Cena - od Max do Min",
    value: "Price:desc",
  },
  {
    name: "Nazwa - od A do Z",
    value: "Name:asc",
  },
  {
    name: "Nazwa - od Z do A",
    value: "Name:desc",
  },
]);

let activeSort = ref<string>("");
let showSort = ref<boolean>(false);
const toggleSort = () => {
  showSort.value = !showSort.value;
};

const sortProducts = (sortValue: string, sortName: string) => {
  activeSort.value = sortName;
  router.replace({
    query: {
      ...route.query,
      sort: sortValue || undefined,
    },
  });
};

onMounted(() => {
  activeSort.value = sortArray[2].name;
  sortArray.forEach((item) => {
    if (item.value === route.query.sort) {
      activeSort.value = item.name;
    }
  });
});
</script>

<template>
  <div>
    <div class="position-relative ms-3 ms-md-0 me-md-3">
      <button @click="toggleSort" class="btn btn-outline-info btn-md" type="button">
        Sortuj: {{ activeSort }}
        <i :class="{ flip: showSort }" class="bi bi-chevron-down"></i>
      </button>
      <Transition name="fade">
        <ul
          v-if="showSort"
          v-click-outside="toggleSort"
          class="position-absolute mt-2 bg-white shadow-sm end-0 sort-menu"
        >
          <li
            @click="sortProducts(sort.value, sort.name), toggleSort()"
            v-for="sort in sortArray"
            class="py-2 px-3 sort-item"
          >
            {{ sort.name }}
          </li>
        </ul>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.sort-menu {
  z-index: 1000;
  overflow: hidden;
  width: max-content;
}

.sort-item {
  cursor: pointer;
  transition: all 0.3s;
}

.sort-item:hover {
  color: #fff;
  background-color: #4dd3ff;
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
