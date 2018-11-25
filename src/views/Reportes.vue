<template>
    <b-container fluid style="margin-top: 6px">
        <b-row>
            <b-col>
                <b-form-group
                label="Desde"
                label-for="desde">
                    <datepicker 
                    format="dd/MM/yyyy" 
                    input-class="form-control custom-textfield"
                    v-model="desde"></datepicker>
                </b-form-group>
            </b-col>
            <b-col>
                <b-form-group
                label="Hasta"
                label-for="hasta">
                    <datepicker 
                    format="dd/MM/yyyy" 
                    input-class="form-control custom-textfield"
                    v-model="hasta"></datepicker>
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
        </b-row>

        <b-row>
            <b-col>
                <registro-table :data="computedData"></registro-table>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
import RegistroTable from '@/components/RegistrosTable.vue'
import moment from 'moment'
export default {
    beforeCreate: function () {
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
    },
    data(){return {
        desde: moment().startOf('month').format(),
        hasta: moment().format(),
        pueblo: 'Todos',
        data_raw: [],
        data_para_mostrar: [],
        // Pueblo Select Box
        pueblosDropdown: ["Todos", "Adjuntas", "Aguada", "Aguadilla", "Aguas Buenas", 
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
    created(){
        this.getRegistrosData()
    },
    methods: {
        getRegistrosData(){
            this.$axios.get('http://localhost:5000/registro', {headers:{
                'Auth-Token': this.$session.get('token')
            }})
            .then(res => {
                this.data_raw = res.data.data
            })
            .catch(err => {
                throw err
            })
        },
    },

    computed: {
        computedData(){
            let desde = moment(this.desde)
            let hasta = moment(this.hasta)
            let pueblo = this.pueblo
            let result = []
            this.data_raw.forEach(factura => {
                let fecha = moment(factura.fecha_cotizacion)
                if(fecha >= desde && fecha <= hasta){
                    if(pueblo == "Todos"){
                        result.push(factura)
                    }
                    else if(factura.pueblo == pueblo){
                        result.push(factura)
                    }
                    
                }

            })
            return result
        }
    },
    components: {
        Datepicker,
        RegistroTable
    }
}
</script>