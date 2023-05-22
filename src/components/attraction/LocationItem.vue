<template>
    
    <div class="col-md-3 p-3" id="card">
        <img :src="makeImageName(location.image)" class="card-img-top" :alt="location.title">
        <div class="card-body">
            <h5 class="card-title">{{ location.sidoName }}</h5>
            <p class="card-text">{{ location.description }}</p>
        </div>
    </div>
  
  </template>
  <script>
  import { mapState } from "vuex";
//   import http from "@/api/http.js";
  export default {
    name: "LocationItem",
    data() {
      return {
        
      };
    },
    created(){
        console.log(this.location)
    },

    props: {
      location:Object
    },
    filters: {
      
    },
    computed: {
      ...mapState("userStore", ["userInfo"]),
    },
    methods: {
        makeImageName(image){
        if(image == "no-image")
        return "require('@/assets/no-image.jpg')";
        else
        return image;
      }
    },
    watch: {
      location(){
        console.log(this.location)
      }
    },
  
  
  
  
  
  
  
  };
  </script>
  
  <style scoped>
  @font-face {
    font-family: "omyu_pretty";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2")
      format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  
  #cardbox {
    padding: 2px;
  }
  
  #card {
    float: left;
  }
  
  card-img-top {
    height: 800px;
  }
  
  .btn-hover {
    width: 80px;
    font-family: omyu_pretty;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin: 20px;
    height: max-content + 10px;
    text-align: center;
    border: none;
    background-color: #ffffff;
    background-size: 300% 100%;
    padding: 10px 0px;
    border-radius: 10px;
    moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }
  
  .btn-hover:hover {
    background-position: 100% 0;
    moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }
  
  .btn-hover:focus {
    outline: none;
  }
  
  .btn-hover.color-3 {
    background-image: linear-gradient(
      to right,
      #f3f04f,
      #fca533,
      #7dd66b,
      #bad737
    );
    box-shadow: 0 4px 15px 0 rgba(145, 79, 68, 0.75);
  }
  </style>
  