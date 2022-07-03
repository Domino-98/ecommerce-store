<script setup lang="ts">
import { useProducts } from "~/stores/productStore";

const props = defineProps({
  product: { type: Object, required: true },
  discount: { type: Number, required: false },
});

const emit = defineEmits(["onWishlist"]);

const setWishlist = (value: boolean) => {
  emit("onWishlist", value);
};

let productStore = useProducts();
let isOpen = ref<boolean>(false);

onMounted(() => {
  if (productStore.getWishlistProducts.some((p) => p.id === props.product.id)) {
    setWishlist(true);
  } else {
    setWishlist(false);
  }
});

const addToWishlist = (product) => {
  setWishlist(true);
  isOpen.value = true;
  productStore.addToWishlist(product);
};

const removeFromWishlist = (product) => {
  setWishlist(false);
  isOpen.value = true;
  productStore.removeFromWishlist(product.id);
};
</script>

<template>
  <div>
    <Modal :open="isOpen" @close="isOpen = !isOpen">
      <template v-slot:icon>
        <div v-if="!product.onWishlist" class="sa-warning mx-auto">
          <div class="sa-warning-body"></div>
          <div class="sa-warning-dot"></div>
        </div>
      </template>
      <template v-slot:body>
        <h4 v-if="!product.onWishlist" class="mt-4">
          Produkt usunięty z twojej listy życzeń!
        </h4>
        <h4 v-if="product.onWishlist" class="mt-4">Lista życzeń zaktualizowana!</h4>
        <p v-if="product.onWishlist" class="fs5 mt-3">
          Produkt {{ product.attributes.Name }} został dodany do listy życzeń!
        </p>
      </template>
    </Modal>

    <div v-if="product" class="position-relative shadow mx-3 product-card">
      <NuxtLink :to="`/product/${props.product.id}`">
        <div class="img-container">
          <div v-if="discount" class="position-absolute text-light discount-percent">
            -{{ discount }}%
          </div>
          <img
            :src="product.attributes.Image.data[0].attributes.formats.medium.url"
            class="w-100 h-100"
          />
          <i
            v-if="!product.onWishlist"
            @click.prevent="addToWishlist(product)"
            class="bi bi-heart position-absolute"
          ></i>
          <i
            v-else
            @click.prevent="removeFromWishlist(product)"
            class="bi bi-heart-fill position-absolute"
          ></i>
        </div>
        <div class="text-center py-2">
          <h5>{{ product.attributes.Name }}</h5>
          <span v-if="discount" class="discount me-2">{{
            product.attributes.Price
          }}</span>
          <span v-if="discount" class="price"
            >{{
              product.attributes.Price - product.attributes.Price * (discount / 100)
            }}zł</span
          >
          <span v-else class="price">{{ product.attributes.Price }}zł</span>
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

:global(.discount) {
  text-decoration: line-through;
  color: grey;
}

:global(.discount + .price) {
  color: #ff4444;
}

.discount-percent {
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0.5rem;
  left: 0.5rem;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  padding: 1.5rem;
  font-weight: bold;
  font-size: 0.9rem;
  background-color: #ff4444;
}

.bi-heart,
.bi-heart-fill {
  top: 0.6rem;
  right: 0.9rem;
  font-size: 1.5rem;
  transition: all 0.3s;
}

.bi-heart:hover,
.bi-heart-fill:hover {
  color: #4dd3ff;
}
</style>
