<template>
  <b-row class="mt-2 mb-2 text-center">
    <b-col class="sm-3">
      <b-form-select v-model="sidoCode" :options="sidos"></b-form-select>
    </b-col>
    <b-col class="sm-3">
      <select v-model="contentTypeId" id="searchContentId" class="custom-select" name="contentTypeId">
        <option value="0" selected>전체</option>
        <option value="12">관광지</option>
        <option value="14">문화시설</option>
        <option value="15">축제공연행사</option>
        <option value="25">여행코스</option>
        <option value="28">레포츠</option>
        <option value="32">숙박</option>
        <option value="38">쇼핑</option>
        <option value="39">음식점</option>
      </select>
    </b-col>
    <b-col class="sm-3">
      <b-form-input v-model="title" id="title" type="text" ref="title" placeholder="검색어를 입력해주세요"
        @keydown.enter="searchMap" required>
      </b-form-input>
    </b-col>
    <b-col cols="1">
      <b-button @click="searchMap" variant="primary"><b-icon-search></b-icon-search></b-button>
    </b-col>
  </b-row>
</template>

<script>
import http from "@/api/http";

export default {
  name: "MapSearchBar",
  data() {
    return {
      sidoCode: null,
      contentTypeId: 0,
      title: "",
      sidos: [{ value: null, text: "지역 선택" }],
      searchResults: []
    };
  },
  computed: {

  },
  created() {
    if(this.$route.query.sidoCode != null){
      this.sidoCode = this.$route.query.sidoCode
      this.title = this.$route.query.keyword
    }
    http.get("/attraction/sido")
      .then(({ data }) => {
        data.forEach((sido) => {
          this.sidos.push({ value: sido.sidoCode, text: sido.sidoName })
        });
      })
      .catch(() => {

      })
      this.searchMap();
  },
  methods: {
    searchMap() {
      let searchData = {
        sidoCode: this.sidoCode,
        contentTypeId: this.contentTypeId,
        title: this.title,
      }
      this.$emit('search', searchData);
    }
  },

};
</script>

<style scoped>
.custom-select{}
</style>