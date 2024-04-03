<template>

    <!--Need to add authentic function-->

    <div class="row">
        <div class="col-md-4 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"><span class="font-weight-bold">Edogaru</span><span class="text-black-50">edogaru@mail.com.my</span><span> </span></div>
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
                    <div class="col-md-12"><label class="labels">價格</label><input type="text" class="form-control" placeholder="enter phone number" value=""></div>
                    <div class="col-md-12"><label class="labels">地址</label><input type="text" class="form-control" placeholder="enter address line 1" value=""></div>
                    <div class="col-md-12"><label class="labels">郵遞區號</label><input type="text" class="form-control" placeholder="enter address line 2" value=""></div>
                    <div class="col-md-12"><label class="labels">Email</label><input type="text" class="form-control" placeholder="enter email id" value=""></div>
                </div>
                </div>
                <button class="btn btn-primary profile-button mr-3" type="button" @click="">拍賣</button>
            </div>
        </div>
</template>