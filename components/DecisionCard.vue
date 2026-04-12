<template>
  <div class="space-y-4 animate-fade-up">
    <Transition name="toast">
      <div
        v-if="showToast"
        class="fixed bottom-[-4.2rem] left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-ink text-cream px-5 py-3 rounded-2xl border-2 border-lemon card-shadow font-display font-bold text-sm shadow-xl"
      >
        <span class="text-lg">📌</span>
        Keputusan tersimpan ke history!
      </div>
    </Transition>
    <MoodCheck @mood-selected="onMoodSelected" />
    <div class="bg-white rounded-3xl p-6 border-2 border-ink card-shadow">
      <h2
        class="font-display text-xl font-bold text-ink mb-4 flex items-center gap-2"
      >
        <span
          class="w-7 h-7 bg-coral rounded-full flex items-center justify-center text-white text-sm"
          >1</span
        >
        Masukkan pilihanmu
      </h2>

      <div class="mb-3">
        <label
          class="font-display font-bold text-sm text-ink/60 uppercase tracking-wider mb-1 block"
          >Pilihan A</label
        >
        <div class="relative">
          <span
            class="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-coral rounded-lg flex items-center justify-center text-white font-bold text-sm"
            >A</span
          >
          <input
            v-model="optionA"
            type="text"
            placeholder="contoh: Lanjut kuliah S2"
            class="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-ink/10 focus:border-coral focus:outline-none font-body text-ink transition-colors bg-cream/50"
          />
        </div>
      </div>

      <div class="flex items-center gap-2 my-3">
        <div class="flex-1 h-px bg-ink/10"></div>
        <span class="font-display font-black text-ink/20 text-lg">VS</span>
        <div class="flex-1 h-px bg-ink/10"></div>
      </div>

      <div class="mb-4">
        <label
          class="font-display font-bold text-sm text-ink/60 uppercase tracking-wider mb-1 block"
          >Pilihan B</label
        >
        <div class="relative">
          <span
            class="absolute left-3 top-1/2 -translate-y-1/2 w-7 h-7 bg-mint rounded-lg flex items-center justify-center text-white font-bold text-sm"
            >B</span
          >
          <input
            v-model="optionB"
            type="text"
            placeholder="contoh: Langsung kerja"
            class="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-ink/10 focus:border-mint focus:outline-none font-body text-ink transition-colors bg-cream/50"
          />
        </div>
      </div>

      <div class="mb-4">
        <label
          class="font-display font-bold text-sm text-ink/60 uppercase tracking-wider mb-1 block"
        >
          Konteks <span class="normal-case font-normal">(opsional)</span>
        </label>
        <textarea
          v-model="context"
          placeholder="Ceritain situasimu... biar AI-nya ngerti 🤓"
          rows="2"
          class="w-full px-4 py-3 rounded-xl border-2 border-ink/10 focus:border-lemon focus:outline-none font-body text-ink transition-colors bg-cream/50 resize-none"
        ></textarea>
      </div>

      <button
        @click="analyzeWithAI"
        :disabled="!optionA || !optionB || isLoading"
        class="btn-bounce w-full py-3.5 bg-ink text-cream font-display font-bold text-lg rounded-xl border-2 border-ink card-shadow transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <span v-if="isLoading" class="flex items-center gap-2">
          <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          AI lagi mikir<span class="typing-dots"></span>
        </span>
        <span v-else>✨ Analisis dengan AI</span>
      </button>
    </div>

    <Transition name="pop">
      <div v-if="result" class="space-y-3">
        <div
          class="rounded-3xl p-5 border-2 border-ink text-white font-display"
          :class="
            result.winner === 'A'
              ? 'bg-coral card-shadow-coral'
              : 'bg-mint card-shadow-mint'
          "
        >
          <div class="flex items-center justify-between mb-1">
            <span class="text-sm font-medium opacity-80">Rekomendasi AI</span>
            <span class="text-2xl">🏆</span>
          </div>
          <p class="text-2xl font-black">
            {{ result.winner === "A" ? snapshotA : snapshotB }}
          </p>
          <p class="text-sm mt-1 opacity-90">{{ result.summary }}</p>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="bg-white rounded-2xl p-4 border-2 border-ink card-shadow">
            <div class="flex items-center gap-1.5 mb-3">
              <span
                class="w-6 h-6 bg-coral rounded-md flex items-center justify-center text-white font-bold text-xs"
                >A</span
              >
              <span class="font-display font-bold text-sm truncate">{{
                snapshotA
              }}</span>
            </div>
            <div class="space-y-1.5">
              <div
                v-for="pro in result.optionA.pros"
                :key="pro"
                class="flex items-start gap-1.5"
              >
                <span class="text-green-500 text-xs mt-0.5 shrink-0">✓</span>
                <span class="text-xs text-ink/70 font-body">{{ pro }}</span>
              </div>
              <div
                v-for="con in result.optionA.cons"
                :key="con"
                class="flex items-start gap-1.5"
              >
                <span class="text-red-400 text-xs mt-0.5 shrink-0">✗</span>
                <span class="text-xs text-ink/70 font-body">{{ con }}</span>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-4 border-2 border-ink card-shadow">
            <div class="flex items-center gap-1.5 mb-3">
              <span
                class="w-6 h-6 bg-mint rounded-md flex items-center justify-center text-white font-bold text-xs"
                >B</span
              >
              <span class="font-display font-bold text-sm truncate">{{
                snapshotB
              }}</span>
            </div>
            <div class="space-y-1.5">
              <div
                v-for="pro in result.optionB.pros"
                :key="pro"
                class="flex items-start gap-1.5"
              >
                <span class="text-green-500 text-xs mt-0.5 shrink-0">✓</span>
                <span class="text-xs text-ink/70 font-body">{{ pro }}</span>
              </div>
              <div
                v-for="con in result.optionB.cons"
                :key="con"
                class="flex items-start gap-1.5"
              >
                <span class="text-red-400 text-xs mt-0.5 shrink-0">✗</span>
                <span class="text-xs text-ink/70 font-body">{{ con }}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-white rounded-2xl p-4 border-2 border-grape card-shadow-grape"
        >
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xl">💬</span>
            <span class="font-display font-bold text-sm">Kata AI-nya...</span>
          </div>
          <p class="text-sm text-ink/80 font-body leading-relaxed italic">
            {{ result.insight }}
          </p>
        </div>

        <button
          @click="saveDecision"
          class="btn-bounce w-full py-3 bg-lemon text-ink font-display font-bold rounded-xl border-2 border-ink card-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2"
        >
          📌 Simpan ke History
        </button>
      </div>
    </Transition>

    <div
      v-if="errorMsg"
      class="bg-red-50 border-2 border-red-300 rounded-2xl p-4 text-sm text-red-600 font-body"
    >
      ⚠️ {{ errorMsg }}
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["decision-saved"]);

const optionA = ref("");
const optionB = ref("");
const context = ref("");

const snapshotA = ref("");
const snapshotB = ref("");

const isLoading = ref(false);
const result = ref<any>(null);
const errorMsg = ref("");

const selectedMood = ref<any>(null);
const onMoodSelected = (mood: any) => {
  selectedMood.value = mood;
};

const showToast = ref(false);
let toastTimer: ReturnType<typeof setTimeout> | null = null;

const analyzeWithAI = async () => {
  if (!optionA.value || !optionB.value) return;
  isLoading.value = true;
  errorMsg.value = "";
  result.value = null;

  snapshotA.value = optionA.value;
  snapshotB.value = optionB.value;

  try {
    const res = await $fetch("/api/analyze", {
      method: "POST",
      body: {
        optionA: optionA.value,
        optionB: optionB.value,
        context: context.value,
        mood: selectedMood.value?.id || null,
      },
    });
    result.value = res;
  } catch (e: any) {
    errorMsg.value =
      e?.data?.message || "Gagal koneksi ke n8n. Cek webhook URL!";
  } finally {
    isLoading.value = false;
  }
};

const saveDecision = () => {
  if (!result.value) return;

  emit("decision-saved", {
    optionA: snapshotA.value,
    optionB: snapshotB.value,
    context: context.value,
    winner: result.value.winner,
    summary: result.value.summary,
  });

  showToast.value = true;
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    showToast.value = false;
  }, 2500);
};
</script>

<style scoped>
.pop-enter-active {
  animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-leave-active {
  animation: pop-in 0.2s reverse ease;
}
@keyframes pop-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.toast-enter-active {
  animation: slide-up 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.toast-leave-active {
  animation: slide-up 0.2s reverse ease;
}
</style>
