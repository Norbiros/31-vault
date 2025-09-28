<script setup lang="ts">
import { computed } from 'vue'
import FileModal from '~/components/FileModal.vue'

const highlight = computed(() => useRoute().query.highlight)

useHead({
  title: 'Archiwum 31 | Jakub Starzyk 25/26',
})

interface FileEntry {
  name: string
  type: 'lock' | 'empty' | 'video' | 'doc' | 'img'
  unlocked: boolean
}

interface Folder {
  name: string
  files: FileEntry[]
}

// const { data: folders } = useFetch<Folder[]>('/api/archive/config.json')

const folders = ref<Folder[]>([]) // completely new reactive variable

const { data, error } = await useFetch<Folder[]>('/api/archive/config.json')

// Watch the fetch result and update our reactive variable
watch(
  [data, error],
  () => {
    if (error.value) {
      folders.value = []
    } else if (data.value) {
      folders.value = data.value
    }
  },
  { immediate: true },
)

const allFiles = computed(() =>
  folders.value.flatMap(f => f.files),
)

const unlockedCount = computed(() =>
  allFiles.value.filter(f => f.unlocked && f.type !== 'empty').length,
)

const totalCount = computed(() =>
  allFiles.value.filter(f => f.type !== 'empty').length,
)

const isAllUnlocked = computed(() => unlockedCount.value === totalCount.value)

function clickFile(fileName: string) {
  if (fileName === highlight.value) {
    useRouter().push({ query: {} })
  }
}
</script>

<template>
  <div class="p-7 relative font-[VT323] bg-[#0a0a0a] text-[#00f8f8] overflow-x-hidden min-h-screen">
    <FileModal file-name="silly-billy-theme.webm" type="video" :unlocked="true" />
    <FileModal file-name="braun.png" type="img" :unlocked="true" />

    <div class="max-w-4xl mx-auto">
      <PageHeader :is-all-unlocked="isAllUnlocked" />

      <div class="text-center p-4 mb-6 border border-cyan-700 bg-cyan-900/20">
        <p class="text-xl">
          Inicjalizacja systemu... Zeskanuj kody QR dostępu z całej Szkoły, aby odblokować
          <span class="inline-block w-2 h-[2px] bg-cyan-400 animate-pulse" />
        </p>
      </div>

      <div id="file-structure">
        <div v-for="folder in folders" :key="folder.name" class="mt-6 first:mt-0">
          <h2 class="text-2xl mb-2 text-glow">
            [FOLDER] {{ folder.name }}
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <File
              v-for="file in folder.files"
              :key="file.name"
              :file="file"
              :highlight="highlight === file.name"
              @click="clickFile(file.name)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="text-center mt-12 text-sm text-cyan-600 opacity-70">
      Developed by <a href="https://norbiros.dev" target="_blank" class="text-cyan-400 hover:text-glow font-bold">
        Norbiros
      </a> for Jakub Starzyk Campaign 25/26
    </div>
  </div>
</template>

<style scoped>
.text-glow {
  text-shadow:
    0 0 5px #00f8f8,
    0 0 10px #00f8f8;
}

.file-item:not(.unlocked):hover .icon-glow {
  filter: drop-shadow(0 0 4px #00f8f8);
}
</style>
