<script setup lang="ts">
import { useProducts } from "~/stores/productStore";
import type { CartProduct } from "~/models/cartproduct";

const props = defineProps({
  product: { type: Object, required: true },
});

const emit = defineEmits(["onWishlist"]);

const setWishlist = (value: boolean) => {
  emit("onWishlist", value);
};

const productStore = useProducts();

type Modal = "cart" | "wishlist";
let modalType = ref<Modal>();
let isOpen = ref<boolean>(false);

onMounted(() => {
  if (productStore.getWishlistProducts.some((p) => p.id === props.product.id)) {
    setWishlist(true);
  } else {
    setWishlist(false);
  }
});

let cartItem = reactive<CartProduct>({
  id: props.product.id,
  name: props.product.attributes.Name,
  url: props.product.attributes.Image.data[0].attributes.formats.small.url,
  price: props.product.attributes.Price,
  discountPrice: props.product.attributes.New_price || null,
  quantity: 1,
});

let incrementQuantity = () => {
  cartItem.quantity++;
};

let decrementQuantity = () => {
  if (cartItem.quantity > 1) cartItem.quantity--;
};

const addToCart = () => {
  modalType.value = "cart";
  isOpen.value = true;
  productStore.addToCart(cartItem);
  cartItem.quantity = 1;
  console.log("Cart", productStore.getCartProducts);
};

const onlyNumber = ($event) => {
  //console.log($event.keyCode); //keyCodes value
  let keyCode = $event.keyCode ? $event.keyCode : $event.which;
  if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
    // 46 is dot
    $event.preventDefault();
  }
};

const addToWishlist = (product) => {
  modalType.value = "wishlist";
  setWishlist(true);
  isOpen.value = true;
  productStore.addToWishlist(product);
};

const removeFromWishlist = (product) => {
  modalType.value = "wishlist";
  setWishlist(false);
  isOpen.value = true;
  productStore.removeFromWishlist(product.id);
};

let mainImg = ref(props.product.attributes.Image.data[0].attributes.formats.large.url);

const setImage = (imgSrc: string) => {
  mainImg.value = imgSrc;
};
</script>

<template>
  <div>
    <Modal :open="isOpen" @close="isOpen = !isOpen">
      <template v-slot:icon>
        <div
          v-if="!product.onWishlist && modalType === 'wishlist'"
          class="sa-warning mx-auto"
        >
          <div class="sa-warning-body"></div>
          <div class="sa-warning-dot"></div>
        </div>
      </template>
      <template v-slot:body>
        <div v-if="modalType === 'cart'">
          <h4 class="mt-4">Koszyk zaktualizowany!</h4>
          <p class="fs5 mt-3">
            Produkt {{ product.attributes.Name }} został dodany do koszyka!
          </p>
        </div>
        <div v-if="modalType === 'wishlist'">
          <h4 v-show="!product.onWishlist" class="mt-4">
            Produkt usunięty z twojej listy życzeń!
          </h4>
          <h4 v-show="product.onWishlist" class="mt-4">Lista życzeń zaktualizowana!</h4>
          <p v-show="product.onWishlist" class="fs5 mt-3">
            Produkt {{ product.attributes.Name }} został dodany do listy życzeń!
          </p>
        </div>
      </template>
      <template v-slot:button>
        <div v-if="modalType === 'cart'" class="d-flex justify-content-evenly mt-4">
          <NuxtLink to="/cart" class="btn btn-md btn-info text-light"
            >Przejdź do koszyka</NuxtLink
          >
          <button class="btn btn-md btn-outline-info" @click="isOpen = false">
            Kontynuuj zakupy
          </button>
        </div>
      </template>
    </Modal>
    <div class="row mt-4">
      <div class="col-12 col-lg-1 pe-lg-0 order-1 order-lg-0 mt-2 mt-lg-0">
        <div class="d-flex flex-lg-column gap-2 thumbnail-list">
          <img
            @click="setImage(image.attributes.formats.large.url)"
            :class="{ 'active-img': mainImg === image.attributes.formats.large.url }"
            v-for="image in product.attributes.Image.data"
            :key="image.id"
            class="product-thumbnail"
            :src="image.attributes.formats.large.url"
          />
        </div>
      </div>
      <div class="col-12 col-lg-6 order-0">
        <Transition name="fade" mode="out-in">
          <img :src="mainImg" :key="mainImg" class="product-img" />
        </Transition>
      </div>
      <div class="col-12 col-lg-5 order-2">
        <h2 class="mt-2 mt-lg-0">{{ product.attributes.Name }}</h2>
        <div v-if="product.attributes.discount.data" class="mt-1">
          <p>
            <span class="discount me-2 fs-4">{{ product.attributes.Price }}</span>
            <span class="price fs-4">{{ product.attributes.New_price }}zł</span>
          </p>
          <p class="text-dark text-black-50">
            Oszczędzasz
            {{
              product.attributes.Price *
              (product.attributes.discount.data.attributes.Discount_percent / 100)
            }}zł
          </p>
        </div>
        <p v-else class="mt-1 fs-4">{{ product.attributes.Price }}zł</p>
        <p class="mt-3">
          {{ product.attributes.Description }}
        </p>
        <div class="d-flex align-items-center mt-3 gap-2 product-quantity">
          <i
            @click="decrementQuantity"
            class="bi bi-dash-circle"
            :class="{
              grey: cartItem.quantity < 2,
              'highlight-icon': cartItem.quantity > 1,
            }"
          ></i>
          <input
            v-model="cartItem.quantity"
            class="quantity-input"
            type="number"
            @keypress="onlyNumber"
          />
          <i @click="incrementQuantity" class="bi bi-plus-circle highlight-icon"></i>
        </div>
        <div class="d-flex align-items-center mt-3 gap-3">
          <button @click="addToCart" class="btn btn-lg btn-info text-light w-100">
            Dodaj do koszyka
          </button>
          <i
            v-if="!product.onWishlist"
            @click.prevent="addToWishlist(product)"
            class="bi bi-heart highlight-icon"
          ></i>
          <i
            v-else
            @click.prevent="removeFromWishlist(product)"
            class="bi bi-heart-fill highlight-icon"
          ></i>
        </div>
        <div class="d-flex align-items-center gap-2 mt-2">
          <i class="bi bi-truck fs-4"></i>
          <p class="info">Wysyłka w ciągu 2 dni roboczych</p>
        </div>
        <div class="d-flex align-items-center gap-2">
          <i class="bi bi-gem fs-4"></i>
          <p class="info">Gwarancja jakości</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-img {
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: 0.75rem;
}

.product-thumbnail {
  width: 6rem;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 0.75rem;
  cursor: pointer;
}

.active-img {
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.info {
  font-size: 0.9rem;
}

:global(.product-quantity i),
.bi-heart,
.bi-heart-fill {
  color: #252525;
  font-size: 1.8rem;
  cursor: pointer;
}

:global(.highlight-icon:hover) {
  color: #4dd3ff;
}

:global(.highlight-icon) {
  transition: all 0.3s;
}

:global(input::-webkit-outer-spin-button),
:global(input::-webkit-inner-spin-button) {
  -webkit-appearance: none;
  margin: 0;
}

:global(.btn) {
  border-radius: 0;
}

:global(.grey) {
  color: #afafaf !important;
}

:global(.error) {
  color: #ff4444 !important;
}

:global(.quantity-input) {
  width: 2.6rem;
  height: 2.6rem;
  border: none;
  background-color: #eee;
  text-align: center;
  transition: all 0.3s;
}

:global(.quantity-input:focus) {
  outline: none;
  box-shadow: 0 0 4px #00bfff;
}

.quantity-input {
  width: 100%;
}

@media screen and (min-width: 768px) {
  .quantity-input {
    width: 3rem;
    height: 3rem;
  }
}

@media screen and (min-width: 992px) {
  .product-thumbnail {
    width: unset;
    aspect-ratio: 1 / 1;
  }
}
</style>
