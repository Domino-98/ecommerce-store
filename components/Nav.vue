<script setup lang="ts">
let showTopbar = ref<boolean>(true);
let promoArray = ref<string[]>(["Darmowa dostawa od 199zł!", "Summer sale do -70%!"]);
let promoIndex = ref<number>(0);

let toggleNav = ref<boolean>(false);

setInterval(() => {
  promoIndex.value++;
  if (promoIndex.value > promoArray.value.length - 1) promoIndex.value = 0;
}, 5000);
</script>

<template>
  <div class="sticky-top">
    <div v-show="showTopbar" class="topbar-info text-light w-100">
      <Transition mode="out-in" name="fade">
        <p class="text-center promo-text" :key="promoIndex">
          {{ promoArray[promoIndex] }}
        </p>
      </Transition>

      <i @click="showTopbar = false" class="bi bi-x-lg text-white"></i>
    </div>

    <nav class="navbar navbar-expand-md navbar-light bg-light position-relative">
      <div class="container-fluid">
        <a class="navbar-brand position-md-absolute logo fs-3" href="#">D&G</a>
        <div class="d-flex gap-4 position-md-absolute ms-auto nav-icons">
          <i class="bi bi-person"></i>
          <i class="bi bi-heart"></i>
        </div>
        <button
          @click="toggleNav = !toggleNav"
          class="navbar-toggler ms-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="bi bi-list text-light"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mx-auto mb-2 mb-md-0 gap-lg-3">
            <li class="nav-item">
              <NuxtLink to="/" class="nav-link" active-class="active" aria-current="page"
                ><span
                  class="w-100 d-inline-block py-3"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                  >Strona główna</span
                ></NuxtLink
              >
            </li>
            <li class="nav-item">
              <NuxtLink to="/category/earrings" active-class="active" class="nav-link"
                ><span
                  class="w-100 d-inline-block py-3"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                  >Kolczyki</span
                ></NuxtLink
              >
            </li>
            <li class="nav-item">
              <NuxtLink to="/category/rings" active-class="active" class="nav-link"
                ><span
                  class="w-100 d-inline-block py-3"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                  >Pierścionki</span
                ></NuxtLink
              >
            </li>
            <li class="nav-item">
              <NuxtLink to="/category/necklace" active-class="active" class="nav-link"
                ><span
                  class="w-100 d-inline-block py-3"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                  >Naszyjniki</span
                ></NuxtLink
              >
            </li>
            <li class="nav-item">
              <NuxtLink to="/category/bracelets" active-class="active" class="nav-link"
                ><span
                  class="w-100 d-inline-block py-3"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                  >Bransoletki</span
                ></NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
nav {
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.05);
}

.bi-list {
  font-size: 1.6rem;
}

.navbar-toggler {
  background-color: #4dd3ff;
  transition: all 0.3s;
}

.navbar-toggler:hover {
  background-color: #00bfff;
}
.navbar-toggler:focus {
  box-shadow: 0 0 8px #4dd3ff;
}

.topbar-info {
  padding: 0.5rem;
  background-color: #4dd3ff;
  font-size: 0.9rem;
  font-weight: 500;
}

.topbar-info i {
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  cursor: pointer;
}

.promo-text {
  transition: all 0.3s;
}

.nav-link {
  font-weight: 500;
}

.logo {
  left: 1.5rem;
}

.nav-icons {
  right: 1.5rem;
}

.nav-icons i {
  transition: all 0.3s;
  font-size: 1.5rem;
  cursor: pointer;
}

.nav-icons i:hover {
  color: #4dd3ff;
}

.nav-link {
  padding: 0;
}
</style>
