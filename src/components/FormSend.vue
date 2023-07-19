<template>
  <div>
      <h3>Send Ethers</h3>
      <h4>To</h4>
      <input v-model="this.to" type="text">
      <h4>Amount</h4>
      <input v-model="this.amount" type="text">
      <br><br>
      <Btn @click="callSendEth" data="Send"></Btn>
      <p>TransactionHash: {{hash}}</p>
  </div>
</template>

<script>
import Btn from "@/components/Btn-vue.vue";
import {mapActions} from "vuex";

export default {
    name: "FormSend.vue",
    components:{Btn},
    data() {
        return{
            to:"",
            amount: "",
            hash:"",
        }
    },
    methods:{
        ...mapActions(['sendEth']),
        async callSendEth() {
            let result =  await this.sendEth([this.to, this.amount]);
            this.hash = result.hash;
        }
    }
}
</script>

<style scoped>

</style>
