<template>
  <div class="bg-custom3">
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
      <div class="dropdown ml-auto">
        <router-link class="btn btn-outline-success btn-lg" to="/payorder"
          >結帳</router-link
        >
        <button
          class="btn btn-cart btn-lg"
          data-toggle="dropdown"
          data-flip="false"
        >
          <i class="fa fa-shopping-cart text-dark fa-2x" aria-hidden="true"></i>
          <span class="badge badge-pill badge-danger">{{
            cart.carts.length
          }}</span>
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
              <tr v-for="item in cart.carts" :key="item.id">
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

    <div class="container.container-fluid" style="height: 400px">
      <div class="carousel slide" data-ride="carousel" id="carousel-demo">
        <ol class="carousel-indicators">
          <li
            data-target="#carousel-demo"
            data-slide-to="0"
            class="active"
          ></li>
          <li data-target="#carousel-demo" data-slide-to="1"></li>
          <li data-target="#carousel-demo" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active" style="height: 400px">
            <img
              class="d-block w-100"
              src="https://upload.cc/i1/2021/09/19/GXQU5L.jpg"
              alt=""/>
            <div class="carousel-caption d-none d-md-block text-info" style="font-size:2cm;">
              <font class="font-weight-bold">歡慶周年慶!!</font>
              <br/>
              <font class="font-weight-bold" style="font-size:1.5cm;">輸入優惠碼:HAPPY即享8折</font>
            </div>
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              src="https://upload.cc/i1/2021/09/20/nZChHm.jpg"
              alt=""
            />
            <div class="carousel-caption d-none d-md-block text-dark" style="font-size:2cm;">
              <font class="font-weight-bold">情人節商品特價中!!</font>
            </div>
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              src="https://upload.cc/i1/2021/09/20/Qatun0.jpg"
              alt=""
            />
            <div class="carousel-caption d-none d-md-block text-dark" style="font-size:2cm;">
              <font class="font-weight-bold">新商品上架!!</font>
              <br/>
              <font class="font-weight-bold" style="font-size:1.5cm;">出租一個聖誕老人吧!!</font>
            </div>
          </div>

          <a
            href="#carousel-demo"
            class="carousel-control-prev"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon"></span>
          </a>
          <a
            href="#carousel-demo"
            class="carousel-control-next"
            data-slide="next"
          >
            <span class="carousel-control-next-icon"></span>
          </a>
        </div>
      </div>
    </div>
    <br/>
    <div class="container.container-fluid">
      <div class="row">
        <div class="col-md-2">
          <!-- 左側選單 (List group) -->
          <div class="list-group sticky-top">
            <a
              class="list-group-item list-group-item-action"
              :class="{active:topic=='all'}"
              @click.prevent="changeTopic('all')"
              data-toggle="list"
              href="#list-gold"
            >
              <i class="fa fa-suitcase" aria-hidden="true"></i> 全部商品</a
            >
            <a
              class="list-group-item list-group-item-action"
              :class="{active:topic=='love'}"
              @click.prevent="changeTopic('love')"
              data-toggle="list"
              href="#list-gift"
            >
              <i class="fas fa-heart"></i> 情人節</a
            >
            <a href="#" class="list-group-item list-group-item-action"
             @click.prevent="changeTopic('mom')" :class="{active:topic=='mom'}">
              <i class="fas fa-gift"></i> 母親節</a
            >
            <a href="#" class="list-group-item list-group-item-action"
             @click.prevent="changeTopic('mas')" :class="{active:topic=='mas'}">
              <i class="fas fa-tree"></i> 聖誕節</a>
          </div>
        </div>
        <div class="col-md-10">
          <div class="d-flex mb-4">
            <!-- Search bar -->
            <form class="form-inline my-3 my-lg-0">
              <div class="input-group">
                <input
                  class="form-control"
                  type="text"
                  v-model="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div class="input-group-append">
                  <button class="btn btn-outline-warning" type="submit"
                   @click="changeTopic('Search')">
                    <i class="fa fa-search" aria-hidden="true"></i> Search
                  </button>
                </div>
              </div>
            </form>
          </div>
          <!-- 主要商品列表 (Card) -->
          <div class="tab-content">
            <div class="tab-pane active" id="list-gold">
              <div class="row">
                <!-- 商品列表 col-md-10 -->
                <div
                  class="col-md-3 mb-4"
                  v-for="item in filterData"
                  :key="item.id"
                >
                  <div class="card border-0 shadow-sm card">
                    <div
                      style="
                        height: 500px;
                        background-size: cover;
                        background-position: center;
                      "
                      :style="{ backgroundImage: `url(${item.imageUrl})` }"
                    ></div>
                    <div class="card-body">
                      <span class="badge badge-secondary float-right ml-2">{{
                        item.category
                      }}</span>
                      <h5 class="card-title">
                        <a href="#" class="font-weight-bold text-dark">{{ item.title }}</a>
                      </h5>
                      <div
                        class="
                          d-flex
                          justify-content-between
                          align-items-baseline
                        "
                      >
                        <del class="h6"
                          >原價 {{ item.origin_price | currency }} 元</del
                        >
                        <div class="h5">
                          現在只要 {{ item.price | currency }} 元
                        </div>
                      </div>
                    </div>
                    <div class="card-footer d-flex">
                      <button
                        type="button"
                        class="btn btn-outline-primary btn-lg"
                        @click="getMore(item.id)"
                      >
                        <i
                          class="fas fa-spinner fa-spin"
                          v-if="status.loadingItem === item.id"
                        ></i>
                        查看更多
                      </button>
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-lg ml-auto"
                        @click="addToCart(item.id, item.num)"
                      >
                      <i
                        class="fas fa-spinner fa-spin"
                        v-if="status.loadingItem === item.id"
                        ></i>
                        加到購物車
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- pagination -->
              <!-- <nav aria-label="Page navigation" class="my-5">
                <ul class="pagination justify-content-center">
                  <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">Previous</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">1</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">2</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">3</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                  </li>
                </ul>
              </nav> -->
            </div>
          </div>
          <!-- tab-content end -->
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import $ from "jquery";
import Footer from "./Footer";
//import Navbar from "./Navbar";
export default {
  components: {
    Footer,
  },
  data() {
    return {
      isLoading: false,
      products: [],
      cart: [],
      status: {
        loadingItem: "",
      },
      search:'',
      topic:'all',
    };
  },
  methods: {
    getGoods() {
      const vm = this;
      vm.isLoading = true;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products?`;
      this.$http.get(api).then((response) => {
        vm.isLoading = false;
        console.log("購物車api=", response.data);
        if (response.data.success) {
          response.data.products.forEach(function (item) {
            vm.products.push(item);
          });
          vm.isLoading = false;
        }
      });
    },
    getMore(id) {
      const vm = this;
      vm.status.loadingItem = id;
      vm.$router.push(`/checkmore/${id}`);
      vm.status.loadingItem = "";
    },
    addToCart(id, qty = 1) {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(api, { data: cart }).then((response) => {
        console.log("add=", response.data);
        vm.status.loadingItem = "";
        if (response.data.success) {
          vm.getCart();
          // $("#productModal").modal("hide");
        }
      });
    },
    getCart() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        vm.isLoading = false;
        vm.cart = response.data.data;
        console.log("vm.cart=", vm.cart);
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
    changeToPay() {
      const vm = this;
      vm.isLoading = true;
      vm.$router.push(`/payorder`);
      vm.isLoading = false;
    },
    changeTopic(s){
      const vm=this;
      vm.topic=s;
    }
  },
  computed:{
    filterData(){
      const vm=this;
      if(vm.topic==="all"){
        return vm.products;
      }else if(vm.topic==="love"){
        return  vm.products.filter(item=>{return item.category==='情人節'})
      }else if(vm.topic==="mom"){
        return  vm.products.filter(item=>{return item.category==='母親節'})
      }else if(vm.topic==="mas"){
        return  vm.products.filter(item=>{return item.category==='聖誕節'})
      }else if(vm.topic==="Search"){
        return  vm.products.filter(item=>{return item.title.includes(vm.search)})
      }
    }
  },
  created() {
    this.getGoods();
    this.getCart();
  },
};
</script>
<style>
.container .container-fluid {
  margin: 10px;
}
carousel .carousel-item {
  height: 100px;
}

.carousel .carousel-item img {
  min-height: 100px;
  max-height: 400px;
  object-fit: cover;
}
</style>