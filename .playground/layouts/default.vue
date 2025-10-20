<template>
  <base-layout>
    <template #header>
      <div class="header-content">
        <span>header</span>
        <ToggleSwitch />
      </div>
    </template>
    <template #tab>
      <div>tab</div>
    </template>
    <template #sider>
      <div>sider</div>
    </template>
    <slot/>
    <template #footer>
      <div>footer</div>
    </template>
  </base-layout>
</template>

<script setup lang="ts">

</script>

<style scoped>

.header-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 100%;
  justify-content: space-between;
  padding: 0 1rem 0 0;
}
</style>
