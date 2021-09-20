<template>
  <div>
    <loading :active.sync="isLoading" />
    <nav class="navbar navbar-light bg-secondary">
      <a  href="#/home" 
       class="navbar-brand text-white link router-link-exact-active router-link-active">
        <i class="fas fa-store"></i>
        買多多商城
      </a>
      <div class="dropdown ml-auto">
        <router-link class="btn btn-outline-success btn-lg" to="/payorder">結帳</router-link>
        <button
          class="btn btn-cart btn-lg"
          data-toggle="dropdown"
          data-flip="false"
        >
          <i class="fa fa-shopping-cart text-dark fa-2x" aria-hidden="true"></i>
          <span class="badge badge-pill badge-danger">{{carts.carts.length}}</span>
          <span class="sr-only">unread messages</span>
        </button>
        <div
          class="dropdown-menu dropdown-menu-right p-3"
          style="min-width: 300px"
          data-offset="400"
        >
          <h6>已選擇商品</h6>
          <table class="table table-sm">
            <tbody>
              <tr v-for="item in carts.carts" :key="item.id">
                <td class="align-middle text-center">
                  <a href="#removeModal" class="text-muted" data-toggle="modal">
                    <i class="fas fa-trash" @click="cancelCart(item.id)"></i>
                  </a>
                </td>
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">
                  {{ item.product.num }} {{ item.product.unit }}
                </td>
                <td class="align-middle text-right">
                  ${{ item.product.price }}
                </td>
              </tr>
            </tbody>
          </table>
          <a class="btn btn-primary btn-block" @click="changeToPay">
            <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
          </a>
        </div>
      </div>
    </nav>
    <div class="container main-contant mb-1">
      <nav aria-label="breadcrumb" role="navigation">
        <ol class="breadcrumb bg-transparent pl-0">
          <router-link class="breadcrumb-item" to="/home">
            <a href="#">首頁</a>
          </router-link>
          <li class="breadcrumb-item active" aria-current="page">{{product.title}}</li>
        </ol>
      </nav>
      <div class="row">
        <div class="col-md-4 mb-5">
          <div class="sticky-top" style="top: 10px">
            <h1 class="h2">
              {{ product.title }}
              <small class="text-muted">(限量版)</small>
            </h1>
            <div class="d-flex my-3 align-items-end justify-content-end">
              <del class="text-muted"
                >原價 NT{{ product.origin_price | currency | dollarsigns }}</del
              >
              <div class="h3 mb-0 ml-auto text-danger">
                <small>網路價 NT$</small>
                <strong>{{ product.price | currency }}</strong>
              </div>
            </div>
            <hr />

            <div class="input-group mt-3">
              <select
                name=""
                class="form-control mr-1"
                id=""
                v-model="product.num"

              >
                <option :value="num" v-for="num in 10" :key="num">
                  選購 {{ num }} {{ product.unit }}
                </option>
              </select>
              <button type="button" class="btn btn-primary"
               @click="add(product.id,product.num)">
                <i class="fa fa-cart-plus" aria-hidden="true"></i> 加入購物車
              </button>
            </div>

            <div class="mt-2 text-right text-muted">
              <i class="fa fa-cc-visa" aria-hidden="true"></i>
              <i class="fa fa-cc-jcb" aria-hidden="true"></i>
              <i class="fa fa-cc-paypal" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div class="col-md-8">
          <p 
          style="font-size:30px;text-align:left;">
          {{ product.description }}
          </p>
          <p class="card-text">
            {{ product.content }}
          </p>

          <h3 class="mt-5 text-center">商品照片</h3>
          <div
            style="
              height: 800px;
              background-size: cover;
              background-position: center;
            "
            :style="{ backgroundImage: `url(${product.imageUrl})` }"
          ></div>
          <div class="alert alert-secondary mt-4" role="alert">
            <h2 class="text-center">購物說明</h2>
            <p>
              練習用，購買了不會出貨!
            </p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
 </div> 
</template>
<script>
import Footer from "./Footer";
export default {
  components: {
    Footer,
  },
  name: "CheckMore",
  data() {
    return {
      isLoading: false,
      productId: "",
      product: {},
      carts: [],
      status: {
        loadingItem: "",
      },
    };
  },
  methods: {
    getProduct(id) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
      this.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.product = response.data.product;
        }
      });
    },
    getNewCart() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log("GetCart: ", response.data);
        vm.isLoading = false;
        vm.carts = response.data.data;
        console.log("vm", vm.carts);
      });
    },
    add(id, qty = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(api, { data: cart }).then((response) => {
        vm.status.loadingItem = "";
        if (response.data.success) {
          vm.getNewCart();
        }
      });
    },
    cancelCart(id){
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
      this.$http.delete(api).then((response) => {
        vm.getNewCart();
        vm.isLoading = false;
      });     
    },
    changeToPay(){
      const vm = this;
      vm.isLoading = true;
      vm.$router.push(`/payorder`);
      vm.isLoading=false;      
    }
  },
  created() {
    this.productId = this.$route.params.productId; //取得網址上的參數
    this.getProduct(this.productId);
    this.getNewCart();
  },
};
</script>
