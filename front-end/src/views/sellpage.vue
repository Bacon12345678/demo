<template>

    <!--Need to add authentic function-->
    <div class="row">
        <div class="col-md-4 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><input type="file" id="product_image" name="productImage"><span class="font-weight-bold">上傳圖片</span></div>
        </div>

        <div class="col-md-8 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">登入拍賣商品</h4>
                </div>

                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">商品名稱</label><input type="text" id="productName" class="form-control" placeholder="first name" value=""></div>        
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">價格</label><input type="text" id="product_price" class="form-control" placeholder="enter phone number" value=""></div>
                    <div class="col-md-12"><label class="labels">數量</label><input type="text" id="product_amount" class="form-control" placeholder="enter address line 1" value=""></div>
                    <div class="col-md-12"><label class="labels">商品狀態</label><input type="text" id="product_condition" class="form-control" placeholder="enter address line 2" value=""></div>
                    <div class="col-md-12"><label class="labels">商品敘述</label><input type="text" id="product_info" class="form-control" placeholder="enter email id" value=""></div>
                    <div class="col-md-12"><label class="labels">交易地點</label><input type="text" id="transation_location" class="form-control" placeholder="enter email id" value=""></div>
                </div>
                </div>
                <button class="btn btn-primary profile-button mr-3" type="button" @click="auction">拍賣</button>
            </div>
        </div>
</template>

<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const auction = async () => {
  // 創建一個 FormData 實例
  const formData = new FormData();

  // 添加文件和其他字段到 formData
  formData.append('productImage', document.getElementById('product_image').files[0]);
  formData.append('name', document.getElementById('productName').value);
  formData.append('price', document.getElementById('product_price').value);
  formData.append('condition', document.getElementById('product_condition').value);
  formData.append('info', document.getElementById('product_info').value);
  formData.append('inventory', document.getElementById('product_amount').value);
  formData.append('location', document.getElementById('transation_location').value);

  // 發送 POST 請求
  try {
    const response = await axios.post('http://localhost:3000/api/auction', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    });
    alert('Product created successfully!');
    console.log('Product created:', response.data);
    router.push('/');
  } catch (err) {
    console.error('Error creating product:', err);
  }
};
</script>