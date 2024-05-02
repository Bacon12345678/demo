<template>
    <button @click="connectWebsite">{{ accounts !== "0x" ? "Connected to" : "Not Connected. Please login to view NFTs" }} 
      {{ accounts !== "0x" ? (address.substring(0,15) + '...') : "" }}</button>
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

