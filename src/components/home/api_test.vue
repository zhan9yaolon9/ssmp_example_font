<template>
    <div>
        welcome
        {{books}}
    </div>
</template>
<script>
    export default{
        data(){
            return{
                books:[]
            }
        },
        created(){
            this.$axios.get("testGetApi")
                .then((response) => {
                    this.books = response.data.data
                });
        }
    }
</script>