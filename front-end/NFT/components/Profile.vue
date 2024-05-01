<template>
  <div>
    Profile
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ethers } from 'ethers';
import MarketplaceJSON from "../Marketplace.json";
import { useRoute } from 'vue-router';

const data = ref([]);
const address = ref('0x');
const totalPrice = ref('0');
const dataFetched = ref(false);

const getNFTData = async (tokenId) => {
  let sumPrice = 0;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const addr = await signer.getAddress();
  let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
  let transaction = await contract.getMyNFTs()

  const items = await Promise.all(transaction.map(async i => {
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
    sumPrice += Number(price);
    return item;
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
</script>