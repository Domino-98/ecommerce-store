<script setup lang="ts">
let showTopbar = ref<boolean>(true);
let promoArray = ref<string[]>(["Darmowa dostawa!", "Summer sale do -30%!"]);
let promoIndex = ref<number>(0);

let toggleNav = ref<boolean>(false);

setInterval(() => {
  promoIndex.value++;
  if (promoIndex.value > promoArray.value.length - 1) promoIndex.value = 0;
}, 5000);

let searchQuery = ref();

const searchProducts = () => {
  return navigateTo({
    path: "/search",
    query: {
      name: searchQuery.value,
    },
  });
};
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

    <nav class="navbar navbar-expand-lg navbar-light bg-light position-relative">
      <div class="container-fluid">
        <NuxtLink to="/" class="navbar-brand position-lg-absolute logo"
          ><span>G&D</span></NuxtLink
        >
        <div
          class="d-flex align-items-center gap-2 position-lg-absolute ms-auto nav-icons"
        >
          <form @submit.prevent="searchProducts" class="search">
            <div class="search-wrapper">
              <input
                @keyup.enter="searchProducts"
                v-model="searchQuery"
                type="text"
                placeholder="Znajdź produkt"
                class="search-field"
              />
              <button
                type="submit"
                class="bi bi-search search-icon bg-transparent"
              ></button>
            </div>
          </form>
          <!-- <i class="bi bi-person"></i> -->
          <NuxtLink to="/wishlist" title="Lista życzeń"
            ><i class="bi bi-heart"></i
          ></NuxtLink>
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
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-2">
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
              <NuxtLink to="/category/kolczyki" active-class="active" class="nav-link"
                ><span
                  class="w-100 d-inline-block py-3"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                  >Kolczyki</span
                ></NuxtLink
              >
            </li>
            <li class="nav-item">
              <NuxtLink to="/category/pierścionki" active-class="active" class="nav-link"
                ><span
                  class="w-100 d-inline-block py-3"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                  >Pierścionki</span
                ></NuxtLink
              >
            </li>
            <li class="nav-item">
              <NuxtLink to="/category/naszyjniki" active-class="active" class="nav-link"
                ><span
                  class="w-100 d-inline-block py-3"
                  data-bs-toggle="collapse"
                  data-bs-target=".navbar-collapse.show"
                  >Naszyjniki</span
                ></NuxtLink
              >
            </li>
            <li class="nav-item">
              <NuxtLink to="/category/bransoletki" active-class="active" class="nav-link"
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
.search-wrapper {
  position: relative;
}
.search-field {
  width: 50px;
  height: 50px;
  padding: 0.35em 50px 0.35em 10px;
  border: 1px solid transparent;
  border-radius: 0;
  background-color: transparent;
  color: transparent;
  font-family: Lato, sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.search-field:focus {
  width: 40vw;
  border-bottom-color: #4dd3ff;
  outline: none;
  font-family: inherit;
  color: #2b2b2b;
  cursor: default;
}
.search-field:focus ~ .search-icon {
  background-color: transparent;
  cursor: pointer;
  pointer-events: auto;
}
.search-icon {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  width: 50px;
  height: 50px;
  border-color: transparent;
  border-radius: 50%;
  font-size: 1.35em;
  text-align: center;
  pointer-events: none;
  transition: background-color 0.2s ease-in-out;
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
  padding: 0;
  background-color: #000;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  font-family: "Rubik", sans-serif;
  color: transparent;
  text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.3), 5px 5px 0px rgba(0, 0, 0, 0.1);
  font-size: 2rem;
  font-weight: 500;
  cursor: pointer;
  text-rendering: optimizeLegibility;
}

.logo:hover,
.logo:focus {
  color: transparent;
}

.nav-icons {
  right: 1.5rem;
}

.nav-icons i,
.search-field + button {
  transition: all 0.3s;
  font-size: 1.5rem;
  cursor: pointer;
}

.nav-icons i:hover,
.search-field:hover + button {
  color: #4dd3ff;
}

.nav-link {
  padding: 0;
}

@media screen and (min-width: 992px) {
  .search {
    right: 2rem;
  }

  .search-field:focus {
    width: 15vw;
  }
}
</style>
