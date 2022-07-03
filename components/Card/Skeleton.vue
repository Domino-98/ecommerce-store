<template>
  <div class="skeleton mx-3 shadow">
    <div class="img-container">
      <div class="skeleton-img animate-pulse"></div>
    </div>
    <div class="skeleton-body text-center py-2 animate-pulse">
      <h5></h5>
      <span></span>
    </div>
  </div>
</template>

<style scoped>
.skeleton {
  border-bottom-left-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
}
.img-container {
  overflow: hidden;
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
}

.skeleton-img {
  min-width: 300px;
  min-height: 300px;
  background-color: #ccc;
}

.skeleton-body {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 76.8px;
}

.skeleton h5,
.skeleton span {
  height: 1.25rem;
  margin: 0 auto;
  background-color: #ccc;
}

.skeleton h5 {
  width: 10rem;
  margin-bottom: 0.5rem;
}
.skeleton span {
  display: block;
  width: 5rem;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  50% {
    opacity: 0.75;
  }
}
</style>
