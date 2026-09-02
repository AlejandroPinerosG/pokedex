import type { App } from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faHeart,
  faLeaf,
  faSkull,
  faFire,
  faDroplet,
  faBolt,
  faBug,
  faStar,
  faCircleQuestion,
  faChevronUp,
  faMagnifyingGlass,
  faHouse,
  faGlobe,
  faUser,
  faChevronLeft,
  faWeightHanging,
  faRulerVertical,
  faTableCellsLarge,
  faCircleDot,
  faVenus,
  faMars,
  faWind,
  faSnowflake,
  faMountain,
  faFeather,
  faSpinner
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faHeart,
  faLeaf,
  faSkull,
  faFire,
  faDroplet,
  faBolt,
  faBug,
  faStar,
  faCircleQuestion,
  faChevronUp,
  faMagnifyingGlass,
  faHouse,
  faGlobe,
  faUser,
  faChevronLeft,
  faWeightHanging,
  faRulerVertical,
  faTableCellsLarge,
  faCircleDot,
  faVenus,
  faMars,
  faWind,
  faSnowflake,
  faMountain,
  faFeather,
  faSpinner
)
const setupFontAwesome = (app: App): void => {
  app.component('FontAwesomeIcon', FontAwesomeIcon)
}

export default setupFontAwesome
