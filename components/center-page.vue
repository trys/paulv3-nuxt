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
  padding: 60px 20px 30px;
  display: flex;
  width: 100%;
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
  color: #F56969;
  width: 100%;
}

.center-page__container > header {
  text-align: center;
}

.center-page__container > header h1 {
  margin-top: 10px;
}
</style>
