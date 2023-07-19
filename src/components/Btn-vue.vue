<template>
    <button>{{this.data}}</button>
</template>

<script>
export default {
    data() {
    },
    props: {
        data: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
button {
    margin-bottom: 0.5rem;
    font-family: Roboto,sans-serif;
    color: #17151f;
    background-color: #fff;
    border: 3px solid #4922e3;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 22px;
    font-weight: 700;
    transition: 0.6s;
}
button:hover{
    box-shadow: 0 0 20px 10px #4922e3;
}
button:active{
    background-color:#17151f;
    color: #ffffff;
    box-shadow:0 0 20px 10px #17151f;
}
</style>