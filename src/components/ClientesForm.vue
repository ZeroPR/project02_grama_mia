<template>
    <b-form ref="clienteForm">
        <b-row>
            <b-col>
                <b-form-group
                label="Tipo de servicio"
                label-for="slcTipoServicio">
                <b-form-select
                v-model="tipo_servicio"
                :options="tipos_de_servicio_disponibles"></b-form-select>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group
                label="Nombre de la Compania"
                label-for="txtCompania">
                    <b-form-input
                    v-model="compania"
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
                    v-model="nombre"
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
                    v-model="apellidos"
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
                    v-model="dir_fisica"
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
                    v-model="pueblo"
                    id="txtPueblo"
                    :options="pueblosDropdown"></b-form-select>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group
                label="Estado"
                label-for="txtEstado">
                    <b-form-input
                    v-model="estado"
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
                    v-model="telefono_primario"
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
                    v-model="telefono_secundario"
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
                    v-model="servicio"
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
                    v-model="fecha_cotizacion"></datepicker>
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
                    v-model="costo_cotizacion"></b-form-input>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group
                label="Deposito Cotizacion"
                label-for="txtDepositoCotizacion"
                v-if="tipo_servicio === 'grama'">
                    <b-form-input
                    type="number"
                    id="txtDepositoCotizacion"
                    placeholder="$$$"
                    v-model="deposito_cotizacion"></b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-button 
        type="submit" variant="primary" 
        style="margin-right: 8px"
        @click.prevent="onSubmit">Guardar</b-button>
        <b-button 
        type="reset" 
        variant="danger"
        @click.prevent="onReset">Borrar</b-button>
    </b-form>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
export default {
    data(){
        return {
            compania: '',
            nombre: '',
            apellidos: '',
            dir_fisica: '',
            pueblo: '',
            telefono_primario: '',
            telefono_secundario: '',
            servicio: '',
            fecha_cotizacion: '',
            costo_cotizacion: '',
            deposito_cotizacion: '',
            estado: 'PR',
            tipo_servicio: '',

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
        }
    },
    computed: {
    },
    methods: {
        onSubmit(){
            let data = {
                compania: this.compania,
                nombre: this.nombre,
                apellidos: this.apellidos,
                dir_fisica: this.dir_fisica,
                pueblo: this.pueblo,
                telefono_primario: this.telefono_primario,
                telefono_secundario: this.telefono_secundario,
                servicio: this.servicio,
                fecha_cotizacion: this.fecha_cotizacion,
                costo_cotizacion: this.costo_cotizacion,
                deposito_cotizacion: this.tipo_servicio == 'grama'
                ? this.deposito_cotizacion
                : 'No Aplica',
                estado: this.estado,
                tipo_servicio: this.tipo_servicio,
            }
            this.$axios.post('http://localhost:5000/registro', data, {headers: {
                'Auth-Token': this.$session.get('token')
            }})
            .then(res => {
                if(res.data.result == 'ok'){
                    alert(res.data.message, 'Información')
                    this.onReset()
                }
            })
            .catch(err => {
                throw err
            })
        },
        onReset(){
            this.$refs.clienteForm.reset()
            this.compania = ''
            this.nombre = ''
            this.apellidos = ''
            this.dir_fisica = ''
            this.pueblo = ''
            this.telefono_primario = ''
            this.telefono_secundario= ''
            this.servicio = ''
            this.fecha_cotizacion = ''
            this.costo_cotizacion = ''
            this.deposito_cotizacion = ''
            this.estado = 'PR'
            this.tipo_servicio = ''
        }
    },
    components: {
        Datepicker
    }
}
</script>

<style scoped>
    .custom-textfield {
        background-color: white;
    }
</style>
