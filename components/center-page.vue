<template>
  <main class="center-page">
    <div class="center-page__container">
      <slot />
    </div>
  </main>
</template>

<style>
.center-page {
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 80px 20px 50px;
  display: flex;
  width: 100%;
  color: #F56969;
}

.center-page__container:before,
.center-page__container:after {
  position: absolute;
  bottom: 100%;
  width: 100%;
  left: 0;
  height: 20px;
  background: url('~/assets/images/wave2.svg') bottom left /100% 100% no-repeat;
  content: '';
}

.center-page__container:after {
  transform: scale(-1);
  bottom: auto;
  top: 100%;
}

.center-page__container {
  background: #FFF;
  max-width: 400px;
  position: relative;
  padding: 20px;
  color: inherit;
  width: 100%;
  pointer-events: all;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
}

.center-page__container > header {
  text-align: center;
}

.center-page__container > header h1 {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
