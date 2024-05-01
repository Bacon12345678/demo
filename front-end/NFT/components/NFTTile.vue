<template>
  <router-link :to="`/nftPage/${nftData.tokenId}`">
    <img :src="IPFSUrl" alt="" crossOrigin="anonymous" />
    <div>
      <strong class="text-xl">{{ nftData.name }}</strong>
      <p class="display-inline">
        {{ nftData.description }}
      </p>
    </div>
  </router-link>
</template>

<script setup>
import { GetIpfsUrlFromPinata } from "../utils";
import { onMounted } from 'vue';

const nftData = {
  tokenId: '',
  name: '',
  description: '',
  image: '',
};

let IPFSUrl = '';

onMounted(() => {
  getIPFSUrl();
});

const getIPFSUrl = () => {
  IPFSUrl = GetIpfsUrlFromPinata(nftData.image);
};
</script>
