<template>
  <div>
    <nav class="navbar navbar-light bg-secondary">
      <a class="navbar-brand text-white">
        <i class="fas fa-store"></i>
        買多多商城
        <!-- 購物車內的數量 (Button 內包含 icon, 數量 badge) -->
      </a>
      <div class="dropdown ml-auto">
        <button
          class="btn btn-sm btn-cart"
          data-toggle="dropdown"
          data-flip="false"
        >
          <i class="fa fa-shopping-cart text-dark fa-2x" aria-hidden="true"></i>
          <span class="badge badge-pill badge-danger">9</span>
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
                  <a
                    href="#removeModal"
                    class="text-muted"
                    data-toggle="modal"
                  >
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                  </a>
                </td>
                <td class="align-middle">123</td>
                <td class="align-middle">123</td>
                <td class="align-middle text-right">$123</td>
              </tr>
            </tbody>
          </table>
          <a
            href=""
            class="btn btn-primary btn-block"
          >
            <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
          </a>
        </div>
      </div>
    </nav>
    <div
      class="modal fade"
      id="removeModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">確認刪除 123 123</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>是否確認刪除商品</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              否
            </button>
            <button type="button" class="btn btn-outline-danger px-5">
              是
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Navbar",
};
</script>
