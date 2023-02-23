<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import {onMounted, ref} from "vue";
import AskForm from "./components/AskForm.vue";
import KeyForm from "./components/KeyForm.vue";
import {TalkToBack} from "./TalkToBack";

const prompt_text = ref("")
let response_text = ref("")

let has_key = ref<boolean>(false)
let want_settings = ref<boolean>(false)

function want_settings_click() {
  want_settings.value = !want_settings.value
}

//@ts-ignore
chrome.storage.local.get(["key"]).then((result) => {

  has_key.value = result.key;
});


//@ts-ignore
chrome.storage.onChanged.addListener((changes, namespace) => {
  //@ts-ignore
  for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
    if (key === 'key') {

      //let has_key = ref(await TalkToBack({hasKey: true}));
      has_key = newValue;

    }
    console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
    );
  }
});
</script>

<template>

  <div class="max-w-sm w-full lg:max-w-full lg:flex">
    <div
        class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
      <div class="mb-8">
        <button @click="want_settings_click"
                class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          Settings
        </button>
      </div>

    <ask-form v-if="has_key && !want_settings"/>
    <key-form v-else/>
    </div>
  </div>

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
