<template>
  <div class="animate-fade-up">
    <div
      v-if="!history.length"
      class="text-center py-16 bg-white rounded-3xl border-2 border-dashed border-ink/20"
    >
      <span class="text-5xl block mb-3">📭</span>
      <p class="font-display font-bold text-ink/40">
        Belum ada keputusan tersimpan
      </p>
      <p class="text-sm text-ink/30 font-body mt-1">Mulai compare dulu yuk!</p>
    </div>

    <div v-else>
      <div class="flex items-center justify-between mb-4">
        <p class="font-display font-bold text-ink/50 text-sm">
          {{ history.length }} keputusan tersimpan
        </p>
        <button
          @click="$emit('clear')"
          class="text-xs font-display font-bold text-red-400 hover:text-red-600 transition-colors px-3 py-1 rounded-lg hover:bg-red-50"
        >
          🗑 Hapus Semua
        </button>
      </div>

      <div class="space-y-3">
        <div
          v-for="(item, i) in history"
          :key="item.id"
          class="bg-white rounded-2xl p-4 border-2 border-ink card-shadow animate-fade-up"
          :style="{ animationDelay: i * 0.05 + 's' }"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-2">
                <span
                  class="tag text-white"
                  :class="item.winner === 'A' ? 'bg-coral' : 'bg-mint'"
                >
                  ✓ {{ item.winner === "A" ? item.optionA : item.optionB }}
                </span>
                <span class="text-xs text-ink/30 font-mono">
                  {{ formatDate(item.timestamp) }}
                </span>
              </div>

              <div class="flex items-center gap-1.5 flex-wrap">
                <span
                  class="text-xs font-body text-ink/60 truncate max-w-[100px]"
                  >{{ item.optionA }}</span
                >
                <span class="text-ink/20 text-xs">vs</span>
                <span
                  class="text-xs font-body text-ink/60 truncate max-w-[100px]"
                  >{{ item.optionB }}</span
                >
              </div>

              <p
                v-if="item.summary"
                class="text-xs text-ink/40 font-body mt-1.5 italic line-clamp-2"
              >
                "{{ item.summary }}"
              </p>
            </div>

            <button
              @click="$emit('delete', item.id)"
              class="shrink-0 w-7 h-7 rounded-lg bg-ink/5 hover:bg-red-50 text-ink/30 hover:text-red-400 transition-colors flex items-center justify-center text-xs"
            >
              ×
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ history: any[] }>();
defineEmits(["clear", "delete"]);

const formatDate = (ts: any) => {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
