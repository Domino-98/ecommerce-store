<script setup lang="ts">
let footerInfos = ref([
  {
    name: "O nas",
    items: ["O firmie", "Kariera", "Blog", "Opinie"],
  },
  {
    name: "Obsługa",
    items: [
      "Zakupy w sklepie G&D",
      "Formy i dostawy płatności",
      "Zwroty i reklamacje",
      "Gwarancja autentyczności produktów",
    ],
  },
  {
    name: "Regulaminy",
    items: [
      "Regulamin sklepu",
      "Polityka cookies",
      "Polityka prywatności",
      "Klauzyle informacyjne",
    ],
  },
  {
    name: "Kontakt",
    items: ["+48 55 555 55 55", "Pn-pt 9:00-18:00", "gandd@example.com"],
  },
]);
</script>

<template>
  <div>
    <Newsletter />
    <footer class="d-flex bg-light text-dark p-4">
      <div class="container">
        <div class="row">
          <div class="col-12 mb-3 text-center">
            <h5>Obserwuj nas</h5>
            <div
              class="d-flex justify-content-center gap-4 position-relative footer-icons"
            >
              <a href="#" class="text-dark"> <i class="bi bi-facebook"></i></a>
              <a href="#" class="text-dark"> <i class="bi bi-instagram"></i></a>
              <a href="#" class="text-dark"> <i class="bi bi-pinterest"></i></a>
            </div>
          </div>
        </div>

        <div class="row mt-3 d-none d-md-flex">
          <div v-for="info in footerInfos" :key="info.name" class="col-6 col-lg-3">
            <h5>{{ info.name }}</h5>

            <ul>
              <li v-for="item in info.items" :key="item">
                <a href="#">{{ item }}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-3 mb-5 d-block d-md-none">
          <div
            v-for="(info, index) in footerInfos"
            :key="info.name"
            class="accordion"
            id="accordionPanelsStayOpenExample"
          >
            <div class="accordion-item">
              <h2 class="accordion-header" :id="`panelsStayOpen-heading${index}`">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  :data-bs-target="`#panelsStayOpen-collapse${index}`"
                  aria-expanded="false"
                  :aria-controls="`panelsStayOpen-collapse${index}`"
                >
                  {{ info.name }}
                </button>
              </h2>
              <div
                :id="`panelsStayOpen-collapse${index}`"
                class="accordion-collapse collapse"
                :aria-labelledby="`panelsStayOpen-heading${index}`"
              >
                <div class="accordion-body">
                  <ul>
                    <li v-for="item in info.items" :key="item">
                      <a href="#">{{ item }}</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.footer-icons i {
  transition: all 0.3s;
  font-size: 2rem;
  cursor: pointer;
}
.footer-icons i:hover {
  color: #4dd3ff;
}

.footer-icons::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1rem;
  z-index: 1;
  width: 100%;
  border-bottom: solid 1px grey;
}

footer ul li {
  margin-top: 0.5rem;
}

footer ul li a {
  transition: border-bottom-color 0.3s;
  border: 2px solid transparent;
  font-weight: 300;
  font-size: 0.9rem;
  cursor: pointer;
}

footer ul li a:hover {
  border-bottom-color: #4dd3ff;
}

.accordion-button:not(.collapsed) {
  color: #212529;
  background-color: transparent;
}

.accordion-button:focus {
  box-shadow: 0 0 4px #4dd3ff;
}

.accordion-button:not(.collapsed)::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%234dd3ff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}
</style>
