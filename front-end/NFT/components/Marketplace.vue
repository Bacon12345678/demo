<template>
  <div>
    <NFTNavbar/>
    <div>
      <div class="container text-center m-5">
        <h1>所有商品</h1>
      </div>
      <div v-if="data && data.length > 0" class="row">
        <div v-for="(value, index) in data" :key="index" class="col text-center">
          <router-link :to="`/nftPage/${value.tokenId}`">
          <img :src="value.IPFSUrl" alt="" class = "w-50"/>
          <div>{{ value.name }}</div>
          <div>{{ value.description }}</div>
        </router-link>
        </div>
      </div>
      <div v-else>
        加載中...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ethers } from 'ethers';
import MarketplaceJSON from "../Marketplace.json";
import { GetIpfsUrlFromPinata } from "../utils";
import NFTNavbar from './NFTNavbar.vue';

const data = ref([]); // 初始化為一個空數組
const dataFetched = ref(false);

const getAllNFTs = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
  let transaction = await contract.getAllNFTs()

  const items = await Promise.all(transaction.map(async i => {
    try {
      var tokenURI = await contract.tokenURI(i.tokenId);
      tokenURI = GetIpfsUrlFromPinata(tokenURI);
      console.log('getipfs',tokenURI)
      let meta = await axios.get(tokenURI);
      console.log('meta',meta)
      meta = meta.data;
      console.log('meta.data',meta.data)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        image: meta.image,
        name: meta.name,
        description: meta.description,
      }
      console.log('item',item)
      return item;
    } catch (error) {
        console.log(error)
    }
  }))

  dataFetched.value = true;
  data.value = items;
};

const getIPFSUrl = () => {
  data.value.forEach(value => {
    value.IPFSUrl = GetIpfsUrlFromPinata(value.image);
  });
};

onMounted(async () => { 
  try {
    await getAllNFTs(); 
    getIPFSUrl(); 
    console.log(data.value)
  } catch (error) {
    console.log(error)
  }
});
</script>
