<script setup lang="ts">
let productQuantity = ref<number>(1);
let errorMsg = ref<string>("");

let incrementQuantity = () => {
  productQuantity.value++;
};
let decrementQuantity = () => {
  if (productQuantity.value > 1) productQuantity.value--;
};
</script>

<template>
  <div>
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
      <div class="row py-3">
        <div class="col-12 col-md-6 my-auto d-flex align-items-center gap-3">
          <i class="bi bi-x-lg fs-5 order-2 order-md-0 ms-auto ms-md-0"></i>
          <img class="product-img" src="../assets/earrings2.jpg" />
          <h6>Kolczyki</h6>
        </div>
        <div class="col-12 col-md-2 text-md-center my-auto">
          <h6 class="d-md-none fw-light mt-2 mt-md-0">Cena</h6>
          <h6>400zł</h6>
        </div>
        <div class="col-12 col-md-2 my-auto">
          <h6 class="d-md-none fw-light mt-2 mt-md-0">Ilość</h6>
          <div
            class="d-flex align-items-center justify-content-md-center gap-2 product-quantity"
          >
            <i
              @click="decrementQuantity"
              class="bi bi-dash-circle"
              :class="{
                grey: productQuantity < 2,
                'highlight-icon': productQuantity > 1,
              }"
            ></i>
            <input v-model="productQuantity" class="quantity-input" type="number" />
            <i @click="incrementQuantity" class="bi bi-plus-circle highlight-icon"></i>
          </div>
          <p v-if="errorMsg" class="error mt-1">{{ errorMsg }}</p>
        </div>
        <div class="col-2 my-auto">
          <h6 class="d-md-none fw-light mt-2 mt-md-0">Wartość</h6>
          <h6 class="text-md-center">400zł</h6>
        </div>
      </div>

      <div class="row py-3">
        <div class="col-12 col-md-6 my-auto d-flex align-items-center gap-3">
          <i class="bi bi-x-lg fs-5 order-2 order-md-0 ms-auto ms-md-0"></i>
          <img class="product-img" src="../assets/earrings.jpg" />
          <h6>Kolczyki</h6>
        </div>
        <div class="col-12 col-md-2 text-md-center my-auto">
          <h6 class="d-md-none fw-light mt-2 mt-md-0">Cena</h6>
          <h6>400zł</h6>
        </div>
        <div class="col-12 col-md-2 my-auto">
          <h6 class="d-md-none fw-light mt-2 mt-md-0">Ilość</h6>
          <div
            class="d-flex align-items-center justify-content-md-center gap-2 product-quantity"
          >
            <i
              @click="decrementQuantity"
              class="bi bi-dash-circle"
              :class="{
                grey: productQuantity < 2,
                'highlight-icon': productQuantity > 1,
              }"
            ></i>
            <input v-model="productQuantity" class="quantity-input" type="number" />
            <i @click="incrementQuantity" class="bi bi-plus-circle highlight-icon"></i>
          </div>
          <p v-if="errorMsg" class="error mt-1">{{ errorMsg }}</p>
        </div>
        <div class="col-2 my-auto">
          <h6 class="d-md-none fw-light mt-2 mt-md-0">Wartość</h6>
          <h6 class="text-md-center">400zł</h6>
        </div>
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
          <p class="fw-light fs-5">Razem: <span class="fw-normal">800zł</span></p>
        </div>
        <div class="col-12 col-md-4 mt-3 mt-md-0">
          <NuxtLink to="#"
            ><button class="btn btn-md btn-info py-2 px-4 text-light w-100">
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
