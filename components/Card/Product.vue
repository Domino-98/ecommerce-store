<script setup lang="ts">
import { useProducts } from "~/stores/productStore";

const props = defineProps({
  product: { type: Object, required: true },
});

let productStore = useProducts();
let isOpen = ref<boolean>(false);
let alreadyOnList = ref<boolean>();

const addToWishlist = (product) => {
  isOpen.value = true;
  if (productStore.getWishlistProducts.some((p) => p.id === product.id)) {
    alreadyOnList.value = true;
    productStore.removeFromWishlist(product.id);
    return;
  }
  alreadyOnList.value = false;
  productStore.addToWishlist(product);
};
</script>

<template>
  <div>
    <Modal :open="isOpen" @close="isOpen = !isOpen">
      <template v-slot:icon>
        <div v-show="alreadyOnList" class="sa-warning mx-auto">
          <div class="sa-warning-body"></div>
          <div class="sa-warning-dot"></div>
        </div>
        <div v-show="!alreadyOnList" class="sa-success mx-auto">
          <div class="sa-success-tip"></div>
          <div class="sa-success-long"></div>
          <div class="sa-success-placeholder"></div>
          <div class="sa-success-fix"></div>
        </div>
      </template>
      <template v-slot:body>
        <h4 v-show="alreadyOnList" class="mt-4">
          Produkt usunięty z twojej listy życzeń!
        </h4>
        <h4 v-show="!alreadyOnList" class="mt-4">Lista życzeń zaktualizowana!</h4>
        <p v-show="!alreadyOnList" class="fs5 mt-3">
          Produkt {{ product.attributes.Name }} został dodany do listy życzeń!
        </p>
      </template>
      <template v-slot:button>
        <div class="d-flex justify-content-evenly mt-4">
          <button class="btn btn-md btn-outline-info px-4" @click="isOpen = false">
            Ok
          </button>
        </div>
      </template>
    </Modal>

    <div v-if="props.product" class="position-relative shadow mx-3 product-card">
      <NuxtLink :to="`/product/${props.product.id}`">
        <div class="img-container">
          <img
            :src="`http://localhost:1337${props.product.attributes.Image.data[0].attributes.formats.medium.url}`"
            class="w-100 h-100"
          />
          <i
            @click.prevent="addToWishlist(props.product)"
            class="bi bi-heart position-absolute"
          ></i>
        </div>
        <div class="text-center py-2">
          <h5>{{ props.product.attributes.Name }}</h5>
          <span class="price">{{ props.product.attributes.Price }}zł</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  border-radius: 0.75rem;
  cursor: pointer;
}

.product-card span {
  font-size: 1.2rem;
}

.product-card img {
  min-width: 300px;
  min-height: 300px;
  object-fit: cover;

  transition: transform 0.5s ease;
}

.img-container {
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
  overflow: hidden;
}

.product-card:hover img {
  transform: scale(1.25);
}

.discount {
  text-decoration: line-through;
  color: grey;
}

.discount-percent {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
  font-size: 0.9rem;
  background-color: #ff4444;
}

.discount + .price {
  color: #ff4444;
}

.bi-heart {
  top: 0.6rem;
  right: 0.9rem;
  font-size: 1.5rem;
  transition: all 0.3s;
}

.bi-heart:hover {
  color: #4dd3ff;
}
</style>
