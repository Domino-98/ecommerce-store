<template>
  <div
    class="newsletter mt-5 p-5 text-light d-flex flex-column align-items-center justify-content-center"
  >
    <h1>Newsletter</h1>

    <form class="newsletter-form text-center">
      <label for="newsletter" class="form-label mt-3 fs-5">Dołącz do nas</label>
      <div class="input-group mt-3 align-self-center">
        <input
          id="newsletter"
          type="email"
          class="form-control p-2"
          placeholder="Podaj adres email"
          aria-label="Podaj adres email"
          aria-describedby="basic-addon2"
          required
        />
        <button type="submit" class="btn btn-info text-light newsletter-btn">
          Zapisz się
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.newsletter {
  position: relative;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("../assets/newsletter-bg.jpg");

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.newsletter-form {
  max-width: 25rem;
  width: 100%;
}

.newsletter h1 {
  text-transform: uppercase;
  font-size: 3rem;
}

.newsletter p {
  font-size: 1.4rem;
}

.newsletter-form input {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}

.newsletter-form input:focus {
  box-shadow: none;
}

.newsletter-btn {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.quantity-input {
  text-align: center;
  width: 2.6rem;
  height: 2.6rem;
  border: none;
  background-color: #eee;
  transition: all 0.3s;
}

.quantity-input:focus {
  outline: none;
  box-shadow: 0 0 4px #00bfff;
}
</style>
