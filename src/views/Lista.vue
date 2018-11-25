<template>
    <b-container fluid>
        <registros-table :data="data"></registros-table>
    </b-container>
</template>
<script>
import  RegistrosTable from '@/components/RegistrosTable.vue'
export default {
    beforeCreate: function () {
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
    },
    data(){return {
        data: [],
    }},
    methods: {
        getRegistrosData(){
            this.$axios.get('http://localhost:5000/registro', {headers:{
                'Auth-Token': this.$session.get('token')
            }})
            .then(res => {
                this.data = res.data.data
            })
            .catch(err => {
                throw err
            })
        },
    },
    mounted(){
        this.getRegistrosData()
    },
    components:{
        RegistrosTable
    }
}
</script>
