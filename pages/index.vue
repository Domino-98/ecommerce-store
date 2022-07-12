<script setup lang="ts">
import { useProducts } from "~/stores/productStore";

const { find } = useStrapi4();
const productStore = useProducts();

onMounted(() => {
  if (productStore.getBestsellingProducts.length === 0) {
    fetchBestellers();
  }
  if (productStore.getPromoProducts.length === 0) {
    fetchPromos();
  }
});

const fetchBestellers = async () => {
  try {
    const response: any = await find("bestsellers", {
      populate: {
        products: {
          populate: "*",
        },
      } as any,
    });

    productStore.setBestsellingProducts(response.data[0].attributes.products.data);
  } catch (error) {
    console.log(error);
  }
};

const fetchPromos = async () => {
  try {
    const response: any = await find("discounts", {
      populate: {
        products: {
          populate: "*",
        },
      } as any,
    });

    let promoProducts = response.data
      .sort((a, b) => b.attributes.Discount_percent - a.attributes.Discount_percent)
      .map((item) => item.attributes.products.data)
      .flat();

    productStore.setPromoProducts(promoProducts);
  } catch (error) {
    console.log(error);
  }
};

let bestsellersContainer = ref();
let promosContainer = ref();

let bestsellersScroll = ref<number>(0);
let promosScroll = ref<number>(0);
let bestsellersEnd = ref<boolean>();
let promosEnd = ref<boolean>();

const scrollLeft = (container) => {
  container.scrollLeft -= 332;
  setTimeout(() => {
    calculateScroll(container);
  }, 500);
};

const scrollRight = (container) => {
  container.scrollLeft += 332;
  setTimeout(() => {
    calculateScroll(container);
  }, 500);
};

const calculateScroll = (container) => {
  switch (container) {
    case bestsellersContainer.value:
      bestsellersScroll.value = container.scrollLeft;
      bestsellersEnd.value =
        container.offsetWidth + bestsellersScroll.value === container.scrollWidth;
      break;
    case promosContainer.value:
      promosScroll.value = container.scrollLeft;
      promosEnd.value =
        container.offsetWidth + promosScroll.value === container.scrollWidth;
      break;
  }
};
</script>

<template>
  <div>
    <div class="hero">
      <div class="hero-text">
        <h1>Witamy w sklepie</h1>
        <h1 class="hero-logo">G&D</h1>
        <p class="mt-1">Twój ulubiony sklep internetowy z biżuterią</p>
        <a href="#bestsellers" class="btn hero-btn btn-lg mt-3">Bestsellery</a>
      </div>
    </div>
    <div class="container">
      <h2 class="text-center mt-5 mb-1">Bestsellery</h2>
      <div id="bestsellers" class="position-relative">
        <i
          v-if="bestsellersScroll > 0"
          @click="scrollLeft(bestsellersContainer)"
          class="bi bi-chevron-left position-absolute fs-3 scroll-btn"
        ></i>
        <i
          v-if="!bestsellersEnd"
          @click="scrollRight(bestsellersContainer)"
          class="bi bi-chevron-right position-absolute fs-3 scroll-btn"
        ></i>
        <div
          ref="bestsellersContainer"
          class="d-flex py-4 flex-nowrap overflow-auto product-container"
        >
          <CardProduct
            v-for="product in productStore.getBestsellingProducts"
            :key="product.id"
            :product="product"
            :discount="product.attributes.discount.data?.attributes?.Discount_percent"
            @on-wishlist="(value) => (product.onWishlist = value)"
          />

          <div
            v-if="productStore.getBestsellingProducts.length === 0"
            v-for="product in 4"
          >
            <CardSkeleton />
          </div>
        </div>
      </div>

      <h2 class="text-center mt-3 mb-1">Promocje</h2>
      <div class="position-relative">
        <i
          v-if="promosScroll > 0"
          @click="scrollLeft(promosContainer)"
          class="bi bi-chevron-left position-absolute fs-3 scroll-btn"
        ></i>
        <i
          v-if="!promosEnd"
          @click="scrollRight(promosContainer)"
          class="bi bi-chevron-right position-absolute fs-3 scroll-btn"
        ></i>

        <div
          ref="promosContainer"
          class="d-flex py-4 flex-nowrap overflow-auto product-container"
        >
          <CardProduct
            v-for="product in productStore.getPromoProducts"
            :key="product.id"
            :product="product"
            :discount="product.attributes.discount.data.attributes.Discount_percent"
            @on-wishlist="(value) => (product.onWishlist = value)"
          />

          <div
            v-if="productStore.getPromoProducts.length === 0"
            class="skeleton"
            v-for="product in 4"
          >
            <CardSkeleton />
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
.product-container {
  scroll-behavior: smooth;
}
.scroll-btn {
  z-index: 100;
  height: 100%;
  width: 10vw;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  color: #a0a0a0;
  cursor: pointer;
}

.scroll-btn:hover {
  color: black;
}

.bi-chevron-left {
  left: -2rem;
  justify-content: flex-start;
  background: linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
}

.bi-chevron-right {
  right: -2rem;
  justify-content: flex-end;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
}

.btn {
  border-radius: 0;
}
.hero {
  position: relative;
  height: 80vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5)),
    url("../assets/hero.jpg");
  clip-path: polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.hero-logo {
  letter-spacing: 0.1rem;
  font-family: "Rubik", sans-serif;
  text-shadow: 5px 5px 0px rgba(0, 0, 0, 0.1);
}

.hero-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
}

.hero-text h1 {
  text-transform: uppercase;
}

.hero-text p {
  font-size: 1.4rem;
}

.hero-btn {
  transition: all 0.3s;
  padding: 0.75rem 1.25rem;
  border: 2px solid #eee;
  background-color: transparent;
  text-transform: uppercase;
  color: #eee;
}

.hero-btn:hover {
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.4);
}

.product-container::-webkit-scrollbar {
  display: none;
}

.product-container {
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;
}

#bestsellers {
  scroll-margin-top: 160px;
}

@media (hover: none) {
  .scroll-btn {
    display: none;
  }
}

@media screen and (max-width: 1200px) {
  .bi-chevron-left {
    left: 0;
  }
  .bi-chevron-right {
    right: 0;
  }
}
</style>
