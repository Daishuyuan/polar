// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define(["require","exports","../../../../core/Handles","../Evented"],function(c,d,e,f){Object.defineProperty(d,"__esModule",{value:!0});c=function(){function a(a){this.handles=new e;this.events=new f.Evented;this.contentLayerViews=a.contentLayerViews;this.handles.add(this.contentLayerViews.on("change",this.layerViewsChanged.bind(this)));this.layerViewsChanged({added:this.contentLayerViews.toArray(),removed:[],moved:[],target:this.contentLayerViews})}a.prototype.destroy=function(){this.handles&&(this.handles.destroy(),
this.handles=null)};a.prototype.layerViewsChanged=function(a){var b=this;a.added.forEach(function(a){"esri.views.3d.layers.SceneLayerView3D"===a.declaredClass&&b.handles.add(a.on("visible-geometry-changed",b.contentChanged.bind(b)),a.uid)});a.removed.forEach(function(a){return b.handles.remove(a.uid)})};a.prototype.contentChanged=function(){this.events.emit("request-update",g)};return a}();d.ContentGeometryUpdates=c;var g={};d.default=c});