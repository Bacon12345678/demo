<template>
  <div>
    <nav class="w-screen">
      <ul class='flex items-end justify-between py-3 bg-transparent text-white pr-5'>
        <li class='flex items-end ml-5 pb-2'>
          <router-link to="/">
            <img :src="fullLogo" alt="" width="120" height="120" class="inline-block -mt-2"/>
            <div class='inline-block font-bold text-xl ml-2'>
              NFT Marketplace
            </div>
          </router-link>
        </li>
        <li class='w-2/6'>
          <ul class='lg:flex justify-between font-bold mr-10 text-lg'>
            <li class='border-b-2 hover:pb-0 p-2'>
              <router-link to="/">Marketplace</router-link>
            </li>
            <li class='hover:border-b-2 hover:pb-0 p-2'>
              <router-link to="/sellNFT">List My NFT</router-link>
            </li>              
            <li class='hover:border-b-2 hover:pb-0 p-2'>
              <router-link to="/myNFTs">Profile</router-link>
            </li>  
            <li>
              <button class="enableEthereumButton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm" @click="connectWebsite">{{connected? "Connected":"Connect Wallet"}}</button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <div class="">
      {{ accounts !== "0x" ? "Connected to" : "Not Connected. Please login to view NFTs" }} 
      {{ accounts !== "0x" ? (address.substring(0,15) + '...') : "" }}
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { ethers } from 'ethers';


let connected = ref(false);
let currAddress = ref('0x');
let location = useRoute();
const address = ref('');


const getAddress = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const account = await signer.getAddress();
  address.value = account;
};

const connectWebsite = async () => {
  try{
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(async () => {
        await getAddress();
        return address.value;
      });
    console.log(accounts);
  } catch(error) {
    console.log(error);
  }
}


onMounted(async () => {
  if (window.ethereum === undefined) return
  let val = window.ethereum.isConnected()
  if (val) {
    console.log('here')
    getAddress()
    connected.value = val
  }

  window.ethereum.on('accountsChanged', function(accounts) {
    window.location.replace(location.pathname)
    currAddress.value = accounts[0];
  })
})

</script>