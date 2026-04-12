<template>
  <Transition name="pop">
    <div
      v-if="!selectedMood"
      class="bg-white rounded-3xl p-5 border-2 border-ink card-shadow mb-4"
    >
      <p class="font-display font-bold text-ink mb-1 flex items-center gap-2">
        <span>🌡️</span> Eh, lagi gimana nih?
      </p>
      <p class="text-sm text-ink/50 font-body mb-4">
        Biar AI-nya bisa kasih saran yang pas buat kondisi kamu sekarang.
      </p>
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="mood in moods"
          :key="mood.id"
          @click="selectMood(mood)"
          class="btn-bounce flex items-center gap-2 px-4 py-3 rounded-2xl border-2 border-ink/10 hover:border-ink bg-cream/50 hover:bg-cream transition-all font-body text-sm text-left"
        >
          <span class="text-xl">{{ mood.emoji }}</span>
          <div>
            <p class="font-display font-bold text-ink text-sm leading-tight">
              {{ mood.label }}
            </p>
            <p class="text-ink/40 text-xs">{{ mood.desc }}</p>
          </div>
        </button>
      </div>
    </div>

    <div
      v-else
      class="flex items-center gap-2 mb-4 px-4 py-2.5 bg-white rounded-2xl border-2 border-ink/10 w-fit"
    >
      <span class="text-lg">{{ selectedMood.emoji }}</span>
      <span class="font-display font-bold text-sm text-ink">{{
        selectedMood.label
      }}</span>
      <button
        @click="selectedMood = null"
        class="ml-1 text-ink/30 hover:text-ink text-xs transition-colors"
      >
        ✕
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const emit = defineEmits(["mood-selected"]);

const selectedMood = ref<any>(null);

const moods = [
  {
    id: "stressed",
    emoji: "😮‍💨",
    label: "Stress banget",
    desc: "kepala mau meledak",
  },
  {
    id: "calm",
    emoji: "😌",
    label: "Tenang & santai",
    desc: "pikiran jernih nih",
  },
  { id: "excited", emoji: "🤩", label: "Excited!", desc: "pengen cepet-cepet" },
  {
    id: "confused",
    emoji: "😵‍💫",
    label: "Bingung poll",
    desc: "gak tau harus gimana",
  },
  { id: "tired", emoji: "😴", label: "Capek bgt", desc: "energi low nih" },
  { id: "yolo", emoji: "🤙", label: "YOLO aja", desc: "apapun gpp lah" },
];

const selectMood = (mood: any) => {
  selectedMood.value = mood;
  emit("mood-selected", mood);
};
</script>
