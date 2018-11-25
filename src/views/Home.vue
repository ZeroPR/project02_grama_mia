<template>
  <div class="home">
      <b-jumbotron header="Grama Mia" lead="Por favor iniciar seccion para usar la aplicacion.">
          <p>Esta aplicacion es para el uso solamente de personas autorizada por Grama Mia.</p>
          <b-button style="margin: 3px;" v-if="isAdmin" @click="$refs.crearUsuarioModal.show()" :disabled="!isLogin" variant="info">Crear Cuenta</b-button>
          <b-button style="margin: 3px;" to="/clientes" :disabled="!isLogin" variant="info">Registrar</b-button>
          <b-button style="margin: 3px;" to="/reportes" :disabled="!isLogin" variant="info">Reportes</b-button>
      </b-jumbotron>

      <b-modal ref="crearUsuarioModal" 
      size="md" title="Crear Usuario"
      hide-footer no-close-on-backdrop no-close-on-esc>
          <b-container>
            <b-form ref="formCreateUser">
              <b-form-row>
                  <b-col>
                      <b-form-group
                      label="Usuario"
                      label-for="username">
                          <b-form-input
                          v-model="username"
                          id="username"
                          type="text"></b-form-input>
                      </b-form-group>
                  </b-col>
              </b-form-row>
              <b-form-row>
                  <b-col>
                      <b-form-group
                      label="Contraseña"
                      label-for="password">
                          <b-form-input
                          v-model="password"
                          id="password"
                          type="password"></b-form-input>
                      </b-form-group>
                  </b-col>
              </b-form-row>
              <b-form-row>
                  <b-col>
                      <b-form-group
                      label="Confirmar Contraseña"
                      label-for="cpassword">
                          <b-form-input
                          v-model="cpassword"
                          id="cpassword"
                          type="password"></b-form-input>
                          <span v-if="errorPassword" style="color:red">Las contraseñas no son iguales.</span>
                      </b-form-group>
                  </b-col>
              </b-form-row> 
              <b-form-row>
                  <b-col>
                      <b-form-group
                      label="Admin?"
                      label-for="slcAdmin">
                          <b-form-select
                          :options="options_for_admin_select"
                          v-model="admin"></b-form-select>
                      </b-form-group>
                  </b-col>
              </b-form-row>
            </b-form>
              <b-row>
                 <b-col></b-col>
                 <b-col>
                    <b-btn
                    variant="outline-success" 
                    block @click="createUser">Crear</b-btn>
                 </b-col>
              </b-row>
          </b-container>
      </b-modal>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  props: ['isLogin', 'isAdmin'],
  data(){return {
      username: '',
      password: '',
      cpassword: '',
      admin: false,
      errorPassword: false,

      options_for_admin_select: [
          {value: false, text: 'No'},
          {value: true, text: 'Si'}
      ]
  }},
  methods: {
      createUser(){
          if(!this.cPassword){
              this.errorPassword = true
              return
          }
          this.errorPassword = false
          let data = {
              username: this.username,
              password: this.password,
              admin: this.admin
          }

          this.$axios.post('http://localhost:5000/create_user', data, {headers: {
            'Auth-Token': this.$session.get('token')
          }})
          .then(res => {
              if('result' in res.data){
                  if(res.data.result == 'ok'){
                      alert(res.data.message, 'INFO')
                      this.$refs.crearUsuarioModal.hide()
                      this.$refs.formCreateUser.reset()
                  }
              }
          })
          .catch(err => {
              alert(err.message, 'ERROR')
          })
      }
  },
  computed: {
      cPassword(){
          return this.password === this.cpassword
      }
  },
  components: {
  }
}
</script>
