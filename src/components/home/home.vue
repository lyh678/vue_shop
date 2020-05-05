<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="@/assets/img/logo.png" alt />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          
          class="el-menu-vertical-demo"
          
          background-color="#3f4448"
          text-color="#fff"
          active-text-color="#00a0d8"
          unique-opende 
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="$route.path"
        >
          <el-submenu :index="item.id.toString()" v-for="item in menulist" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>

            <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    data() {
        return {
            menulist: [],
            iconsObj: {
                '125': 'el-icon-s-custom',
                '103': 'el-icon-s-help',
                '101': 'el-icon-s-shop',
                '102': 'el-icon-s-order',
                '145': 'el-icon-s-data'
            },
            isCollapse: false
        }
    },
    created() {
        this.getMenulist()
    },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
      async getMenulist() {
      const {data: res} = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.console.error(res.meta.msg);
      this.menulist = res.data
      console.log(res);
      
      
  },
  toggleCollapse() {
      this.isCollapse = !this.isCollapse

  }
  },

};
</script>

<style scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #00a0d8;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #000;
  font-size: 20px;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-header div span {
  margin-left: 15px;
}
.el-header div img {
  width: 160px;
  height: 77px;
}

.el-aside {
  background-color: #3f4448;
}
.el-aside .el-menu {
  border-right: none;
}
.el-main {
  background-color: #ffffff;
}
.toggle-button {
    background-color: #545c64;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>