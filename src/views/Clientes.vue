<template>
    <b-container fluid class="container--custom">
        <b-container style="margin-top: 12px">
            <clientes-form></clientes-form>
        </b-container>
    </b-container>
</template>

<script>
import ClientesForm from '@/components/ClientesForm.vue'
import  RegistrosTable from '@/components/RegistrosTable.vue'
export default {
    beforeCreate: function () {
        if (!this.$session.exists()) {
            this.$router.push('/')
        }
    },
    components: {
        ClientesForm,
    }
}
</script>

<style scoped>
    .container--custom {
        margin-bottom: 16px;
    }
</style>
