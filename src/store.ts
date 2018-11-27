import Vue from 'vue'

export type IEditorMode = 'normal' | 'vim'

export interface IMemoryStore {
  state: {
    showPreferences: boolean
  }
}

export interface IPersistedStore {
  state: {
    editorMode: IEditorMode
    fontSize: number
    fontFamily: string
    lineNumbers: boolean
    language: string
    text: string
    theme: string
  }
  load(): void
  watch(vm: Vue, key: 'persisted'): any
}

const memoryStore: IMemoryStore = {
  state: {
    showPreferences: false,
  },
}

const persistedStore: IPersistedStore = {
  state: {
    editorMode: 'normal',
    fontSize: 13,
    fontFamily: '',
    lineNumbers: false,
    language: 'markdown',
    text: '',
    theme: 'dark-grad',
  },

  load() {
    const localState = localStorage.getItem('state')
    if (localState) {
      try {
        this.state = { ...this.state, ...JSON.parse(localState) }
      } catch (err) {
        console.error(err)
      }
    }
  },

  watch(vm: Vue, key: 'persisted') {
    return vm.$watch(
      key,
      value => {
        localStorage.setItem('state', JSON.stringify(value))
      },
      { deep: true }
    )
  },
}

export default {
  memoryStore,
  persistedStore,
}
