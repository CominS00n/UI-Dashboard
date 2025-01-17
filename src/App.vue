<template>
  <div>
    <div class="container-fluid grid grid-cols-5 gap-4">
      <nav class="container-nav p-4">
        <ul>
          <li class="flex items-center gap-2 my-4">
            <img src="@/assets/logo.png" alt="" class="h-10" />
            <h2 class="text-base">Komgip Technologies</h2>
          </li>
          <li
            v-for="item in menu"
            :key="item"
            class="my-2 p-2 flex items-center gap-x-2"
          >
            <button class="btn btn-icon scale-75">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: "
              >
                <path
                  d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"
                ></path>
              </svg>
            </button>
            {{ item }}
          </li>
        </ul>
        <div>
          <div class="card card-frame bg-gray-600 text-white">
            <div class="card-body">
              <p>Needhelp?</p>
              <p class="text-xs">CoinCap API 2.0</p>
              <button
                class="uppercase text-xs font-bold shadow-md w-full py-2 bg-white text-gray-600 rounded-md"
              >
                Documentation
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div class="container-content space-y-6 col-span-4">
        <div class="flex items-center justify-between">
          <div>
            <h6 class="text-gray-400">
              Pages / <span class="text-gray-600"> Dashboard</span>
            </h6>
            <h5 class="font-bold">Dashboard</h5>
          </div>
          <div class="user-profile flex items-center gap-2 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="fill-current text-gray-400"  
            >
              <path
                d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"
              ></path>
            </svg>
            <span>Phanuwit Hongsin</span>
          </div>
        </div>

        <div class="grid grid-cols-4 gap-x-6">
          <div class="card card-frame" v-for="item in data" :key="item.id">
            <div class="card-body flex items-center gap-4 justify-between">
              <div class="flex flex-col space-y-0">
                <p>{{ item.id }}</p>
                <h5 class="">${{ Number(item.priceUsd).toFixed(2) }}</h5>
                <p
                  :style="
                    Number(item.changePercent24Hr) > 0
                      ? 'color: green;'
                      : 'color: red;'
                  "
                >
                  {{ Number(item.changePercent24Hr).toFixed(2) }}%
                </p>
              </div>
              <div>
                <button
                  class="btn btn-icon bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    class="fill-white"
                  >
                    <path
                      d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <cryptocurrenies />
        </div>
        <footer>
          <p class=" text-gray-400 text-xs">
            Copyright &copy; 2022 Komgrip Technologies Co., Ltd.
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

import cryptocurrenies from "@/components/cryptocurrenies.vue";

type Data = {
  id: number;
  name: string;
  symbol: string;
  supply: number;
  maxSupply: number;
  priceUsd: number;
  changePercent24Hr: number;
};

const menu = ref(["Home", "Menu 1", "Menu 2", "Menu 3", "Menu 4"]);
const data = ref<Data[]>([]);

const getData = async () => {
  try {
    const response = await axios.get("https://komgrip.co.th/coincap/assets");
    console.log(response.data);
    data.value = response.data.data.slice(0, 4);
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await getData();
});
</script>
