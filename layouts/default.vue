<script setup lang="ts">
import { useProducts } from "~~/stores/productStore";
const productStore = useProducts();

const nuxtApp = useNuxtApp();

nuxtApp.hook("page:finish", () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 300);
});

onMounted(() => {
  if (localStorage.getItem("wishlist") !== null) {
    productStore.$state.wishlistProducts = JSON.parse(localStorage.getItem("wishlist"));
  }
  if (localStorage.getItem("cart") !== null) {
    productStore.$state.cartProducts = JSON.parse(localStorage.getItem("cart"));
  }
});

// vue transition bug handle
const messages = [
  `Uncaught NotFoundError: Failed to execute 'insertBefore' on 'Node': The node before which the new node is to be inserted is not a child of this node.`, // chromium based
  `NotFoundError: The object can not be found here.`,
];
if (typeof window !== "undefined") {
  window.addEventListener("error", (ev) => {
    if (messages.includes(ev.message)) {
      ev.preventDefault();
      window.location.reload();
    }
  });
}
</script>

<template>
  <div>
    <Nav />
    <slot />
    <NuxtLink to="/cart">
      <div class="cart position-fixed text-light">
        <i class="bi bi-basket2-fill"></i>
        <span class="position-absolute bg-dark text-light">{{
          productStore.getCartProducts.length
        }}</span>
      </div>
    </NuxtLink>
    <Footer />
  </div>
</template>

<style>
.cart {
  z-index: 100;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background-color: #4dd3ff;
  border-radius: 50%;
  padding: 1.5rem;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.cart:hover i {
  color: rgb(33, 37, 41);
}

.cart i {
  transition: all 0.3s;
  font-size: 1.6rem;
}

.cart span {
  top: -0.5rem;
  right: -0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  text-align: center;
}

a.nuxt-link-active {
  font-weight: bold;
}
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  color: #00c58e;
}
</style>
