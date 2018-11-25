<template>
  <div id="app">
    <b-navbar type="dark" toggleable="md" class="custom-navbar">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">
        <img class="custom-navbar-logo-image" src="./assets/logo_grama_mia.png" alt="Grama Mia Logo" srcset="">
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <b-nav-item exact to="/">Inicio</b-nav-item>
            <b-nav-item :disabled="!this.$session.exists()" to="/clientes">Registro de Clientes</b-nav-item>
            <b-nav-item :disabled="!this.$session.exists()" to="/lista">Lista Registro</b-nav-item>
            <b-nav-item :disabled="!this.$session.exists()" to="/reportes">Reportes</b-nav-item>
            <b-nav-item :disabled="!this.$session.exists()" to="/about">About</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">

          <b-nav-form v-if="!isLogin">
            <b-form-input size="sm" v-model="username" class="mr-sm-2" type="text" placeholder="Username"/>
            <b-form-input size="sm" v-model="password" class="mr-sm-2" type="password" placeholder="Password"></b-form-input>
            <b-button size="sm" @click.prevent="login" class="my-2 my-sm-0" type="submit">Login</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right v-if="isLogin">
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>{{this.$session.exists()? $session.get('username').toUpperCase() : '' }}</em>
            </template>
            <b-dropdown-item @click="logout">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <router-view :isLogin="isLogin" :isAdmin="isAdmin"/>
  </div>
</template>

<script>
export default {
    data(){return {
        username: '',
        password: '',
        isLogin: this.$session.exists(),
        isAdmin: false,
    }},

    methods: {
        login(){
            let data = {
              username: this.username,
              password: this.password,
            }
            this.$axios.post('http://localhost:5000/auth', data)
            .then(res => {
              this.$session.set('token', res.data.token)
              this.$session.set('username', res.data.username)
              this.isLogin = true
              this.isAdmin = res.data.admin
              this.$router.push('/')
              this.username = ''
              this.password = ''
            })
            .catch(err => {
              alert(err.message, 'ERROR')
            })
        },

        logout(){
          this.$session.destroy()
          this.isLogin = false
          this.$router.push('/')
        }
    }
}
</script>


<style scoped>
    .custom-navbar {
      background-color: #25B04C;
    }

    .custom-navbar-logo-image {
      width: 75px;
      height: 50px;
    }
</style>
