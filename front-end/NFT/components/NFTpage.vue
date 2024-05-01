<template>
    <div>NFTPage</div>
    <div>{{ data.name }}</div>
    <img :src="data.image" alt="" crossOrigin="anonymous" class="w-50"/>
    <div>{{ data.description }}</div>
    <div>售價：{{ data.price }}</div>
    <div>Token ID：{{ data.tokenId }}</div>
    <div>賣家：{{ data.seller }}</div>
    <div>擁有者：{{ data.owner }}</div>
    <button @click="buyNFT">購買</button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ethers } from 'ethers';
import axios from 'axios';
import MarketplaceJSON from "../Marketplace.json";
import { GetIpfsUrlFromPinata } from "../utils";


const data = ref({});
const dataFetched = ref(false);
const message = ref("");
const currAddress = ref("0x");

const route = useRoute();
const tokenId = route.params.tokenId;

const getNFTData = async (tokenId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
    var tokenURI = await contract.tokenURI(tokenId);
    const listedToken = await contract.getListedTokenForId(tokenId);
    tokenURI = GetIpfsUrlFromPinata(tokenURI);
    let meta = await axios.get(tokenURI);
    meta = meta.data;

    let item = {
        price: meta.price,
        tokenId: tokenId,
        seller: listedToken.seller,
        owner: listedToken.owner,
        image: meta.image,
        name: meta.name,
        description: meta.description,
    }
    data.value = item;
    dataFetched.value = true;
    currAddress.value = addr;
    if (typeof data.value.image == "string")
    data.value.image = GetIpfsUrlFromPinata(data.value.image);
};

const buyNFT = async (tokenId) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);
    const salePrice = ethers.utils.parseUnits(data.value.price, 'ether')
    message.value = "Buying the NFT... Please Wait (Upto 5 mins)"
    let transaction = await contract.executeSale(tokenId, {value:salePrice});
    await transaction.wait();

    alert('You successfully bought the NFT!');
    message.value = "";
  }
  catch(e) {
    alert("Upload Error"+e)
  }
};


onMounted(async () => {
  if (!dataFetched.value)
    await getNFTData(tokenId); 
});
</script>
