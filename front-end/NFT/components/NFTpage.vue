<template>
   <button @click="goback">回上頁</button>
  <div class="container mt-3 p-5" style="margin-left:10rem;">
    <div class="row ">
      <div class="col ">
        <img :src="data.image" alt="" crossOrigin="anonymous" class="w-75"/>
      </div>

      <div class="col">
        <h1 class="mb-5">{{ data.name }}</h1>
        <p class="fs-4 mt-5">商品敘述：</p><br><p class="fs-5">{{ data.description }}</p>
        <p class="fs-5 mt-5">售價：{{ data.price }}</p>
        <p class="fs-5 mt-5">賣家：{{ data.seller }}</p>
        <button style="margin-top: 9rem; margin-left: 10rem; width: 6rem;" @click="buyNFT">購買</button>
      </div>
    </div>
  </div>
    
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute,useRouter } from 'vue-router';
import { ethers } from 'ethers';
import axios from 'axios';
import MarketplaceJSON from "../Marketplace.json";
import { GetIpfsUrlFromPinata } from "../utils";


const data = ref({});
const dataFetched = ref(false);
const message = ref("");
const currAddress = ref("0x");

const route = useRoute();
const router = useRouter();
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

const buyNFT = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);
    const salePrice = ethers.utils.parseUnits(data.value.price, 'ether')
    message.value = "Buying the NFT... Please Wait (Upto 5 mins)"
    let transaction = await contract.executeSale(data.value.tokenId, { value: salePrice });
    await transaction.wait();

    alert('You successfully bought the NFT!');
    message.value = "";
    //router.replace('/review');
  } catch (e) {
    alert("Upload Error" + e)
  }
};


const goback =() =>{
  window.history.back();
}


onMounted(async () => {
  if (!dataFetched.value)
    await getNFTData(tokenId); 
});
</script>
