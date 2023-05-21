<template>
    <div>
      <b-button v-b-toggle.sidebar>Toggle Sidebar</b-button>
      <b-sidebar id="sidebar" title="My Plan" shadow style="margin-top: 20dp;">
        <div class="px-3 py-2">
          
        </div>
      </b-sidebar>
    </div>
  </template>
  
  <script>
  export default {
      name:"PlanSideBar",
      components:{
  },
  data(){
      return{
          localSelected:[],
      }
  },
  created(){
      this.localSelected = this.selected;
  },
  props:{
      selected:[],
  },
  methods: {
      write(){
          this.$emit('write');
      },
      deleteItem(index){
          this.localSelected.splice(index, 1);
          this.$emit('delete', this.localSelected);
      }
  }
  }
  </script>
  
  <style scoped>
  
  </style>