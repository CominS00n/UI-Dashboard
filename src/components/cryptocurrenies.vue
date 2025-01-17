<template>
  <div class="card">
    <div class="card-header pb-0 flex items-center justify-between">
      <h6>Cryptocurrencies</h6>
      <div class="flex flex-wrap gap-2">
        <button class="btn btn-icon btn-sm btn-outline-secondary ms-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: "
          >
            <path
              d="M13.939 4.939 6.879 12l7.06 7.061 2.122-2.122L11.121 12l4.94-4.939z"
            ></path>
          </svg>
        </button>
        <button class="btn btn-icon btn-sm btn-outline-secondary ms-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style="fill: rgba(0, 0, 0, 1); transform: ; msfilter: "
          >
            <path
              d="M10.061 19.061 17.121 12l-7.06-7.061-2.122 2.122L12.879 12l-4.94 4.939z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table align-items-center mb-0">
        <thead>
          <tr>
            <th
              v-for="(item, index) in header"
              :key="index"
              class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 text-center"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="(item, index) in data" :key="item.id">
            <td>{{ index + 1 }}.</td>
            <td>{{ item.name }}</td>
            <td>{{ item.symbol }}</td>
            <td class="text-end">
              {{ formatNumber(Math.floor(item.supply)) }} /
              {{
                formatNumber(Math.floor(item.maxSupply)) === "0"
                  ? "NO LIMIT"
                  : formatNumber(Math.floor(item.maxSupply))
              }}
            </td>
            <td>${{ Number(item.priceUsd).toFixed(2) }}</td>
            <td
              :style="
                Number(item.changePercent24Hr) > 0
                  ? 'color: green;'
                  : 'color: red;'
              "
            >
              {{ Number(item.changePercent24Hr).toFixed(2) }}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

type Data = {
  id: number;
  name: string;
  symbol: string;
  supply: number;
  maxSupply: number;
  priceUsd: number;
  changePercent24Hr: number;
};
const header = ref([
  "no",
  "name",
  "symbol",
  "supply/max suppy",
  "usd",
  "24 hr",
]);

const data = ref<Data[]>([]);

const getData = async () => {
  try {
    const response = await axios.get("https://komgrip.co.th/coincap/assets");
    console.log(response.data);
    data.value = response.data.data.slice(0, 5);
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await getData();
});

const formatNumber = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
</script>
