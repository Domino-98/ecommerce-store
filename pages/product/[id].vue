<script setup lang="ts">
let productQuantity = ref<number>(1);
let errorMsg = ref<string>("");

let incrementQuantity = () => {
  productQuantity.value++;
};
let decrementQuantity = () => {
  if (productQuantity.value > 1) productQuantity.value--;
};

const addToCart = () => {
  errorMsg.value = "";
  if (productQuantity.value < 1) {
    errorMsg.value = "Wprowadź poprawną ilość";
  }
  // Add product to cart
};
</script>

<template>
  <div>
    <div class="container mt-4">
      <div class="d-flex gap-1 navigation">
        <NuxtLink to="/">Strona główna</NuxtLink>
        <i class="bi bi-chevron-right grey"></i>
        <NuxtLink to="#">Kolczyki</NuxtLink>
        <i class="bi bi-chevron-right grey"></i>
        <NuxtLink to="#">Kolczyki Galaxy</NuxtLink>
      </div>
      <div class="row mt-4">
        <div class="col-12 col-lg-6">
          <img src="../../assets/earrings2.jpg" class="product-img" />
          <div class="d-flex mt-2 gap-2 thumbnail-list">
            <img class="product-thumbnail" src="../../assets/earrings2.jpg" />
          </div>
        </div>
        <div class="col-12 col-lg-6">
          <h2 class="mt-2 mt-lg-0">Kolczyki Galaxy</h2>
          <p class="mt-1 fs-4">400zł</p>
          <p class="mt-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus esse
            obcaecati, neque sequi pariatur praesentium corrupti, cum amet tempore
            repellat tenetur aliquam dignissimos reiciendis aliquid vero commodi ratione
            id labore nobis eum quidem?
          </p>
          <div class="d-flex align-items-center mt-3 gap-2 product-quantity">
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
          <div class="d-flex align-items-center mt-3 gap-3">
            <button @click="addToCart" class="btn btn-lg btn-info text-light w-100">
              Dodaj do koszyka
            </button>
            <i class="bi bi-heart highlight-icon" title="Dodaj do listy życzeń"></i>
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
  </div>
</template>

<style scoped>
.container {
  min-height: 85vh;
}

.product-img {
  border-radius: 0.75rem;
}

.thumbnail-list {
  overflow-x: auto;
}

.product-thumbnail {
  width: 7.5rem;
  border-radius: 0.75rem;
  cursor: pointer;
}

input[type="number"] {
  -moz-appearance: textfield;
}
.navigation a {
  transition: color 0.3s;
  cursor: pointer;
}

.navigation a:hover {
  color: #00bfff;
}

.info {
  font-size: 0.9rem;
}

:global(.product-quantity i),
.bi-heart {
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
</style>
