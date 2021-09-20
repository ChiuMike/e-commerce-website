<template>
  <div>
    <loading :active.sync="isLoading" />
    <nav class="navbar navbar-light bg-secondary">
      <a
        href="#/home"
        class="
          navbar-brand
          text-white
          link
          router-link-exact-active router-link-active
        "
      >
        <i class="fas fa-store"></i>
        買多多商城
      </a>
    </nav>
    <div class="container main-contant py-5">
      <h1 class="text-center mb-3 text-secondary">買多多商城 結帳</h1>
      <section class="form-row align-items-center text-center">
        <div class="col">
          <div class="alert alert-success alert-rounded mb-0" role="alert">
            1.輸入訂單資料
          </div>
        </div>
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">
            2.確認付款
          </div>
        </div>
        <div class="col">
          <div class="alert alert-light alert-rounded mb-0" role="alert">
            3.完成
          </div>
        </div>
      </section>

      <section class="row justify-content-center mt-5">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h6 class="mb-0 d-flex align-items-center" v-if="cart.carts.length!=0">
                <a data-toggle="collapse" href="#collapseOne">
                  顯示購物車細節
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
                </a>
                <span class="h3 ml-auto mb-0">${{cart.final_total+60}}</span>
              </h6>
              <h6 class="mb-0 text-center" v-else>
                <span class="h3 ml-auto mb-0">購物車為空</span>
              </h6>
            </div>
          </div>
          <div id="collapseOne" class="collapse mt-3">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th width="30"></th>
                  <th width="100"></th>
                  <th>商品名稱</th>
                  <th width="100">數量</th>
                  <th width="80">小計</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in cart.carts" :key="item.id">
                  <td class="align-middle text-center">
                    <a
                      href="#removeModal"
                      class="text-muted"
                      data-toggle="modal"
                      data-title="刪除 金牌西裝 1 件"
                    >
                    <button
                     type="button"
                     class="btn btn-outline-danger btn-sm"
                     @click="cancelCart(item.id)">
                        <i class="far fa-trash-alt"></i>
                    </button>
                    </a>
                  </td>
                  <td class="align-middle">
                    <img
                      :src="item.product.imageUrl"
                      class="img-fluid img-thumbnail"
                      alt=""
                    />
                  </td>
                  <td class="align-middle">
                      {{item.product.title}}
                      <div class="text-custom2" v-if="item.coupon">已套用優惠券</div>
                  </td>
                  <td class="align-middle">{{item.product.num}} 件</td>
                  <td class="align-middle text-right">${{item.final_total}}</td>
                </tr>
                <tr>
                  <td colspan="4" class="text-right">運費</td>
                  <td class="text-right">
                    <strong v-if="cart.carts.length!=0">$60</strong>
                    <strong v-else>$0</strong>
                  </td>
                </tr>
                <tr>
                  <td colspan="4" class="text-right">合計</td>
                  <td class="text-right">
                    <strong v-if="cart.carts.length!=0">${{cart.final_total+60}}</strong>
                    <strong v-else>$0</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="input-group mb-1 input-group-sm">
                <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼" />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">套用優惠碼</button>
                </div>
            </div>
          </div>

          <h5 class="py-3 mt-5 mb-2 text-center bg-light">訂購人資訊</h5>
          <validation-observer v-slot="{ handleSubmit }">
          <form id="needs-validation" @submit.prevent="handleSubmit(createOrder)">
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="username">姓名</label>
                <validation-provider rules="required" v-slot="{ errors }">
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="姓名"
                  v-model="form.user.name"
                  required
                />
                <span class="text-danger">{{ errors[0] }}</span>
                </validation-provider>
                <div class="invalid-feedback">請輸入姓名</div>
              </div>
              <div class="form-group col-md-6">
                <label for="email">Email</label>
                <validation-provider rules="email" v-slot="{ errors }">
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Email"
                  v-model="form.user.email"
                  required
                />
                <span class="text-danger">{{ errors[0] }}</span>
                </validation-provider>
                <div class="invalid-feedback">請輸入正確的 Email</div>
              </div>
            </div>
            <div class="form-group">
                <label for="usertel">收件人手機</label>
                <validation-provider rules="phoneNum" v-slot="{ errors }">
                    <input
                        type="tel"
                        class="form-control"
                        id="usertel"
                        v-model="form.user.tel"
                        placeholder="請輸入電話"
                    />
                    <span class="text-danger">{{ errors[0] }}</span>
                </validation-provider>
            </div>
            <div class="form-group">
              <label for="inputAddress">地址</label>
              <validation-provider rules="required" v-slot="{ errors }">
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="台北市天龍區天龍路一段66號"
                v-model="form.user.address"
                required
              />
              <span class="text-danger">{{ errors[0] }}</span>
              </validation-provider>
              <div class="invalid-feedback">請輸入地址</div>
            </div>
            <div class="form-group">
                <label for="comment">留言</label>
                <textarea
                name=""
                id="comment"
                class="form-control"
                cols="30"
                rows="10"
                v-model="form.message"
                ></textarea>
          </div>
            <div class="text-right">
              <a href="#/home" 
               class="btn btn-secondary link router-link-exact-active router-link-active">
               繼續選購
               </a>
              <button type="submit" class="btn btn-primary">
               確認訂單
               </button>
            </div>
          </form>
          </validation-observer>
        </div>
      </section>
    </div>
    <Footer />
  </div>
</template>
<script>
import $ from "jquery";
import Footer from "./Footer";
export default {
  name: "PayOrder",
  components: {
    Footer,
  },
  data() {
    return {
      isLoading: false,
      cart: [],
      coupon_code:'',
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        messages: "",
      },
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.cart = response.data.data;
        console.log("payorder=", vm.cart);
      });
    },
    cancelCart(id) {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      this.$http.delete(api).then((response) => {
        vm.getCart();
        vm.isLoading = false;
      });
    },
    createOrder(){
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
      vm.isLoading = true;
      const order = vm.form;
      this.$http.post(api, { data: order }).then((response) => {
        console.log("訂單已建立", response.data);
        if(response.data.success){
            vm.$router.push(`/customercheckout/${response.data.orderId}`)
        }
        vm.isLoading = false;
      });        
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code
      };
      vm.isLoading = true;
      this.$http.post(url, { data: coupon }).then(response => {
        console.log(response);
        vm.getCart();
        vm.isLoading = false;
      });
    },
  },
  created() {
      this.getCart();
  },
};
</script>