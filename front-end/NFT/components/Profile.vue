<template>
  <div class="container text-center mt-4 mb-5">
    <h1>我的NFT</h1>
    <div class="row justify-content-between flex-wrap">
      <div v-for="(value, index) in data" :key="index" class="col text-center mb-4">
        <h2>{{ value.name }}</h2>
        <img :src="value.image" alt="" class="w-25"/>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { ethers } from 'ethers';
import MarketplaceJSON from "../Marketplace.json";
import { useRoute } from 'vue-router';


const data = ref([]);
const address = ref('0x');
const totalPrice = ref('0');
const dataFetched = ref(false);

const getNFTData = async () => {
  let sumPrice = 0;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const addr = await signer.getAddress();
  let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
  let transaction = await contract.getMyNFTs()
  

  const items = await Promise.all(transaction.map(async i => {
    try {
      const tokenURI = await contract.tokenURI(i.tokenId);
    let meta = await axios.get(tokenURI);
    meta = meta.data;
    
    

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
    console.log(tokenURI)
    sumPrice += Number(price);
    return item;
    
    } catch (error) {
      console.log(error)
    }
    
  }))

  data.value = items;
  dataFetched.value = true;
  address.value = addr;
  totalPrice.value = sumPrice.toPrecision(3);
}

const route = useRoute();
const tokenId = route.params.tokenId;

onMounted(() => {
  if (!dataFetched.value) {
    getNFTData(tokenId);
  }
})

watch(() => route.params.tokenId, async () => {
  data.value = [];
  dataFetched.value = false;
  await getNFTData();
});

</script>