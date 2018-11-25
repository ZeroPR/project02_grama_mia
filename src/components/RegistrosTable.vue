<template>
    <div>
        <b-table stripped hover :items="data" :fields="fields"
        :sort-by.sync="sortBy" :sort-desc.sync="sortDesc">
            <template slot="compania" slot-scope="dt">
                {{dt.value}}
            </template>
            <template slot="nombre" slot-scope="dt">
                <a href="" @click.prevent="selectItem(dt.item)">{{dt.value}} {{dt.item.apellidos}}</a>
            </template>
            <template slot="tipo_servicio" slot-scope="dt">
                {{dt.value | capitalize}}
            </template>
            <template slot="fecha_cotizacion" slot-scope="dt">
                {{dt.value | fecha}}
            </template>
            <template slot="costo_cotizacion" slot-scope="dt">
                {{dt.value | currency}}
            </template>
            <!-- <template slot="deposito_cotizacion" slot-scope="dt">
                {{dt.deposito_cotizacion | currency}}
            </template> -->
        </b-table>
        <b-modal size="lg" ref="itemViewModal" hide-footer :title="itemSelected.tipo_servicio == 'grama'? 'Grama Artificial' : 'Landscaping'">
            <b-form>
                <b-container>
                     <b-row>
                        <b-col>
                            <b-form-group
                            label="Tipo de servicio"
                            label-for="slcTipoServicio">
                            <b-form-select
                            v-model="itemSelected.tipo_servicio"
                            :options="tipos_de_servicio_disponibles"></b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                            label="Nombre de la Compania"
                            label-for="txtCompania">
                                <b-form-input
                                v-model="itemSelected.compania"
                                id="txtCompania"
                                type="text"
                                placeholder="Alphabet Inc."></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-form-group
                            label="Nombre"
                            label-for="txtNombre">
                                <b-form-input
                                v-model="itemSelected.nombre"
                                id="txtNombre"
                                type="text"
                                placeholder="John"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                            label="Apellidos"
                            label-for="txtApellidos">
                                <b-form-input
                                v-model="itemSelected.apellidos"
                                id="txtApellidos"
                                type="text"
                                placeholder="Doe"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-form-group
                            label="Direccion Fisica"
                            label-for="txtDireccionFisica">
                                <b-form-input
                                v-model="itemSelected.dir_fisica"
                                id="txtDireccionFisica"
                                type="text"
                                placeholder="BO. Barrio calle #1 casa #234"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                            label="Pueblo"
                            label-for="txtPueblo">
                                <b-form-select
                                v-model="itemSelected.pueblo"
                                id="txtPueblo"
                                :options="pueblosDropdown"></b-form-select>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                            label="Estado"
                            label-for="txtEstado">
                                <b-form-input
                                v-model="itemSelected.estado"
                                id="txtEstado"
                                type="text"
                                placeholder="PR"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-form-group
                            label="Telefono Primario"
                            label-for="txtTelefonoPrimario">
                                <b-form-input
                                v-model="itemSelected.telefono_primario"
                                id="txtTelefonoPrimario"
                                type="text"
                                placeholder="(999) 999-9999"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                            label="Telefono Secundario"
                            label-for="txtTelefonoSecundario">
                                <b-form-input
                                v-model="itemSelected.telefono_secundario"
                                id="txtTelefonoSecundario"
                                type="text"
                                placeholder="(999) 999-9999"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-form-group
                            label="Servicio"
                            label-for="txtServicio">
                                <b-form-textarea
                                v-model="itemSelected.servicio"
                                id="txtServicio"
                                placeholder="Servicio Otorgado"
                                :rows="3"
                                :max-rows="6"></b-form-textarea>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-form-group
                            label="Fecha Cotizacion"
                            label-for="fechaCotizacion">
                                <datepicker 
                                format="dd/MM/yyyy" 
                                input-class="form-control custom-textfield"
                                v-model="itemSelected.fecha_cotizacion"></datepicker>
                            </b-form-group>
                        </b-col>
                        <b-col> 
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-form-group
                            label="Costo por Cotizacion"
                            label-for="txtCostoCotizacion">
                                <b-form-input
                                type="number"
                                id="txtCostoCotizacion"
                                placeholder="$$$"
                                v-model="itemSelected.costo_cotizacion"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group
                            label="Deposito Cotizacion"
                            label-for="txtDepositoCotizacion"
                            v-if="itemSelected.tipo_servicio === 'grama'">
                                <b-form-input
                                type="number"
                                id="txtDepositoCotizacion"
                                placeholder="$$$"
                                v-model="itemSelected.deposito_cotizacion"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-btn class="mt-3" variant="outline-danger" block @click.prevent="deleteRegistro">Borrar</b-btn>
                        </b-col>
                        <b-col>
                            <b-btn class="mt-3" variant="outline-success" block @click.prevent="updateRegistro">Guardar</b-btn>
                        </b-col>
                    </b-row>
                </b-container>
            </b-form>
            <div class="d-block text-center">
                
            </div>
            <b-btn class="mt-3" variant="outline-secondary" block @click="hideItemView">Close Me</b-btn>
        </b-modal>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
export default {
    props: ['data'],
    data(){return {
        fields: [ 
            {key: 'nombre', sortable: true},
            {key: 'compania', sortable: true},
            {key: 'fecha_cotizacion', sortable: true},
            {key: 'tipo_servicio', sortable: true},
            {key: 'pueblo', sortable: true},
            {key: 'costo_cotizacion', sortable: true},
            {key: 'deposito_cotizacion', sortable: true}
            ],
        sortBy: 'fecha_cotizacion',
        sortDesc: false,
        itemSelected: {},
        
        // Options for select box in Tipos de Servicio
        tipos_de_servicio_disponibles: [
            {value: 'grama', text: "Grama Artificial"},
            {value: 'landscaping', text: "Landscaping"},
        ],
        pueblosDropdown: ["Adjuntas", "Aguada", "Aguadilla", "Aguas Buenas", 
        "Aibonito", "Añasco", "Aguada", "Arecibo", "Arroyo", "Barceloneta", 
        "Barranquitas", "Bayamón", "Cabo Rojo", "Caguas", "Camuy", "Canóvanas", 
        "Carolina", "Cataño", "Cayey", "Ceiba", "Ciales", "Cidra", "Coamo", 
        "Comerío", "Corozal", "Culebra", "Dorado", "Fajardo", "Florida", "Guánica", 
        "Guayama", "Guayanilla", "Guaynabo", "Gurabo", "Hatillo", "Hormigueros", 
        "Humacao", "Isabela", "Jayuya", "Juana Díaz", "Juncos", "Lajas", "Lares", 
        "Las Marías", "Las Piedras", "Loíza", "Luquillo", "Manatí", "Maricao", 
        "Maunabo", "Mayagüez", "Moca", "Morovis", "Naguabo", "Naranjito", "Orocovis", 
        "Patillas", "Peñuelas", "Ponce", "Quebradillas", "Rincón", "Río Grande", 
        "Sabana Grande", "Salinas", "San Germán", "San Juan", "San Lorenzo", 
        "San Sebastián", "Santa Isabel", "Toa Alta", "Toa Baja", "Trujillo Alto", 
        "Utuado", "Vega Alta", "Vega Baja", "Vieques", "Villalba", "Yabucoa", "Yauco"
        ]
    }},
    methods: {
        selectItem(item){
            console.log('SelectItem Funtion call')
            this.itemSelected = item
            this.$refs.itemViewModal.show()
        },
        hideItemView(){
            this.$refs.itemViewModal.hide()
        },

        updateRegistro(){
            let data = this.itemSelected
            this.$axios.post('http://localhost:5000/registro/update', data, {headers: {'Auth-Token': this.$session.get('token')}})
            .then(res => {
                if('result' in res.data  && res.data.result === 'ok'){
                    this.data = res.data.data
                    alert('Articulo actualizado.', 'INFO')
                }
            })
            .catch(err => {
                alert(err.message, 'ERROR')
            })
        },

        deleteRegistro(){
            let id = this.itemSelected.id
            if(confirm('Estas seguro que deseas borrar este registro.')){
                this.$axios.delete(`http://localhost:5000/registro/delete/${id}`, {},{headers: {'Auth-Token': this.$session.get('token')}})
                .then(res => {
                    if('result' in res.data  && res.data.result === 'ok'){
                        this.data = res.data.data
                        alert('Articulo borrado.', 'INFO')
                        this.hideItemView()
                        // Debug Stuff
                        console.log(res.data)
                    }
                })
                .catch(err => {
                    alert(err.message, 'ERROR')
                })
            }
        },
    },
    components:{
        Datepicker
    }
}
</script>
