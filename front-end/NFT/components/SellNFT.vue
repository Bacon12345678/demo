<template>
    <div class="container justify-content-center align-items-center text-center vh-100">
        <div><h1>拍賣商品</h1></div>
        <form>
            <div class="m-5 ">
                <label for="name">商品名稱</label>
                <input  id="name" type="text" placeholder="Axie#4563" v-model="formParams.name">
            </div>
            <div class="m-5 ">
                <lable for="description" style="padding-right: 1.3rem;">商品描述</lable>
                <textarea id="description"  type="text" v-model="formParams.description"></textarea>
            </div>
            <div class="m-5 ">
                <lable for="price">商品售價</lable>
                <input id="price"  type="text" v-model="formParams.price">
            </div>
            <div class="m-5" style="padding-left: 7rem;">
                <lable for="image" >上傳圖片</lable>
                <input id="image" style="padding-left: 1rem;" type="file" @change="OnChangeFile">
            </div>
            <div class="text-red-500 text-center">{{ message }}</div>
            <button @click="listNFT" id="list-button">
                確認上架
            </button>
        </form>
    </div>
 </template>

 
 
 <script setup>
 import { ref } from 'vue';
 import { ethers } from 'ethers';
 import Marketplace from '../Marketplace.json'
 import {uploadJSONToIPFS,uploadFileToIPFS} from '../pinata.js'
 
 const formParams = ref({ name: '', description: '', price: ''});
 const fileURL = ref(null);
 const message = ref('');
 
 
 const OnChangeFile = async(e)=>{
     const file = e.target.files[0];
     try {
         message.value ="上傳中...請稍等...";
         const response = await uploadFileToIPFS(file);
         if(response.success === true) {
             message.value="";
                 console.log("Uploaded image to Pinata: ", response.pinataURL)
                 fileURL.value=response.pinataURL;
             }
     } catch (error) {
         console.log("Error during file upload", e)
     }
 }
 
 const uploadMetadataToIPFS = async() =>{
     const { name, description, price } = formParams.value;
     if( !name || !description || !price || !fileURL.value)
         {
             message.value="請填寫所有資料";
             return -1;
         }
 
         const nftJSON = {
             name,
             description, 
             price, 
             image: fileURL.value
         }
 
         try {
             //upload the metadata JSON to IPFS
             const response = await uploadJSONToIPFS(nftJSON);
             if(response.success === true){
                 console.log("Uploaded JSON to Pinata: ", response)
                 return response.pinataURL;
             }
         }
         catch(e) {
             console.log("error uploading JSON metadata:", e)
         }
 }
 
 const listNFT = async(e) =>{
     e.preventDefault();
 
     try {
         const metadataURL = await uploadMetadataToIPFS();
         if(metadataURL === -1)
         return ;
 
         const provider = new ethers.providers.Web3Provider(window.ethereum);
         const signer = provider.getSigner();
         message.value="上傳中，請等待...";
 
         let contract = new ethers.Contract(Marketplace.address, Marketplace.abi, signer)
 
 //massage the params to be sent to the create NFT request
         const price = ethers.utils.parseUnits(formParams.value.price, 'ether')
         let listingPrice = await contract.getListPrice()
         listingPrice = listingPrice.toString()
 
         //actually create the NFT
         let transaction = await contract.createToken(metadataURL, price, { value: listingPrice })
         await transaction.wait()
 
         alert("上傳成功!");
            message.value ="";
            formParams.value= ({ name: '', description: '', price: ''});
            window.location.replace("/")
 
     } catch (error) {
         alert( "Upload error"+e )
     }
 }
 
 
 
 
 </script>