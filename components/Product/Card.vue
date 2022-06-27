<script setup lang="ts"></script>

<template>
  <div>
    <div class="position-relative shadow mx-3 product-card">
      <NuxtLink to="/product/123">
        <div class="img-container">
          <img src="../../assets/earrings.jpg" class="w-100 h-100" />
          <i class="bi bi-heart position-absolute" title="Dodaj do listy życzeń"></i>
        </div>
        <div class="text-center py-2">
          <h5>Kolczyki</h5>
          <span class="price">400zł</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  cursor: pointer;
  min-width: 240px;
}

.product-card span {
  font-size: 1.2rem;
}

.product-card img {
  min-width: 300px;
  min-height: 300px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.img-container {
  overflow: hidden;
}

.product-card:hover img {
  transform: scale(1.25);
}

.discount {
  text-decoration: line-through;
  color: grey;
}

.discount-percent {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
  font-size: 0.9rem;
  background-color: #ff4444;
}

.discount + .price {
  color: #ff4444;
}

.bi-heart {
  top: 0.6rem;
  right: 0.9rem;
  font-size: 1.5rem;
  transition: all 0.3s;
}

.bi-heart:hover {
  color: #4dd3ff;
}
</style>
