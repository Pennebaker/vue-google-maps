import {load, loaded} from './manager.js'

import Autocomplete from './components/autocomplete.vue'
import Circle from './components/circle'
import Cluster from './components/cluster'
// Vue component imports
import InfoWindow from './components/infoWindow.vue'
import Map from './components/map.vue'
import MapElementFactory from './components/mapElementFactory'
import MapElementMixin from './components/mapElementMixin'
import Marker from './components/marker'
import MountableMixin from './utils/mountableMixin'
import PlaceInput from './components/placeInput.vue'
import Polygon from './components/polygon'
import Polyline from './components/polyline'
import Rectangle from './components/rectangle'
import StreetViewPanorama from './components/streetViewPanorama.vue'

let GmapApi

// export everything
export {load, loaded, Marker, Polyline, Polygon, Circle, Cluster, Rectangle,
  InfoWindow, Map, PlaceInput, MapElementMixin, MapElementFactory, Autocomplete,
  MountableMixin, StreetViewPanorama}

export function install (Vue, options) {
  options = {
    installComponents: true,
    autobindAllEvents: false,
    ...options
  }

  const defaultResizeBus = new Vue()
  Vue.$gmapDefaultResizeBus = defaultResizeBus
  Vue.mixin({
    created () {
      this.$gmapDefaultResizeBus = defaultResizeBus
      this.$gmapOptions = options
    }
  })

  GmapApi = new Vue({data: {gmapApi: null}})
  loaded.then(() => { GmapApi.gmapApi = {} })

  if (options.load) {
    load(options.load, options.loadCn)
  }

  if (options.installComponents) {
    Vue.component('GmapMap', Map)
    Vue.component('GmapMarker', Marker)
    Vue.component('GmapCluster', Cluster)
    Vue.component('GmapInfoWindow', InfoWindow)
    Vue.component('GmapPolyline', Polyline)
    Vue.component('GmapPolygon', Polygon)
    Vue.component('GmapCircle', Circle)
    Vue.component('GmapRectangle', Rectangle)
    Vue.component('GmapAutocomplete', Autocomplete)
    Vue.component('GmapPlaceInput', PlaceInput)
    Vue.component('GmapStreetViewPanorama', StreetViewPanorama)
  }
}

export function gmapApi () {
  return GmapApi.gmapApi && window.google
}
