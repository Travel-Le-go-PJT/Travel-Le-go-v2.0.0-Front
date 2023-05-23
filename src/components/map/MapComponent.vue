<template>
  <div id="map" class="text-left col-sm-12 col-md-12a" style="width: 100%; height:90%"></div>
</template>
<script>
export default {
  name: "MapComponent",
  data() {
    return {
      map: null,
      markers1: [],
      markers2: [],
      lines: [],
      distanceOverlays: [],
    };
  },
  props: {
    lists: [],
    center: null,
    level: Number,
    selected: []
  },
  computed: {

  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.loadMap();
    } else {
      this.loadScript();
    }
  },
  methods: {
    loadScript() {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=9e1a14c977569ffe807b98813ba7a82e&libraries=services,clusterer,drawing&autoload=false";
      script.onload = () => window.kakao.maps.load(this.loadMap);
      document.head.appendChild(script);
    },
    loadMap() {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.500613, 127.036431),
        level: this.level
      }
      this.map = new window.kakao.maps.Map(container, options);
      if (this.selected != null && this.selected.length != 0) {
        this.changeSelected();
      }
    },
    makeMarker() {
      let positions = [];
      if (this.lists != null) {
        this.lists.forEach((area) => {
          let markerInfo = {
            title: area.title,
            latlng: new window.kakao.maps.LatLng(area.latitude, area.longitude),
          };
          positions.push(markerInfo);
        });
      }

      this.displayMarker(positions, this.markers1, "markerStar");
      // 첫번째 검색 정보를 이용하여 지도 중심을 이동 시킵니다
      if (positions.length > 0) {
        this.map.setCenter(positions[0].latlng);
      }
    },
    displayMarker(positions, markers, version) {
      this.removeMarker(markers);

      // 마커 이미지의 이미지 주소입니다
      let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/" + version + ".png";

      for (var i = 0; i < positions.length; i++) {
        // 마커 이미지의 이미지 크기 입니다
        let imageSize = new window.kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        let markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

        // 마커를 생성합니다
        let marker = new window.kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: positions[i].latlng, // 마커를 표시할 위치
          title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image: markerImage, // 마커 이미지
        });
        markers.push(marker);

        marker.setMap(this.map);
      }
    },
    removeMarker(markers) {
      markers.forEach((marker) => {
        marker.setMap(null);
      });
    },
    removeLines() {
      this.lines.forEach((line) => {
        line.setMap(null);
      })
    },
    removeDistanceOverlays() {
      this.distanceOverlays.forEach((dist) => {
        dist.setMap(null);
      })
    },
    changeSelected() {
      let positions = [];
      this.selected.forEach((area) => {
        let markerInfo = {
          title: area.title,
          latlng: new window.kakao.maps.LatLng(area.latitude, area.longitude),
        };
        positions.push(markerInfo);
      });
      this.displayMarker(positions, this.markers2, "marker_red");

      let size = positions.length;
      if (size > 0) {
        this.map.setCenter(positions[size - 1].latlng);
      }

      let linePath;
      let lineLine = new window.kakao.maps.Polyline();
      let distance;

      this.removeLines();
      this.removeDistanceOverlays();
      for (var i = 0; i < size; i++) {
        if (i != 0) {
          linePath = [positions[i - 1].latlng, positions[i].latlng]
        }

        lineLine.setPath(linePath); // 선을 그릴 라인을 세팅합니다

        let drawLine = new window.kakao.maps.Polyline({
          map: this.map, // 선을 표시할 지도입니다 
          path: linePath,
          strokeWeight: 3, // 선의 두께입니다 
          strokeColor: '#db4040', // 선의 색깔입니다
          strokeOpacity: 1, // 선의 불투명도입니다 0에서 1 사이값이며 0에 가까울수록 투명합니다
          strokeStyle: 'solid' // 선의 스타일입니다
        });
        this.lines.push(drawLine);
        drawLine.setMap(this.map);

        distance = Math.round(lineLine.getLength()) / 1000;
        if (distance > 0) {
          // 클릭한 지점까지의 그려진 선의 총 거리를 표시할 커스텀 오버레이를 생성합니다
          var distanceOverlay = new window.kakao.maps.CustomOverlay(
            {
              content: '<div class="dotOverlay">거리 <span class="number">'
                + distance + '</span>km</div>',
              position: positions[i].latlng,
              yAnchor: 1,
              zIndex: 2
            });
          this.distanceOverlays.push(distanceOverlay);
          distanceOverlay.setMap(this.map);
        }
      }
    }
  },
  watch: {
    lists() {
      this.map.setLevel(this.level);
      this.makeMarker();
    },
    center() {
      if (this.center != null) {
        this.map.setCenter(new window.kakao.maps.LatLng(this.center.latitude, this.center.longitude));
        this.map.setLevel(this.level);
      }
    },
    selected() {
      if (this.map != null) {
        this.changeSelected();
      }
    }
  }
}
</script>

<style scoped>
.customoverlay {
  position: relative;
  bottom: 85px;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  float: left;

}

.customoverlay a {
  display: block;
  text-decoration: none;
  color: #000;
  text-align: center;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  overflow: hidden;
  background: #d95050;
  background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;
}

.customoverlay .title {
  display: block;
  text-align: center;
  background: #fff;
  margin-right: 35px;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
}

.customoverlay:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
</style>