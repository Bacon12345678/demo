<template>
  <div>
    <div>
      <div class="container text-center mt-4 mb-5">
        <h1>所有商品</h1>
      </div>
      <div v-if="data && data.length > 0" class="row">
        <div v-for="(value, index) in data" :key="index" class="col text-center">
          <div @click="navigateToNFTPage(value.tokenId)" class="NFTsellsectoin" style="cursor: pointer;">
            <div><p class="fs-3">{{ value.name }}</p></div>
            <img :src="value.IPFSUrl" alt="" class="w-50"/>
            <div><p class="mt-3">{{ value.description }}</p></div>
            <div><p>售價：{{ value.price }} ETH</p></div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <h1>確保連接MetaMask<br>等待數據加載中...</h1>
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
import { useRouter } from 'vue-router';

const data = ref([]); // 初始化為一個空數組
const dataFetched = ref(false);

const router =useRouter();

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

const navigateToNFTPage = async(tokenId) => {
  router.push(`/nftPage/${tokenId}`);
};

</script>

<style>
.NFTsellsectoin:hover {
  box-shadow: 0 0 5px rgba(143, 142, 142, 0.5); 
}

</style>