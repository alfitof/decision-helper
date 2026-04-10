<template>
  <div class="noise-overlay">
    <Transition name="loading-fade">
      <div
        v-if="isLoading"
        class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-cream"
        style="font-family: Syne, sans-serif"
      >
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            class="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full bg-coral/20 animate-blob"
          ></div>
          <div
            class="absolute bottom-[-80px] right-[-80px] w-[280px] h-[280px] rounded-full bg-mint/20 animate-blob"
            style="animation-delay: 2s"
          ></div>
          <div
            class="absolute top-[40%] left-[60%] w-[200px] h-[200px] rounded-full bg-lemon/30 animate-blob"
            style="animation-delay: 1s"
          ></div>
        </div>

        <div
          class="relative z-10 flex flex-col items-center gap-6 bottom-[1.5rem]"
        >
          <div class="relative">
            <div class="text-7xl animate-bounce-slow select-none">🧠</div>
            <span class="absolute -top-2 -right-3 text-2xl animate-spin-slow"
              >✨</span
            >
            <span
              class="absolute -bottom-1 -left-3 text-xl animate-bounce"
              style="animation-delay: 0.3s"
              >💫</span
            >
          </div>

          <div class="text-center">
            <h1
              class="text-4xl font-black tracking-tight text-ink leading-none"
            >
              Gimana
              <span
                class="text-coral"
                style="text-decoration: underline wavy #ff6b6b"
                >Enaknya</span
              >
            </h1>
            <p class="mt-4 text-soft-ink/60 font-body text-base">
              Bentar ya, lagi nyiapin otaknya dulu... 🤓
            </p>
          </div>

          <div class="flex items-center gap-2.5 mt-2">
            <span
              v-for="n in 3"
              :key="n"
              class="w-3 h-3 rounded-full bg-ink animate-bounce"
              :style="{ animationDelay: (n - 1) * 0.15 + 's' }"
            ></span>
          </div>

          <div class="text-center h-6 overflow-hidden">
            <Transition name="msg-swap" mode="out-in">
              <p :key="currentMsg" class="text-sm text-ink/40 font-mono">
                {{ loadingMessages[currentMsg] }}
              </p>
            </Transition>
          </div>
        </div>

        <div class="absolute bottom-8 flex items-center gap-2">
          <span class="tag bg-lemon text-ink border border-ink text-xs"
            >anti-overthinking</span
          >
          <span class="tag bg-ink text-cream text-xs">v1.0</span>
        </div>
      </div>
    </Transition>

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

<script setup lang="ts">
const isLoading = ref(true);
const currentMsg = ref(0);

const loadingMessages = [
  "lagi manasi otak dulu... 🔥",
  "ngopi dulu sebentar... ☕",
  "nyiapin pro & cons... 📋",
  "memanggil semesta... 🌌",
  "almost done bestie... 🫶",
];

let msgInterval: ReturnType<typeof setInterval>;

onMounted(() => {
  msgInterval = setInterval(() => {
    currentMsg.value = (currentMsg.value + 1) % loadingMessages.length;
  }, 700);

  const minWait = new Promise((r) => setTimeout(r, 2000));
  const fontReady = document.fonts.ready;

  Promise.all([minWait, fontReady]).then(() => {
    clearInterval(msgInterval);
    isLoading.value = false;
  });
});

onUnmounted(() => {
  clearInterval(msgInterval);
});
</script>

<style>
.loading-fade-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.loading-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
.msg-swap-enter-active,
.msg-swap-leave-active {
  transition: all 0.25s ease;
}
.msg-swap-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.msg-swap-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
