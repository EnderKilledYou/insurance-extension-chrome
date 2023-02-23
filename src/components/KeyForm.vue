<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import {ref, watch} from "vue";
import {TalkToBack} from "../TalkToBack";
import ExtensionFooter from "./ExtensionFooter.vue";

let key_text = ref("")


//@ts-ignore
chrome.storage.local.get(["key"]).then((result) => {
  console.log(result)
  if (result.key) {
    key_text.value = result.key
  }
});

async function SetKey() {
  const data = {key: key_text.value};
  console.log(data);
  //@ts-ignore
  chrome.storage.local.set(data).then(() => {

  });
}
</script>

<template>
  <div class="mb-8">

    <div class="text-gray-900 font-bold text-xl mb-2">Open AI Key</div>
    <form class="w-full max-w-lg">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">

          </label>
          <input v-model="key_text"
                 class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                 id="grid-first-name" type="text" placeholder=""/>
          <p class="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>
        <div class="md:flex md:items-center">
          <button @click="SetKey"
                  class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Save
          </button>
        </div>
      </div>

    </form>
  </div>

</template>

