<template>
  <div class="noise-overlay">
    <!-- Blobs background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div
        class="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-coral/20 animate-blob"
      ></div>
      <div
        class="absolute top-[200px] right-[-150px] w-[350px] h-[350px] rounded-full bg-mint/20 animate-blob"
        style="animation-delay: 2s"
      ></div>
      <div
        class="absolute bottom-[-100px] left-[30%] w-[300px] h-[300px] rounded-full bg-lemon/30 animate-blob"
        style="animation-delay: 4s"
      ></div>
      <div
        class="absolute bottom-[100px] right-[10%] w-[250px] h-[250px] rounded-full bg-grape/10 animate-blob"
        style="animation-delay: 1s"
      ></div>
    </div>

    <NuxtPage />
  </div>
</template>
