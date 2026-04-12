<template>
  <div class="animate-fade-up space-y-4">
    <div class="bg-white rounded-3xl p-6 border-2 border-ink card-shadow">
      <h2
        class="font-display text-xl font-bold text-ink mb-1 flex items-center gap-2"
      >
        <span>📊</span> Priority Matrix
      </h2>
      <p class="text-sm text-ink/50 font-body mb-5">
        Rate setiap pilihan, biar angka yang ngomong.
      </p>

      <!-- Option Inputs -->
      <div class="grid grid-cols-2 gap-3 mb-5">
        <div>
          <label
            class="font-display font-bold text-xs text-ink/50 uppercase tracking-wider mb-1 block"
            >Pilihan A</label
          >
          <input
            v-model="optA"
            placeholder="Nama pilihan A..."
            class="w-full px-3 py-2.5 rounded-xl border-2 border-ink/10 focus:border-coral focus:outline-none font-body text-sm text-ink bg-cream/50 transition-colors"
          />
        </div>
        <div>
          <label
            class="font-display font-bold text-xs text-ink/50 uppercase tracking-wider mb-1 block"
            >Pilihan B</label
          >
          <input
            v-model="optB"
            placeholder="Nama pilihan B..."
            class="w-full px-3 py-2.5 rounded-xl border-2 border-ink/10 focus:border-mint focus:outline-none font-body text-sm text-ink bg-cream/50 transition-colors"
          />
        </div>
      </div>

      <!-- Sliders -->
      <div class="space-y-5">
        <div v-for="factor in factors" :key="factor.id">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="text-base">{{ factor.emoji }}</span>
              <span class="font-display font-bold text-sm text-ink">{{
                factor.label
              }}</span>
            </div>
            <span class="font-mono text-xs text-ink/40">{{ factor.desc }}</span>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <!-- A slider -->
            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono text-coral">A</span>
                <span class="text-xs font-mono font-bold text-coral">{{
                  ratings[factor.id].a
                }}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                v-model.number="ratings[factor.id].a"
                class="w-full accent-[#FF6B6B]"
              />
            </div>
            <!-- B slider -->
            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono text-mint">B</span>
                <span class="text-xs font-mono font-bold text-mint">{{
                  ratings[factor.id].b
                }}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                v-model.number="ratings[factor.id].b"
                class="w-full accent-[#4ECDC4]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scores Result -->
    <div
      v-if="optA || optB"
      class="bg-white rounded-3xl p-5 border-2 border-ink card-shadow"
    >
      <p
        class="font-display font-bold text-sm text-ink/50 uppercase tracking-wider mb-4"
      >
        Skor Total
      </p>
      <div class="grid grid-cols-2 gap-3 mb-4">
        <!-- Score A -->
        <div
          class="rounded-2xl p-4 border-2 text-center transition-all"
          :class="
            scoreA >= scoreB
              ? 'border-coral bg-coral/5 card-shadow-coral'
              : 'border-ink/10 bg-cream/50'
          "
        >
          <p class="font-display font-bold text-sm text-ink/60 mb-1">
            {{ optA || "Pilihan A" }}
          </p>
          <p
            class="font-display font-black text-4xl"
            :class="scoreA >= scoreB ? 'text-coral' : 'text-ink/40'"
          >
            {{ scoreA }}
          </p>
          <p class="text-xs font-mono text-ink/30 mt-1">/ 30</p>
          <span
            v-if="scoreA >= scoreB && scoreA !== scoreB"
            class="inline-block mt-2 text-xs font-display font-bold bg-coral text-white px-3 py-0.5 rounded-full"
          >
            🏆 Unggul
          </span>
        </div>
        <!-- Score B -->
        <div
          class="rounded-2xl p-4 border-2 text-center transition-all"
          :class="
            scoreB > scoreA
              ? 'border-mint bg-mint/5 card-shadow-mint'
              : 'border-ink/10 bg-cream/50'
          "
        >
          <p class="font-display font-bold text-sm text-ink/60 mb-1">
            {{ optB || "Pilihan B" }}
          </p>
          <p
            class="font-display font-black text-4xl"
            :class="scoreB > scoreA ? 'text-mint' : 'text-ink/40'"
          >
            {{ scoreB }}
          </p>
          <p class="text-xs font-mono text-ink/30 mt-1">/ 30</p>
          <span
            v-if="scoreB > scoreA"
            class="inline-block mt-2 text-xs font-display font-bold bg-mint text-white px-3 py-0.5 rounded-full"
          >
            🏆 Unggul
          </span>
        </div>
      </div>

      <!-- Bar comparison -->
      <div class="space-y-2">
        <div
          v-for="factor in factors"
          :key="factor.id"
          class="flex items-center gap-2"
        >
          <span class="text-sm w-5 text-center">{{ factor.emoji }}</span>
          <div class="flex-1 flex gap-1 items-center">
            <div
              class="flex-1 h-2 rounded-full bg-ink/5 overflow-hidden flex justify-end"
            >
              <div
                class="h-full rounded-full bg-coral transition-all duration-500"
                :style="{ width: (ratings[factor.id].a / 10) * 100 + '%' }"
              ></div>
            </div>
            <span class="text-xs font-mono text-ink/30 w-4 text-center">{{
              ratings[factor.id].a
            }}</span>
            <span class="text-xs text-ink/20">|</span>
            <span class="text-xs font-mono text-ink/30 w-4 text-center">{{
              ratings[factor.id].b
            }}</span>
            <div class="flex-1 h-2 rounded-full bg-ink/5 overflow-hidden">
              <div
                class="h-full rounded-full bg-mint transition-all duration-500"
                :style="{ width: (ratings[factor.id].b / 10) * 100 + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <p
        v-if="scoreA === scoreB"
        class="text-center text-sm text-ink/40 font-body mt-4"
      >
        Seri! 🤝 Harus pakai insting nih...
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
type FactorId = "impact" | "effort" | "urgency";

const optA = ref("");
const optB = ref("");

const factors: { id: FactorId; emoji: string; label: string; desc: string }[] =
  [
    {
      id: "impact",
      emoji: "💥",
      label: "Dampak",
      desc: "seberapa besar pengaruhnya",
    },
    {
      id: "effort",
      emoji: "💪",
      label: "Effort",
      desc: "seberapa mudah dilakukan",
    },
    { id: "urgency", emoji: "⚡", label: "Urgency", desc: "seberapa mendesak" },
  ];

const ratings = ref<Record<FactorId, { a: number; b: number }>>({
  impact: { a: 5, b: 5 },
  effort: { a: 5, b: 5 },
  urgency: { a: 5, b: 5 },
});

const scoreA = computed(() =>
  Object.values(ratings.value).reduce((sum, v) => sum + v.a, 0),
);
const scoreB = computed(() =>
  Object.values(ratings.value).reduce((sum, v) => sum + v.b, 0),
);
</script>
