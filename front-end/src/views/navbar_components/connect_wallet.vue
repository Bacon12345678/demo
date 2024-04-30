<template>
    <button @click="connectWallet">連接MetaMask</button>
</template>

<script setup>
const connectWallet = async () => {
    try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log(accounts);
    } catch (error) {
        console.log(error);
    }
};
</script>

