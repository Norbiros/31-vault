<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  file: FileEntry
}>()

const isModalOpen = ref(false)

interface FileEntry {
  name: string
  type: 'lock' | 'empty' | 'video' | 'doc' | 'img'
}

const cookie = useCookie(props.file.name)
const isUnlocked = computed(() => {
  return !!cookie.value
})

function getIcon(type: string) {
  switch (type) {
    case 'lock':
      return 'lucide:lock-keyhole'
    case 'video':
      return 'lucide:circle-play'
    case 'doc':
      return 'lucide:file-text'
    case 'img':
      return 'lucide:image'
    default:
      return 'lucide:circle-help'
  }
}

function onClick() {
  if (isUnlocked.value) {
    isModalOpen.value = true
  }
}
</script>

<template>
  <div
    class="p-3 transition-colors"
    :class="[
      file.type === 'empty'
        ? 'border border-dashed border-cyan-900 flex items-center justify-center'
        : 'file-item border border-cyan-700 bg-gray-900/50 hover:bg-cyan-900/40 cursor-pointer',
    ]"
    @click="onClick"
  >
    <FileModal v-model="isModalOpen" :file-name="file.name" :type="file.type" :unlocked="isUnlocked" />

    <template v-if="file.type === 'empty'">
      <p class="text-cyan-700">
        {{ file.name }}
      </p>
    </template>
    <template v-else>
      <UIcon
        :name="getIcon(file.type)"
        mode="svg"
        class="w-10 h-10 mx-auto mb-2 text-cyan-500 icon-glow transition-all"
      />
      <p class="text-center truncate">
        {{ file.name }}
      </p>
      <p
        class="file-status text-center text-xs"
        :class="isUnlocked ? 'text-green-400' : 'text-red-500'"
      >
        {{ isUnlocked ? '[DOSTĘPNY]' : '[ZASZYFROWANY]' }}
      </p>
    </template>
  </div>
</template>
