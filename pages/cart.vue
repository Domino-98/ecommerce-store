<script setup lang="ts">
import { loadStripe } from "@stripe/stripe-js";
import { useProducts } from "~/stores/productStore";
import type { CartProduct } from "~/models/cartproduct";

const route = useRoute();
const config = useRuntimeConfig();
const productStore = useProducts();
const client = useStrapiClient();

let incrementQuantity = (product: CartProduct) => {
  product.quantity++;
};
let decrementQuantity = (product: CartProduct) => {
  if (product.quantity > 1) product.quantity--;
};

let removeFromCart = (id: number) => {
  productStore.removeFromCart(id);
};

const onlyNumber = ($event) => {
  //console.log($event.keyCode); //keyCodes value
  let keyCode = $event.keyCode ? $event.keyCode : $event.which;
  if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
    // 46 is dot
    $event.preventDefault();
  }
};

// Modal
let isOpen = ref<boolean>(false);
let paymentSuccess = ref<boolean>();

// Create order, payment
const pay = async (e) => {
  e.preventDefault();
  isOpen.value = true;
  const response: any = await client("/orders", {
    method: "POST",
    body: {
      data: {
        cartDetail: productStore.getCartProducts,
        cartTotal: productStore.getCartTotal.toFixed(2),
      },
    },
  });

  const stripePromise = loadStripe(config.STRIPE_KEY);
  const session = response;
  const stripe = await stripePromise;
  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });
  console.log(response);
  if (result.error) {
    console.log(result.error);
  }
};

const displayMessage = () => {
  if (route.query.success) {
    paymentSuccess.value = true;
    isOpen.value = true;
    if (process.client) {
      localStorage.removeItem("cart");
    }
  }
  if (route.query.canceled) {
    console.log("cancelled");
    paymentSuccess.value = false;
    isOpen.value = true;
  }
};

onMounted(() => {
  displayMessage();
});
</script>

<template>
  <div>
    <Modal :open="isOpen" @close="isOpen = !isOpen">
      <template v-slot:icon>
        <div v-if="paymentSuccess === false" class="sa-warning mx-auto">
          <div class="sa-warning-body"></div>
          <div class="sa-warning-dot"></div>
        </div>
      </template>
      <template v-slot:body>
        <div v-if="paymentSuccess === false">
          <h4 class="mt-4">Zamówienie anulowane!</h4>
          <p class="fs5 mt-3">Przejdź do płatności, gdy będziesz gotowy na zakup</p>
        </div>
        <div v-else-if="paymentSuccess === true">
          <h4 class="mt-4">Zamówienie złożone!</h4>
          <p class="fs5 mt-3">Dziękujemy za złożenie zamówienia!</p>
        </div>
        <div v-else>
          <h4 class="mt-4">Proszę czekać</h4>
          <p class="fs5 mt-3">Trwa przekierowywanie na stronę płatności...</p>
        </div>
      </template>
    </Modal>
    <div class="container mt-4 mt-md-5">
      <h1 class="text-center fs-4 cart-header mx-auto mb-2 mb-md-0 position-relative">
        Zawartość twojego koszyka
      </h1>
      <div class="d-none d-md-flex row mt-5 cart-labels">
        <div class="col-6">
          <h6 class="fw-light">Produkt</h6>
        </div>
        <div class="col-2 text-md-center">
          <h6 class="fw-light">Cena</h6>
        </div>
        <div class="col-2 text-md-center">
          <h6 class="fw-light">Ilość</h6>
        </div>
        <div class="col-2 text-md-center">
          <h6 class="fw-light">Wartość</h6>
        </div>
      </div>

      <!-- Products -->
      <div
        v-if="productStore.getCartProducts.length"
        v-for="product in productStore.getCartProducts"
        :key="product.id"
        class="row py-3"
      >
        <div class="col-12 col-md-6 my-auto d-flex align-items-center gap-3">
          <i
            @click.prevent="removeFromCart(product.id)"
            title="Usuń produkt z koszyka"
            class="bi bi-x-lg fs-5 order-2 order-md-0 ms-auto ms-md-0"
          ></i>
          <img class="product-img" :src="product.url" />
          <NuxtLink :to="`/product/${product.id}`">
            <h6>{{ product.name }}</h6>
          </NuxtLink>
        </div>
        <div class="col-12 col-md-2 text-md-center my-auto">
          <div v-if="product.discountPrice" class="d-flex flex-column mt-2 md-md-0">
            <h6 class="discount">{{ product.price }}zł</h6>
            <h6 class="price">{{ product.discountPrice }}zł</h6>
          </div>
          <h6 v-else class="mt-2 mt-md-0">{{ product.price }}zł</h6>
        </div>
        <div class="col-12 col-md-2 my-auto">
          <h6 class="d-md-none fw-light mt-2 mt-md-0">Ilość</h6>
          <div
            class="d-flex align-items-center justify-content-md-center gap-2 product-quantity"
          >
            <i
              @click="decrementQuantity(product)"
              class="bi bi-dash-circle"
              :class="{
                grey: product.quantity < 2,
                'highlight-icon': product.quantity > 1,
              }"
            ></i>
            <input
              v-model="product.quantity"
              class="quantity-input"
              type="number"
              min="1"
              max="10"
              @keypress="onlyNumber"
            />
            <i
              @click="incrementQuantity(product)"
              class="bi bi-plus-circle highlight-icon"
            ></i>
          </div>
        </div>
        <div class="col-2 my-auto">
          <h6 class="d-md-none fw-light mt-2 mt-md-0">Wartość</h6>
          <h6 class="text-md-center">
            {{
              product.discountPrice
                ? product.discountPrice * product.quantity
                : product.price * product.quantity
            }}zł
          </h6>
        </div>
      </div>
      <div v-else class="alert alert-info mt-4 text-center" role="alert">
        Brak produktów w twoim koszyku!
      </div>

      <!-- Summary -->
      <div class="row mt-2 py-3">
        <div class="col-12 col-md-4 order-2 order-md-0 mt-3 mt-md-0">
          <NuxtLink to="/"
            ><button class="btn btn-md btn-outline-info d-flex py-2 px-4">
              <i class="bi bi-chevron-left me-2"></i>Kontynuuj zakupy
            </button>
          </NuxtLink>
        </div>
        <div class="col-12 col-md-4 my-auto d-flex justify-content-md-end">
          <p class="fw-light fs-5">
            Razem: <span class="fw-normal">{{ productStore.getCartTotal }}zł</span>
          </p>
        </div>
        <div class="col-12 col-md-4 mt-3 mt-md-0">
          <NuxtLink to="#"
            ><button
              @click="pay"
              :disabled="productStore.getCartProducts.length === 0"
              class="btn btn-md btn-info py-2 px-4 text-light w-100"
            >
              Zamawiam<i class="bi bi-chevron-right ms-2"></i>
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  min-height: 85vh;
}
.cart-header {
  max-width: 42rem;
  text-transform: uppercase;
}
.cart-header:before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  display: block;
  width: 120px;
  height: 2px;
  background: #4dd3ff;
}
.cart-header:after {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  display: block;
  width: 120px;
  height: 2px;
  background: #4dd3ff;
}

.cart-labels,
.row:not(:last-child) {
  border-bottom: 1px solid #d2d2d2;
}

.product-img {
  width: 10rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}

.bi-x-lg {
  transition: all 0.3s;
  cursor: pointer;
}
.bi-x-lg:hover {
  color: #ff4444;
  cursor: pointer;
}

.quantity-input {
  width: 100%;
}

button:disabled {
  cursor: not-allowed;
  pointer-events: all !important;
}

@media screen and (max-width: 767px) {
  .cart-header:before,
  .cart-header:after {
    content: none;
  }
}

@media screen and (min-width: 768px) {
  .quantity-input {
    width: 3rem;
    height: 3rem;
  }
}
</style>
