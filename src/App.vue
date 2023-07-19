<template>
    <div class="container">
        <Btn @click="this.connectWallet" data="Connect Wallet"/>
        <div class="container">
            <h3>Information about Account</h3>
            <h4>Account Address: {{ this.$store.state.address }} </h4>
            <h4>Chain ID: {{ this.$store.state.chainId }} </h4>
        </div>

        <FormSend class="container"></FormSend>

        <Btn style="margin-left: 15px; margin-top: 15px" v-show="isWalletConnected"
             @click="this.deployContract"
             data="Deploy Contract"></Btn>
        <div class="container">
            <h4>Contract Address: </h4>
            <input v-model="contractAdr" type="text">
            <br><br>
            <Btn @click="this.connectContract(this.contractAdr)"
                 data="Connect contract"></Btn>
        </div>
    </div>

    <div class="container">
        <CallFunction v-show="isContractConnected"/>
    </div>

</template>

<script>
import {mapActions} from "vuex";
import Btn from "@/components/Btn-vue.vue";
import CallFunction from "@/components/CallFunction.vue";
import FormSend from "@/components/FormSend.vue";

export default {
    components: {Btn, CallFunction, FormSend},
    data() {
        return {
            contractAdr:"",
        }
    },
    methods: {
        ...mapActions(['connectWallet']),
        ...mapActions(['connectContract']),
        ...mapActions(['deployContract']),
    },
    computed: {
        isWalletConnected() {
            if (this.$store.state.chainId) {
                return true;
            }
            return false;
        },
        isContractConnected() {
            if (this.$store.state.contAddress) {
                return true;
            }
            return false;
        }
    }
}
</script>

<style>
#app {
    font-family: Roboto, sans-serif;
}
.container{
    font-family: Roboto,sans-serif;
    margin-top: 15px;
    margin-left: 15px;
    border: 3px solid #4922e3;
    padding: 15px;
}
h4 {
    width: 10%;
    font-size: 24px;
    font-weight: 600;
    color: #17151f;
    border-bottom: 4px solid #4922e3;
}

input {
    padding: 10px 5px;
    color: #17151f;
    font-size: 20px;
    font-weight: 600;
    border: 3px solid #4922e3;
    border-radius: 4px;
}


</style>
