<template>
  <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
        <div class="col-md-4 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"><span class="font-weight-bold">Edogaru</span><span class="text-black-50">edogaru@mail.com.my</span><span> </span></div>
        </div>
        <div class="col-md-8 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">個人資料</h4>
                </div>
                <template v-if="isEditing">
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">名稱</label><input type="text" class="form-control" placeholder="first name" value=""></div>        
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">手機</label><input type="text" class="form-control" placeholder="enter phone number" value=""></div>
                    <div class="col-md-12"><label class="labels">地址</label><input type="text" class="form-control" placeholder="enter address line 1" value=""></div>
                    <div class="col-md-12"><label class="labels">郵遞區號</label><input type="text" class="form-control" placeholder="enter address line 2" value=""></div>
                    <div class="col-md-12"><label class="labels">Email</label><input type="text" class="form-control" placeholder="enter email id" value=""></div>
                </div>
                <div class="mt-5 d-flex justify-content-center">
                    <button class="m-5 btn btn-primary profile-button mr-3" type="button">儲存</button>
                    <button class="m-5 btn btn-primary profile-button" type="button" @click="cancleEditing">取消</button>
                </div>

                </template>


                <template v-else>
                    <div class="row mt-2">
                        <div class="col-md-6"><label class="labels">名稱</label></div>        
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-12"><label class="labels">手機</label></div>
                        <div class="col-md-12"><label class="labels">地址</label></div>
                        <div class="col-md-12"><label class="labels">郵遞區號</label></div>
                        <div class="col-md-12"><label class="labels">Email</label></div>
                    </div>
                        <button class="btn btn-primary profile-button mr-3" type="button" @click="startEditing">編輯</button>
                </template>


            </div>
        </div>
    </div>
</div>
</template>




<style>

.form-control:focus {
    box-shadow: none;
    border-color: #05d686
}

.profile-button {
    background: #05d686;
    box-shadow: none;
    border: none
}

.profile-button:hover {
    background: #05d686;
}

.profile-button:focus {
    background: #05d686;
    box-shadow: none
}

.profile-button:active {
    background: #05d686;
    box-shadow: none
}

.back:hover {
    color: #05d686;
    cursor: pointer
}

.labels {
    font-size: 11px
}

.add-experience:hover {
    background: #05d686;
    color: #fff;
    cursor: pointer;
    border: solid 1px #05d686;
}
</style>

<script setup>
import { ref } from 'vue';

const isEditing = ref(false);


const startEditing =() =>{
    isEditing.value = true;
}

const cancleEditing =() =>{
    isEditing.value = false;
}

</script>