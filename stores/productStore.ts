import { defineStore } from 'pinia';
import type { CartProduct } from "~/models/cartproduct";

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
    getCartTotal: (state) => state.cartProducts.length === 0 ? 0 : state.cartProducts.map((product) => {
      if (product.discountPrice) {
        return product.discountPrice * product.quantity
      } else {
        return product.price * product.quantity
      }
    }).reduce((a, b) => a + b),
  },
  actions: {
    addToWishlist(product) {
      this.wishlistProducts.push(product);
      if (process.client) {
        localStorage.setItem("wishlist", JSON.stringify(this.wishlistProducts));
      }
    },
    removeFromWishlist(id: number) {
      this.wishlistProducts.splice(this.wishlistProducts.findIndex((product) => product.id === id), 1);
      if (process.client) {
        localStorage.setItem("wishlist", JSON.stringify(this.wishlistProducts));
      }
    },
    addToCart(product: CartProduct) {
      if (this.cartProducts.some((p: CartProduct) => p.id === product.id)) {
        this.cartProducts.find((p: CartProduct) => p.id === product.id).quantity += product.quantity;
      } else {
        this.cartProducts.push({ ...product });
      }
      if (process.client) {
        localStorage.setItem("cart", JSON.stringify(this.cartProducts));
      }
    },
    removeFromCart(id: number) {
      this.cartProducts.splice(this.cartProducts.findIndex((product) => product.id === id), 1);
      if (process.client) {
        localStorage.setItem("cart", JSON.stringify(this.cartProducts));
      }
    },
    setBestsellingProducts(products) {
      this.bestsellingProducts = products;
    },
    setPromoProducts(products) {
      this.promoProducts = products;
    }
  },
})