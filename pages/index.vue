<template>
  <div class="relative z-10 min-h-screen py-8 px-4 max-w-[43rem] mx-auto">
    <header class="text-center mb-6 animate-fade-up">
      <div class="flex items-center justify-center gap-2 mb-2">
        <span class="text-3xl animate-wiggle inline-block">🧠</span>
        <span
          class="tag bg-lemon text-ink border border-ink"
          style="animation-delay: 0.1s"
          >anti-overthinking</span
        >
      </div>
      <h1
        class="font-display text-4xl sm:text-5xl font-black tracking-tight text-ink leading-none"
      >
        Gimana
        <span
          class="relative inline-block text-coral"
          style="text-decoration: underline wavy #ff6b6b"
        >
          Enaknya
        </span>
      </h1>
      <p class="mt-6 text-soft-ink/70 font-body text-lg">
        Berhenti mikir, mulai milih. 🫵
      </p>
    </header>

    <div
      class="flex gap-2 mb-6 bg-ink/5 p-1.5 rounded-2xl border border-ink/10"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'flex-1 py-2 px-3 rounded-xl font-display font-bold text-sm transition-all duration-300 flex items-center justify-center gap-1.5',
          activeTab === tab.id
            ? 'bg-ink text-cream shadow-md scale-[1.02]'
            : 'text-ink/60 hover:text-ink hover:bg-ink/10',
        ]"
      >
        <span>{{ tab.icon }}</span>
        <span class="hidden sm:inline">{{ tab.label }}</span>
      </button>
    </div>

    <Transition name="slide-fade" mode="out-in">
      <div v-if="activeTab === 'compare'" key="compare">
        <DecisionCard @decision-saved="saveToHistory" />
      </div>
      <div v-else-if="activeTab === 'matrix'" key="matrix">
        <PriorityMatrix />
      </div>
      <div v-else-if="activeTab === 'random'" key="random">
        <RandomPicker />
      </div>

      <div v-else-if="activeTab === 'history'" key="history">
        <HistoryPanel
          :history="history"
          @clear="clearHistory"
          @delete="deleteHistoryItem"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const activeTab = ref("compare");

const tabs = [
  { id: "compare", icon: "⚡", label: "Compare" },
  { id: "matrix", icon: "📊", label: "Matrix" },
  { id: "random", icon: "🎲", label: "Random" },
  { id: "history", icon: "📖", label: "History" },
];

const history = ref<any[]>([]);

onMounted(() => {
  const stored = localStorage.getItem("decision-history");
  if (stored) history.value = JSON.parse(stored);
});

const saveToHistory = (entry: any) => {
  history.value.unshift({ ...entry, id: Date.now(), timestamp: new Date() });
  localStorage.setItem("decision-history", JSON.stringify(history.value));
};

const clearHistory = () => {
  history.value = [];
  localStorage.removeItem("decision-history");
};

const deleteHistoryItem = (id: number) => {
  history.value = history.value.filter((h) => h.id !== id);
  localStorage.setItem("decision-history", JSON.stringify(history.value));
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
