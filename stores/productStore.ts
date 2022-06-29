import { defineStore } from 'pinia'

export const useProducts = defineStore('products', {
  state: () => ({
    bestsellingProducts: [],
    promoProducts: [],
    wishlistProducts: [],
    cartProducts: [],
  }),
  getters: {
    getBestsellingProducts: (state) => state.bestsellingProducts,
    getPromoProducts: (state) => state.promoProducts,
    getWishlistProducts: (state) => state.wishlistProducts,
    getCartProducts: (state) => state.cartProducts,
    getCartTotal: (state) => state.cartProducts.length === 0 ? "0" : state.cartProducts.map((product) => product.price * product.quantity).reduce((a, b) => a + b),
  },
  actions: {
    addToWishlist(product) {
      this.wishlistProducts.push(product);
    },
    removeFromWishlist(id: number) {
      this.wishlistProducts.splice(this.wishlistProducts.findIndex((product) => product.id === id), 1);
    },
    addToCart(product) {
      this.cartProducts.push(product);
    },
    removeFromCart(id: number) {
      this.cartProducts.splice(this.cartProducts.findIndex((product) => product.id === id), 1);
    },
    setBestsellingProducts(products) {
      this.bestsellingProducts = products;
    },
    setPromoProducts(products) {
      this.promoProducts = products;
    }
  },
})