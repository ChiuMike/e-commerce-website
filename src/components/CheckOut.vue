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
          <div class="alert alert-light alert-rounded mb-0" role="alert">
            1.輸入訂單資料
          </div>
        </div>
        <div class="col">
          <div  v-if="!order.is_paid" class="alert alert-success alert-rounded mb-0" role="alert">
            2.確認付款
          </div>
          <div v-else class="alert alert-light alert-rounded mb-0" role="alert">
            2.確認付款
          </div>
        </div>
        <div class="col">
          <div v-if="!order.is_paid" class="alert alert-light alert-rounded mb-0" role="alert">
            3.完成
          </div>
          <div v-else class="alert alert-success alert-rounded mb-0" role="alert">
            3.完成
          </div>
        </div>
      </section>
      <div class="my-5 row justify-content-center">
        <form class="col-md-6" @submit.prevent="payOrder">
          <table class="table">
            <thead>
              <th>品名</th>
              <th>數量</th>
              <th>單價</th>
            </thead>
            <tbody>
              <tr v-for="item in order.products" :key="item.id">
                <td class="align-middle">{{ item.product.title }}</td>
                <td class="align-middle">
                  {{ item.qty }}/{{ item.product.unit }}
                </td>
                <td class="align-middle">{{ item.final_total }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" class="text-right">總計</td>
                <td class="text-right">{{ order.total+60 }}</td>
              </tr>
            </tfoot>
          </table>

          <table class="table">
            <tbody>
              <tr>
                <th width="100">Email</th>
                <td>{{ order.user.email }}</td>
              </tr>
              <tr>
                <th>姓名</th>
                <td>{{ order.user.name }}</td>
              </tr>
              <tr>
                <th>收件人電話</th>
                <td>{{ order.user.tel }}</td>
              </tr>
              <tr>
                <th>收件人地址</th>
                <td>{{ order.user.address }}</td>
              </tr>
              <tr>
                <th>付款狀態</th>
                <td>
                  <span v-if="!order.is_paid">尚未付款</span>
                  <span v-else class="text-primary">付款完成</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="text-right" v-if="order.is_paid === false">
            <button class="btn btn-danger">確認付款去</button>
          </div>
        </form>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import $ from "jquery";
import Footer from "./Footer";
export default {
  name: "CheckOut",
  components: { Footer },
  data() {
    return {
      orderId: "",
      order: {
        user: {},
      },
      isLoading: false,
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`;
      //vm.isLoading = true;
      this.$http.get(api).then((response) => {
        //vm.isLoading = false;
        console.log("訂單=", response.data);
        vm.order = response.data.order;
      });
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`;
      vm.isLoading = true;
      this.$http.post(api).then((response) => {
        vm.isLoading = false;
        if (response.data.success) {
          vm.getOrder();
        }
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId; //取得網址上的參數
    this.getOrder();
  },
};
</script>