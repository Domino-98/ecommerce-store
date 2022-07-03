<script setup lang="ts">
const props = defineProps({
  open: { type: Boolean, required: true },
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="modal-overlay-custom" @click="close"></div>
    </Transition>
    <Transition name="pop">
      <div v-if="open" class="modal-custom" role="dialog">
        <div class="sa">
          <slot name="icon">
            <div class="sa-success mx-auto">
              <div class="sa-success-tip"></div>
              <div class="sa-success-long"></div>
              <div class="sa-success-placeholder"></div>
              <div class="sa-success-fix"></div>
            </div>
          </slot>
        </div>
        <slot name="body"></slot>
        <slot name="button">
          <div>
            <div class="d-flex justify-content-evenly mt-4">
              <button class="btn btn-md btn-outline-info px-4" @click="close">Ok</button>
            </div>
          </div>
        </slot>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-custom {
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20000;
  margin: auto;
  text-align: center;
  width: fit-content;
  height: fit-content;
  width: 90%;
  max-width: 30em;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  background: #fff;
  transform: none;
}
.modal-custom h1 {
  margin: 0 0 1rem;
}

.modal-overlay-custom {
  content: "";
  position: absolute;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  background: #2c3e50;
  opacity: 0.6;
  cursor: pointer;
}

/* ---------------------------------- */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.2s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.2s linear;
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>
