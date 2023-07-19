<template>
    <div>
        <p>Address: {{ contractAddress }}</p>
        <br>

        <h4>get Number</h4>
        <Btn @click="callGetNumber" data="Call"></Btn>

        <h4>set Number</h4>
        <input id="number" type="number"><br>
        <Btn @click="callSetNumber" data="Call"></Btn>

        <h4>get Str</h4>
        <Btn @click="callGetStr" data="Call"></Btn>

        <h4>set Str</h4>
        <input id="str" type="text"><br>
        <Btn @click="callSetStr" data="Call"></Btn>


        <h4>get number from array</h4>
        <input id="index" type="text"><br>
        <Btn @click="callGetNumberFromArray" data="Call"></Btn>

        <h4>push number to array</h4>
        <input id="numberArr" type="text"><br>
        <Btn @click="callPushNumber" data="Call"></Btn>
    </div>
</template>

<script>
import Btn from "@/components/Btn-vue.vue";
import {mapActions} from "vuex";

export default {
    name: "CallFunction.vue",
    components: {Btn},
    data() {
        return {}
    },
    methods: {
        ...mapActions(["GetNumber"]),
        ...mapActions(["GetStr"]),
        ...mapActions(["SetNumber"]),
        ...mapActions(["SetStr"]),
        ...mapActions(["GetNumberFromArr"]),
        ...mapActions(["PushNumber"]),
        callGetNumber() {
            this.GetNumber();
        },
        callGetStr() {
            this.GetStr();
        },

        callSetNumber() {
            let number = document.getElementById("number").value;
            console.log(number)
            this.SetNumber(Number(number));
        },
        callSetStr() {
            let str = document.getElementById("str").value;
            this.SetStr(str);
        },
        callGetNumberFromArray() {
            let index = document.getElementById("index").value;
            this.GetNumberFromArr(index);
        },
        callPushNumber() {
            let numberArr = document.getElementById("numberArr").value;
            this.PushNumber(Number(numberArr));
        },

    },
    computed: {
        contractAddress() {
            return this.$store.getters.getAddress;
        },
    }
}
</script>

<style scoped>
    p{
        font-size: 20px;
        font-weight: 700;
        color: #17151f;
    }
</style>