!function(t){var a={};function e(n){if(a[n])return a[n].exports;var i=a[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}e.m=t,e.c=a,e.d=function(t,a,n){e.o(t,a)||Object.defineProperty(t,a,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,a){if(1&a&&(t=e(t)),8&a)return t;if(4&a&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&a&&"string"!=typeof t)for(var i in t)e.d(n,i,function(a){return t[a]}.bind(null,i));return n},e.n=function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(a,"a",a),a},e.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},e.p="",e(e.s=4)}([,,,function(t,a,e){"use strict";t.exports=function(t){var a=(t.Layer?t.Layer:t.Class).extend({initialize:function(a){t.setOptions(this,a),this._onClickListeners=[],this._onHoverListeners=[]},setOptions:function(a){return t.setOptions(this,a),this.redraw()},redraw:function(){this._redraw(!0)},addMarkers:function(t){var a=this,e=[],n=[];t.forEach(function(t){if("markerPane"==t.options.pane&&t.options.icon){var i=t.getLatLng(),o=a._map.getBounds().contains(i),r=a._addMarker(t,i,o);!0===o&&e.push(r[0]),n.push(r[1])}else console.error("Layer isn't a marker")}),a._markers.load(e),a._latlngMarkers.load(n)},addMarker:function(t){var a=t.getLatLng(),e=this._map.getBounds().contains(a),n=this._addMarker(t,a,e);!0===e&&this._markers.insert(n[0]),this._latlngMarkers.insert(n[1])},addLayer:function(t){"markerPane"==t.options.pane&&t.options.icon?this.addMarker(t):console.error("Layer isn't a marker")},addLayers:function(t){this.addMarkers(t)},removeLayer:function(t){this.removeMarker(t,!0)},removeMarker:function(t,a){t.minX&&(t=t.data);var e=t.getLatLng(),n=this._map.getBounds().contains(e),i={minX:e.lng,minY:e.lat,maxX:e.lng,maxY:e.lat,data:t};this._latlngMarkers.remove(i,function(t,a){return t.data._leaflet_id===a.data._leaflet_id}),this._latlngMarkers.total--,this._latlngMarkers.dirty++,!0===n&&!0===a&&this._redraw(!0)},onAdd:function(a){this._map=a,this._canvas||this._initCanvas(),this.options.pane?this.getPane().appendChild(this._canvas):a._panes.overlayPane.appendChild(this._canvas),a.on("moveend",this._reset,this),a.on("resize",this._resize,this),a.on("click",this._executeListeners,this),a.on("mousemove",this._executeListeners,this),a.options.zoomAnimation&&t.Browser.any3d&&a.on("zoomanim",this._animateZoom,this)},onRemove:function(t){this.options.pane?this.getPane().removeChild(this._canvas):t.getPanes().overlayPane.removeChild(this._canvas),t.off("click",this._executeListeners,this),t.off("mousemove",this._executeListeners,this),t.off("moveend",this._reset,this),t.off("resize",this._resize,this),t.options.zoomAnimation&&t.off("zoomanim",this._animateZoom,this)},addTo:function(t){return t.addLayer(this),this},clearLayers:function(){this._latlngMarkers=null,this._markers=null,this._redraw(!0)},_addMarker:function(a,e,n){a._map=this._map,this._markers||(this._markers=new rbush),this._latlngMarkers||(this._latlngMarkers=new rbush,this._latlngMarkers.dirty=0,this._latlngMarkers.total=0),t.Util.stamp(a);var i=this._map.latLngToContainerPoint(e),o=a.options.icon.options.iconSize,r=o[0]/2,s=o[1]/2,c=[{minX:i.x-r,minY:i.y-s,maxX:i.x+r,maxY:i.y+s,data:a},{minX:e.lng,minY:e.lat,maxX:e.lng,maxY:e.lat,data:a}];return this._latlngMarkers.dirty++,this._latlngMarkers.total++,!0===n&&this._drawMarker(a,i),c},_drawMarker:function(t,a){var e=this;this._imageLookup||(this._imageLookup={}),a||(a=e._map.latLngToContainerPoint(t.getLatLng()));var n=t.options.icon.options.iconUrl;if(t.canvas_img)e._drawImage(t,a);else if(e._imageLookup[n])t.canvas_img=e._imageLookup[n][0],!1===e._imageLookup[n][1]?e._imageLookup[n][2].push([t,a]):e._drawImage(t,a);else{var i=new Image;i.src=n,t.canvas_img=i,e._imageLookup[n]=[i,!1,[[t,a]]],i.onload=function(){e._imageLookup[n][1]=!0,e._imageLookup[n][2].forEach(function(t){e._drawImage(t[0],t[1])})}}},_drawImage:function(t,a){var e=t.options.icon.options;const n=e.rotation||0;e.iconSize[0],e.iconSize[1],this._context.translate(a.x,a.y),this._context.rotate(n),this._context.drawImage(t.canvas_img,0,0,e.iconSize[0],e.iconSize[1]),this._context.rotate(-n),this._context.translate(-a.x,-a.y)},_resize:function(t){this._canvas.width=t.newSize.x,this._canvas.height=t.newSize.y},_reset:function(){var a=this._map.containerPointToLayerPoint([0,0]);t.DomUtil.setPosition(this._canvas,a);var e=this._map.getSize();this._canvas.width=e.x,this._canvas.height=e.y,this._redraw()},_redraw:function(t){var a=this;if(t&&this._context.clearRect(0,0,this._canvas.width,this._canvas.height),this._map&&this._latlngMarkers){var e=[];a._latlngMarkers.dirty/a._latlngMarkers.total>=.1&&(a._latlngMarkers.all().forEach(function(t){e.push(t)}),a._latlngMarkers.clear(),a._latlngMarkers.load(e),a._latlngMarkers.dirty=0,e=[]);var n=a._map.getBounds(),i={minX:n.getWest(),minY:n.getSouth(),maxX:n.getEast(),maxY:n.getNorth()};a._latlngMarkers.search(i).forEach(function(t){var n=a._map.latLngToContainerPoint(t.data.getLatLng()),i=t.data.options.icon.options.iconSize,o=i[0]/2,r=i[1]/2,s={minX:n.x-o,minY:n.y-r,maxX:n.x+o,maxY:n.y+r,data:t.data};e.push(s),a._drawMarker(t.data,n)}),this._markers.clear(),this._markers.load(e)}},_initCanvas:function(){this._canvas=t.DomUtil.create("canvas","leaflet-canvas-icon-layer leaflet-layer");var a=t.DomUtil.testProp(["transformOrigin","WebkitTransformOrigin","msTransformOrigin"]);this._canvas.style[a]="50% 50%";var e=this._map.getSize();this._canvas.width=e.x,this._canvas.height=e.y,this._context=this._canvas.getContext("2d");var n=this._map.options.zoomAnimation&&t.Browser.any3d;t.DomUtil.addClass(this._canvas,"leaflet-zoom-"+(n?"animated":"hide"))},addOnClickListener:function(t){this._onClickListeners.push(t)},addOnHoverListener:function(t){this._onHoverListeners.push(t)},_executeListeners:function(t){if(this._markers){var a=this,e=t.containerPoint.x,n=t.containerPoint.y;a._openToolTip&&(a._openToolTip.closeTooltip(),delete a._openToolTip);var i=this._markers.search({minX:e,minY:n,maxX:e,maxY:n});i&&i.length>0?(a._map._container.style.cursor="pointer","click"===t.type&&(i[0].data.getPopup()&&i[0].data.openPopup(),a._onClickListeners.forEach(function(a){a(t,i)})),"mousemove"===t.type&&(i[0].data.getTooltip()&&(a._openToolTip=i[0].data,i[0].data.openTooltip()),a._onHoverListeners.forEach(function(a){a(t,i)}))):a._map._container.style.cursor=""}},_animateZoom:function(a){var e=this._map.getZoomScale(a.zoom),n=this._map._getCenterOffset(a.center)._multiplyBy(-e).subtract(this._map._getMapPanePos());t.DomUtil.setTransform(this._canvas,n,e)}});t.canvasIconLayer=function(t){return new a(t)}}},function(t,a,e){var n=e(3);window.L.CanvasIconLayer=n(L)}]);