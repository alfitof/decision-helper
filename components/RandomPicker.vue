<template>
  <div class="animate-fade-up space-y-4">
    <div class="bg-white rounded-3xl p-6 border-2 border-ink card-shadow">
      <h2
        class="font-display text-xl font-bold text-ink mb-1 flex items-center gap-2"
      >
        <span>🎲</span> Random Picker
      </h2>
      <p class="text-sm text-ink/50 font-body mb-5">
        Kalau udah stuck banget, biar semesta yang milih 🌌
      </p>

      <div class="space-y-2 mb-4">
        <label
          class="font-display font-bold text-sm text-ink/60 uppercase tracking-wider block"
          >Masukin pilihan (min. 2)</label
        >
        <div v-for="(opt, i) in options" :key="i" class="flex gap-2">
          <input
            v-model="options[i]"
            :placeholder="`Pilihan ${i + 1}...`"
            class="flex-1 px-4 py-2.5 rounded-xl border-2 border-ink/10 focus:border-grape focus:outline-none font-body text-sm text-ink transition-colors bg-cream/50"
          />
          <button
            v-if="options.length > 2"
            @click="removeOption(i)"
            class="w-10 h-10 rounded-xl bg-red-50 border-2 border-red-200 text-red-400 hover:bg-red-100 transition-colors flex items-center justify-center font-bold"
          >
            ×
          </button>
        </div>
      </div>

      <button
        v-if="options.length < 6"
        @click="addOption"
        class="w-full py-2 rounded-xl border-2 border-dashed border-ink/20 text-ink/40 font-display font-bold text-sm hover:border-grape hover:text-grape transition-all mb-4"
      >
        + Tambah pilihan
      </button>

      <button
        @click="spin"
        :disabled="!hasValidOptions || isSpinning"
        class="btn-bounce w-full py-4 bg-grape text-white font-display font-black text-xl rounded-xl border-2 border-ink card-shadow-grape transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] disabled:opacity-40 flex items-center justify-center gap-3"
      >
        <span
          :class="
            isSpinning ? 'animate-spin-slow inline-block' : 'inline-block'
          "
          >🎲</span
        >
        {{ isSpinning ? "Lagi ngocok..." : "SPIN!" }}
      </button>
    </div>

    <Transition name="pop">
      <div
        v-if="winner"
        class="bg-ink rounded-3xl p-6 border-2 border-ink text-center relative overflow-hidden"
      >
        <div class="absolute inset-0 pointer-events-none">
          <span
            v-for="n in 8"
            :key="n"
            class="absolute w-2 h-2 rounded-full"
            :style="{
              background: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A855F7'][n % 4],
              top: Math.random() * 80 + '%',
              left: Math.random() * 90 + '%',
              opacity: 0.6,
            }"
          ></span>
        </div>

        <p
          class="font-display font-bold text-cream/60 text-sm mb-1 uppercase tracking-widest"
        >
          Pilihannya adalah...
        </p>
        <p class="font-display font-black text-4xl text-lemon mt-1 mb-3">
          {{ winner }}
        </p>
        <p class="text-cream/60 font-body text-sm">
          Semesta udah nentuin! Sekarang gas aja 🚀
        </p>

        <button
          @click="spin"
          class="mt-4 px-6 py-2 bg-cream/10 hover:bg-cream/20 text-cream font-display font-bold text-sm rounded-xl border border-cream/20 transition-colors"
        >
          🔄 Spin lagi
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const options = ref(["", ""]);
const winner = ref("");
const isSpinning = ref(false);

const hasValidOptions = computed(
  () => options.value.filter((o) => o.trim()).length >= 2,
);

const addOption = () => {
  if (options.value.length < 6) options.value.push("");
};

const removeOption = (i: number) => {
  options.value.splice(i, 1);
};

const spin = async () => {
  const valid = options.value.filter((o) => o.trim());
  if (valid.length < 2) return;

  isSpinning.value = true;
  winner.value = "";

  await new Promise((r) => setTimeout(r, 1500));
  winner.value = valid[Math.floor(Math.random() * valid.length)];
  isSpinning.value = false;
};
</script>

<style scoped>
.pop-enter-active {
  animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes pop-in {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
