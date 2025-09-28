import { ref, watch } from 'vue'

export function useDecryptionDict(storageKey: string) {
  const decryptions = ref<Record<string, string>>({})

  if (import.meta.client) {
    const raw = localStorage.getItem(storageKey)
    decryptions.value = raw ? JSON.parse(raw) : {}

    watch(
      decryptions,
      (val) => {
        localStorage.setItem(storageKey, JSON.stringify(val))
      },
      { deep: true },
    )
  }

  function addDecryption(cipher: string, plain: string) {
    decryptions.value[cipher] = plain
  }

  function getDecryption(cipher: string) {
    return decryptions.value[cipher] ?? null
  }

  function removeDecryption(cipher: string) {
    delete decryptions.value[cipher]
  }

  function clearAll() {
    decryptions.value = {}
  }

  return { decryptions, addDecryption, getDecryption, removeDecryption, clearAll }
}
