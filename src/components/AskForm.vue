<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import {ref} from "vue";
import {Configuration, OpenAIApi} from "openai";

const prompt_text = ref("")
let response_text = ref("")
//@ts-ignore
const storage_key = await chrome.storage.local.get(["key"])
const key_text = ref(storage_key.key)
const configuration = new Configuration({
  apiKey: storage_key.key,
});
const openai = new OpenAIApi(configuration);

async function OpenaiFetchAPI() {
  console.log("Calling GPT3")
  const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt_text.value,
      }
  );
  return completion.data.choices[0].text;
}

async function AskOpen() {
  response_text.value = await OpenaiFetchAPI()
}
</script>

<template>
  <div class="mb-8">

    <div class="text-gray-900 font-bold text-xl mb-2">Prompt</div>
    <form class="w-full max-w-lg">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">

          </label>
          <textarea v-model="prompt_text"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name" type="text" placeholder=""></textarea>
          <p class="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>
        <div class="md:flex md:items-center">
          <button @click="AskOpen"
                  class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Ask
          </button>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-100 px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
            Response
          </label>
          <textarea rows="10" v-model="response_text"
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                    id="grid-first-name" type="text" placeholder=""></textarea>

        </div>

      </div>
    </form>
  </div>

</template>

