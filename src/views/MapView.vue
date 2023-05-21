<template>
    <div class="home">
          
      <b-row>
        <b-col></b-col>
          <b-col cols="10">
          <map-search-bar v-on:search="search"></map-search-bar>
          </b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
          <b-col cols="7" align="left">
          <map-component :lists="searchResults" :center="center" :level="5"/>
          </b-col>
          <b-col cols="3">
          <map-list v-on:showCenter="showCenter" :lists="searchResults"/>
          </b-col>
          <b-col></b-col>
      </b-row>
  
   
    </div>
  </template>
  
  <script>
  import http from "@/api/http";
  import MapSearchBar from "@/components/map/MapSearchBar.vue";
  import MapList from "@/components/map/MapList.vue";
  import MapComponent from "@/components/map/MapComponent.vue";
  export default {
    name: 'MapView',
    components: {
        MapSearchBar,
        MapComponent,
        MapList,
    }, 
    data(){
      return{
        searchResults:[],
        center: null,
      }
    },
    computed: {
      
    },
    created() {
    },
    methods: {
        search(searchData) {
          http.post("/attraction/search", searchData)
            .then(({data, status}) => {
                console.log(searchData);
                console.log(data);
                if(status == 204){
                  this.searchResults = [];
                }else{
                this.searchResults = data;
                }
            })
            .catch(() => {
          })
        },
        showCenter(attraction){
          this.center = attraction;
        }
       
    }
  }
  </script>
  <style scoped>
  </style>
  