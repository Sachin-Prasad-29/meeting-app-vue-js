<template>
  <div class="alert">
    <div class="alert-box" :class="this.alert">
      {{ this.Message }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlertBox',
  props: ['Message', 'alert'],
};
</script>

<style>
.alert {
  width: 50%;
  margin: 5px auto;
  margin-bottom: 0;
  text-align: center;
}
.alert-box {
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 5px;
  color: white;
  font-size: 0.7em;
}
.danger {
  background: rgb(221, 39, 39);
}
.success {
  background: rgba(113, 204, 8, 0.973);
}
@media all and (max-width: 900px) {
  .alert {
    width: 70%;
  }
}
@media all and (max-width: 650px) {
  .alert {
    width: 80%;
  }
}
</style>
