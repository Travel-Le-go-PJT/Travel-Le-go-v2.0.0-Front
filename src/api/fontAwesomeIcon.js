import Vue from "vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faPlane as fasPlane } from "@fortawesome/free-solid-svg-icons";

library.add(fasHeart, farHeart, fasPlane);

Vue.component("font-awesome-icon", FontAwesomeIcon);
