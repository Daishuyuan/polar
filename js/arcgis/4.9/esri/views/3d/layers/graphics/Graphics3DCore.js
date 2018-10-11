// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/declareExtendsHelper ../../../../core/tsSupport/decorateHelper ../../../../core/tsSupport/generatorHelper ../../../../core/tsSupport/awaiterHelper dojo/Deferred ../../../../geometry ../../../../renderers ../../../../symbols ../../../../core/Accessor ../../../../core/arrayUtils ../../../../core/Error ../../../../core/Handles ../../../../core/iteratorUtils ../../../../core/Logger ../../../../core/ObjectPool ../../../../core/PooledArray ../../../../core/promiseUtils ../../../../core/watchUtils ../../../../core/accessorSupport/decorators ../../../../geometry/support/aaBoundingBox ../../../../geometry/support/aaBoundingRect ../../../../layers/Layer ../../../../layers/graphics/dehydratedFeatures ../../../../renderers/support/diffUtils ../../../../renderers/support/rendererConversion ../../../../symbols/support/symbolConversion ./ElevationQuery ./featureExpressionInfoUtils ./Graphics3DGraphic ./Graphics3DOwner ./Graphics3DSymbolFactory ./Graphics3DWebStyleSymbol ./graphicUtils ../../lib/gl-matrix ../../support/mathUtils ../../support/projectionUtils ../../support/PropertiesPool ../../webgl-engine/Stage ../../webgl-engine/lib/FloatingBoxLocalOriginFactory ../../webgl-engine/lib/Layer".split(" "),
function(r,ka,M,g,N,O,P,D,v,w,Q,R,E,S,T,U,V,z,W,A,h,F,X,Y,G,Z,aa,H,ba,x,ca,da,ea,fa,I,J,n,t,ga,K,ha,ia){var u=new D.Point,B=J.vec3d.create(),f=F.create(),l=U.getLogger("esri.views.3d.layers.graphics.Graphics3DCore");r=function(r){function c(a){a=r.call(this)||this;a.propertiesPool=new ga.PropertiesPool({computedExtent:D.Extent},a);a.computedExtent=null;a.symbolCreationContext=new da.Graphics3DSymbolCreationContext;a.graphics={};a.stageLayer=null;a.stage=null;a.graphicsDrapedUids={};a.graphicsBySymbol=
{};a.graphicsKeys=[];a.symbols={};a.graphicsWithoutSymbol={};a.graphicsWaitingForSymbol=new Set;a.lastFastUpdate=null;a.handles=new S;a.viewSR=null;a.elevationAlignment=null;a.scaleVisibility=null;a.spatialIndex=null;a.labeling=null;a.highlights=null;a.viewElevationProvider=null;a.sharedSymbolResourcesOwnerHandle=null;a.whenGraphics3DGraphicRequests={};a.pendingUpdates=new Map;a.pendingUpdatesPool=new z({initialSize:2E3,allocator:function(){return{add:null,remove:null}},deallocator:function(a){a.add=
null;a.remove=null}});a.symbolWarningLogged=!1;a.geometryWarningLogged=!1;a.asyncUpdates=!1;a.elevationFeatureExpressionEnabled=!0;a.owner=null;a.layer=null;a.hasDraped=!1;a.graphicSymbolSupported=!0;a.minTotalNumberOfFeatures=2E3;a.numberOfGraphics=0;a._visible=void 0;a._startCreateGraphics=!1;return a}M(c,r);y=c;Object.defineProperty(c.prototype,"updating",{get:function(){return!!(0<this.graphicsWaitingForSymbol.size||this.needsIdleUpdate()||this.elevationAlignment&&this.elevationAlignment.updating||
this.scaleVisibility&&this.scaleVisibility.updating)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"maxNumberOfFeatures",{get:function(){return n.clamp(Math.ceil((this.maxTotalNumberOfVertices||1)/this.maxSymbolNumberOfVertices),this.minTotalNumberOfFeatures,this.maxTotalNumberOfFeatures||1)},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"maxSymbolNumberOfVertices",{get:function(){var a=0,b;for(b in this.symbols){var d=this.symbols[b];d&&(a=Math.max(a,d.numberOfVertices))}return 0===
a?this._get("maxSymbolNumberOfVertices")||1:a},enumerable:!0,configurable:!0});c.prototype.initialize=function(){this.viewSR=this.owner.view.spatialReference};c.prototype.setup=function(a){var b=this;this._set("elevationAlignment",a.elevationAlignment);this._set("scaleVisibility",a.scaleVisibility);this._set("spatialIndex",a.spatialIndex);this._set("labeling",a.labeling);this._set("highlights",a.highlights);var d=this.owner.view;this.viewElevationProvider=new ba.ViewElevationProvider(this.viewSR,
d);this.initializeStage(d,this.layer.uid);this.symbolCreationContext.sharedResources=d.sharedSymbolResources;this.sharedSymbolResourcesOwnerHandle=d.sharedSymbolResources.addGraphicsOwner(this.owner);this.symbolCreationContext.renderer=this.layer.renderer;this.symbolCreationContext.stage=this.stage;this.symbolCreationContext.streamDataSupplier=d.sharedSymbolResources.streamDataSupplier;this.symbolCreationContext.renderSpatialReference=d.renderSpatialReference;this.symbolCreationContext.renderCoordsHelper=
d.renderCoordsHelper;this.symbolCreationContext.layer=this.layer;this.symbolCreationContext.layerView=this.owner;this.symbolCreationContext.layerOrder=0;this.symbolCreationContext.localOriginFactory=y.createLocalOriginFactory();this.symbolCreationContext.elevationProvider=d.elevationProvider;a=x.extractExpressionInfo(this.layer.elevationInfo,this.elevationFeatureExpressionEnabled);this.symbolCreationContext.featureExpressionInfoContext=x.createContext(a,this.viewSR,l);d.deconflictor.addGraphicsOwner(this);
this.symbolCreationContext.screenSizePerspectiveEnabled=d.screenSizePerspectiveEnabled&&this.layer.screenSizePerspectiveEnabled;this.symbolCreationContext.slicePlaneEnabled=!!this.owner.slicePlaneEnabled;this.handles.add(this.owner.watch("suspended",function(){return b.updateLayerVisibility()}));this.handles.add([this.owner.watch("layer"in this.owner?["layer.screenSizePerspectiveEnabled,view.screenSizePerspectiveEnabled"]:"view.screenSizePerspectiveEnabled",function(){var a=d.screenSizePerspectiveEnabled&&
b.layer.screenSizePerspectiveEnabled;a!==b.symbolCreationContext.screenSizePerspectiveEnabled&&(b.symbolCreationContext.screenSizePerspectiveEnabled=a,b.recreateAllGraphics())}),this.owner.watch("slicePlaneEnabled",function(a){a=!!a;a!==b.symbolCreationContext.slicePlaneEnabled&&(b.symbolCreationContext.slicePlaneEnabled=a,b.recreateAllGraphics())})]);this.handles.add(A.when(d.basemapTerrain,"tilingScheme",function(a){a.spatialReference.equals(b.symbolCreationContext.overlaySR)||(b.symbolCreationContext.overlaySR=
b.basemapTerrain.spatialReference);b.handles.has("loaded-graphics")?b.recreateAllGraphics():b.handles.add(A.on(b.owner,"loadedGraphics","change",function(a){return b.graphicsCollectionChanged(a)},function(){return b.recreateAllGraphics()}),"loaded-graphics")}));this.validateRenderer(this.layer.renderer)};c.prototype.destroy=function(){this.owner.view.deconflictor.removeGraphicsOwner(this);this.owner.view.labeler.removeGraphicsOwner(this);this.clear();this.stage&&(this.stage.removeFromViewContent([this.stageLayer.id]),
this.stage.remove(K.ModelContentType.LAYER,this.stageLayer.id),this.stage=this.stageLayer=null);this.handles.destroy();this.viewSR=this.handles=null;this._set("owner",null);for(var a in this.whenGraphics3DGraphicRequests)this.whenGraphics3DGraphicRequests[a].reject(new E("graphic:layer-destroyed","Layer has been destroyed"));this.whenGraphics3DGraphicRequests=null;this.sharedSymbolResourcesOwnerHandle&&(this.sharedSymbolResourcesOwnerHandle.remove(),this.sharedSymbolResourcesOwnerHandle=null);this.propertiesPool&&
(this.propertiesPool.destroy(),this.propertiesPool=null);this.pendingUpdatesPool=null};c.prototype.clear=function(){for(var a in this.graphics)this.graphics[a].destroy();this.spatialIndex&&this.spatialIndex.clear();this.graphics={};this.graphicsKeys=null;this.numberOfGraphics=0;this.updateLayerVisibility();for(var b in this.symbols)(a=this.symbols[b])&&a.destroy();this.symbols={};this.graphicsBySymbol={};this.graphicsWithoutSymbol={};this.graphicsWaitingForSymbol.clear();this.pendingUpdates.clear();
this.pendingUpdatesPool.clear();this._set("hasDraped",!1);this.notifyChange("updating")};c.prototype.initializeStage=function(a,b){this.stage=a._stage;this.stageLayer=new ia(b,{isPickable:!this.owner.suspended},b);this.stage.add(K.ModelContentType.LAYER,this.stageLayer);this.stage.addToViewContent([this.stageLayer.id])};c.prototype.setDrawingOrder=function(a){this.symbolCreationContext.layerOrder=a;var b=new Set,d;for(d in this.symbols){var k=this.symbols[d];k&&k.setDrawOrder(a,b)}0<b.size&&this.stage.getDrapedTextureRenderer().updateRenderOrder(b)};
c.prototype.updateLayerVisibility=function(){var a=this.numberOfGraphics>this.maxNumberOfFeatures*ja,a=!this.owner.suspended&&!a;a!==this._visible&&((this._visible=a)?(this.stageLayer.isPickable=!0,this.updateAllGraphicsVisibility()):(this.stageLayer.isPickable=!1,this.hideAllGraphics()))};Object.defineProperty(c.prototype,"graphics3DGraphics",{get:function(){return this.graphics},enumerable:!0,configurable:!0});c.prototype.getGraphics3DGraphicById=function(a){return this.graphics[a]};Object.defineProperty(c.prototype,
"graphics3DGraphicsKeys",{get:function(){null===this.graphicsKeys&&(this.graphicsKeys=Object.keys(this.graphics));return this.graphicsKeys},enumerable:!0,configurable:!0});Object.defineProperty(c.prototype,"labelsEnabled",{get:function(){return!(!this.labeling||!this.labeling.layerLabelsEnabled())},enumerable:!0,configurable:!0});c.prototype.updateLabelingInfo=function(a){return this.labeling&&this.labeling.labelingInfoChange(a)};c.prototype.updateVisibilityInfo=function(){return this.labeling&&this.labeling.visibilityInfoChange()};
Object.defineProperty(c.prototype,"symbolUpdateType",{get:function(){if(0<this.pendingUpdates.size)return"unknown";var a=0,b=0,d;for(d in this.symbols){var k=this.symbols[d];if(k){k=k.getFastUpdateStatus();if(0<k.loading)return"unknown";this.graphicsBySymbol[d]&&(b+=k.fast,a+=k.slow)}}return 0<=b&&0===a?"fast":0<=a&&0===b?"slow":"mixed"},enumerable:!0,configurable:!0});c.prototype.needsIdleUpdate=function(){return 0<this.pendingUpdates.size?!0:!!this.lastFastUpdate&&500<performance.now()-this.lastFastUpdate};
c.prototype.idleUpdate=function(a){var b=this.needsIdleUpdate();this._applyPendingUpdates(a);!a.done()&&this.lastFastUpdate&&(this.lastFastUpdate=null);a=this.needsIdleUpdate();b!==a&&this.notifyChange("updating")};c.prototype.whenGraphics3DGraphic=function(a){var b=this.graphics[a.uid];if(b)return W.resolve(b);b=this.whenGraphics3DGraphicRequests[a.uid];b||(b=new P,this.whenGraphics3DGraphicRequests[a.uid]=b);return b.promise};c.prototype.boundsForGraphics3DGraphic=function(a,b){return O(this,void 0,
void 0,function(){var d,k,c,L,f,h,g,p,m,l;return N(this,function(e){switch(e.label){case 0:return d=this.owner.view.spatialReference,k=this.owner.view.renderSpatialReference,c=this.owner.view.basemapTerrain.spatialReference,L=function(a,b,c){return t.bufferToBuffer(a,k,b,a,d,b,c)},f=function(a,b,k){return t.bufferToBuffer(a,c,b,a,d,b,k)},h=this.viewElevationProvider?{service:this.viewElevationProvider,useViewElevation:b&&b.useViewElevation,minDemResolution:b&&b.minDemResolution,minDemResolutionForPoints:this.owner.view.resolution}:
null,[4,a.getProjectedBoundingBox(L,f,h)];case 1:g=e.sent();if(!g)return[2,null];p=g.boundingBox;g.requiresDrapedElevation&&(m=this.symbolCreationContext.elevationProvider)&&(F.center(p,B),u.x=B[0],u.y=B[1],u.z=void 0,u.spatialReference=d,l=m.getElevation(u)||0,p[2]=Math.min(p[2],l),p[5]=Math.max(p[5],l));return[2,{boundingBox:p,screenSpaceObjects:g.screenSpaceObjects}]}})})};c.prototype.whenGraphicBounds=function(a,b){var d=this;return A.whenOnce(this.owner,"loadedGraphics").then(function(){var b=
d.owner.layer&&d.owner.layer.objectIdField,c=d.owner.loadedGraphics.find(function(d){return d===a?!0:b&&d.attributes&&a.attributes&&d.attributes[b]===a.attributes[b]});if(c)return d.whenGraphics3DGraphic(c);throw new E("internal:graphic-not-part-of-view","Graphic is not part of this view");}).then(function(a){return d.boundsForGraphics3DGraphic(a,b)})};c.prototype.graphicsCollectionChanged=function(a){this._startCreateGraphics&&(this.add(a.added),this.remove(a.removed))};c.prototype.graphicUpdateHandler=
function(a){var b=this.graphics[a.graphic.uid];if(b)switch(a.property){case "visible":this.graphicUpdateVisible(b,a);break;case "geometry":case "attributes":case "symbol":this.recreateGraphic(b)}};c.prototype.graphicUpdateVisible=function(a,b){a.setVisibilityFlag(0,b.newValue)&&this.labeling&&(this.lastFastUpdate=performance.now(),this.owner.view.deconflictor.setDirty(),this.owner.view.labeler.setDirty())};c.prototype.recreateGraphic=function(a){a=[a.graphic];this.remove(a);this.add(a)};c.prototype.beginGraphicUpdate=
function(a,b){this.graphicsWaitingForSymbol.add(a.uid);1===this.graphicsWaitingForSymbol.size&&this.notifyChange("updating");this._get("symbolsUpdating")||this._set("symbolsUpdating",!0)};c.prototype.endGraphicUpdate=function(a){a&&(this.graphicsWaitingForSymbol.delete(a.uid),0===this.graphicsWaitingForSymbol.size&&this.notifyChange("updating"));this._get("symbolsUpdating")&&0===this.graphicsWaitingForSymbol.size&&(this.owner.view.flushDisplayModifications(),this._set("symbolsUpdating",!1))};c.prototype.expandComputedExtent=
function(a){var b=a.spatialReference;G.computeAABB(a,f);a=this.viewSR;var d=y.tmpVec;!b.equals(a)&&t.xyzToVector(f[0],f[1],0,b,d,a)&&(f[0]=d[0],f[1]=d[1],t.xyzToVector(f[3],f[4],0,b,d,a),f[3]=d[0],f[4]=d[1]);if(n.isFinite(f[0])&&n.isFinite(f[3])&&n.isFinite(f[1])&&n.isFinite(f[4])){var b=this.computedExtent,d=null,c=n.isFinite(f[2])&&n.isFinite(f[5]),e=c&&(!b||null==b.zmin||f[2]<b.zmin),c=c&&(!b||null==b.zmax||f[5]>b.zmax);if(b){if(f[0]<b.xmin||f[1]<b.ymin||f[3]>b.xmax||f[4]>b.ymax||e||c)d=this.propertiesPool.get("computedExtent"),
d.xmin=Math.min(f[0],b.xmin),d.ymin=Math.min(f[1],b.ymin),d.xmax=Math.max(f[3],b.xmax),d.ymax=Math.max(f[4],b.ymax),d.spatialReference=a}else d=this.propertiesPool.get("computedExtent"),d.xmin=f[0],d.ymin=f[1],d.xmax=f[3],d.ymax=f[4],d.spatialReference=a;d&&(e&&(d.zmin=f[2]),c&&(d.zmax=f[5]),this._set("computedExtent",d))}};c.prototype.updateHasDraped=function(){var a=!1,b;for(b in this.graphicsDrapedUids)if(this.graphicsDrapedUids.hasOwnProperty(b)){a=!0;break}this._set("hasDraped",a)};c.prototype.elevationInfoChange=
function(){var a=x.extractExpressionInfo(this.layer.elevationInfo,this.elevationFeatureExpressionEnabled);this.symbolCreationContext.featureExpressionInfoContext=x.createContext(a,this.viewSR,l);this.labeling&&this.labeling.elevationInfoChange();this.layer.renderer!==this.symbolCreationContext.renderer&&this.rendererChange(this.layer.renderer);for(var b in this.graphicsBySymbol){var d=this.symbols[b],a=this.graphicsBySymbol[b];if(d&&d.layerPropertyChanged("elevationInfo",a))for(var c in a)for(var e=
a[c],d=e.graphic,e=e._labelGraphics,f=0;f<e.length;f++){var g=e[f];g.graphics3DSymbolLayer.updateGraphicElevationContext(d,g)}else this._recreateSymbol(b)}this.elevationAlignment&&this.elevationAlignment.elevationInfoChange()};c.prototype.clearSymbolsAndGraphics=function(){this.clear();this.elevationAlignment&&this.elevationAlignment.clear();this.labeling&&this.labeling.clear();this.stageLayer&&this.stageLayer.invalidateSpatialQueryAccelerator()};c.prototype.startCreateGraphics=function(){this._startCreateGraphics=
!0;this.recreateAllGraphics()};c.prototype.recreateAllGraphics=function(){this._startCreateGraphics&&(this.clearSymbolsAndGraphics(),this._set("computedExtent",null),this.symbolCreationContext.screenSizePerspectiveEnabled=this.owner.view.screenSizePerspectiveEnabled&&this.layer.screenSizePerspectiveEnabled,this.symbolCreationContext.slicePlaneEnabled=!!this.owner.slicePlaneEnabled,this.owner.loadedGraphics&&this.owner.view.basemapTerrain.tilingScheme&&this.add(this.owner.loadedGraphics.toArray()))};
c.prototype._recreateSymbol=function(a){var b=this.graphicsBySymbol[a],d=[],c=[],e;for(e in b){var f=b[e];f.isDraped()&&delete this.graphicsDrapedUids[e];this.spatialIndex&&d.push(f);c.push(f.graphic);f.destroy();this.removeGraphics3DGraphic(e);this.updateLayerVisibility()}0<d.length&&this.spatialIndex.removeMany(d);this.graphicsBySymbol[a]={};(b=this.symbols[a])&&b.destroy();delete this.symbols[a];this.updateHasDraped();this.add(c)};c.prototype.add=function(a){this.owner.view.basemapTerrain&&this.owner.view.basemapTerrain.tilingScheme?
(this.asyncUpdates?this._addDelayed(a):this._addImmediate(a),this.notifyChange("updating")):l.error("#add()","Cannot add graphics before terrain surface has been initialized")};c.prototype._addImmediate=function(a){var b=this;this.symbolWarningLogged=this.geometryWarningLogged=!1;m.clear();for(var d=0;d<a.length;d++)this._startAddGraphic(a[d],m);m.forEach(function(a){return b._finishAddGraphics(a)});m.clear();this.updateHasDraped();this.owner.view.deconflictor.setDirty();this.owner.view.labeler.setDirty()};
c.prototype._addDelayed=function(a){for(var b=0;b<a.length;b++){var d=a[b],c=d.uid,e=this.pendingUpdates.get(c);e?e.add=d:(e=this.pendingUpdatesPool.pushNew(),e.add=d,this.pendingUpdates.set(c,e))}};c.prototype.remove=function(a){this.asyncUpdates?this._removeDelayed(a):this._removeImmediate(a);this.notifyChange("updating")};c.prototype._removeImmediate=function(a){for(var b=[],d=0;d<a.length;d++){var c=this._removeGraphic(a[d]);this.spatialIndex&&c&&b.push(c)}0<b.length&&this.spatialIndex.removeMany(b);
this.updateHasDraped();this.owner.view.deconflictor.setDirty();this.owner.view.labeler.setDirty()};c.prototype._removeDelayed=function(a){for(var b=0;b<a.length;b++){var d=a[b],c=d.uid,e=this.pendingUpdates.get(c);e?e.add&&(e.remove?e.add=null:this.pendingUpdates.delete(c)):(e=this.pendingUpdatesPool.pushNew(),e.remove=d,this.pendingUpdates.set(c,e))}0===this.pendingUpdates.size&&this.pendingUpdatesPool.clear()};c.prototype._applyPendingUpdates=function(a){var b=this;if(!a.done()){this.symbolWarningLogged=
this.geometryWarningLogged=!1;var d=0;m.clear();T.everyMap(this.pendingUpdates,function(c,e){if(a.done())return!1;if(c.remove){var k=b._removeGraphic(c.remove);b.spatialIndex&&k&&b.spatialIndex.remove(k)}c.add&&b._startAddGraphic(c.add,m)&&d++;b.pendingUpdates.delete(e);1E3<d&&(m.forEach(function(a){return b._finishAddGraphics(a)}),m.clear(),d=0)});m.forEach(function(a){return b._finishAddGraphics(a)});m.clear();0===this.pendingUpdates.size&&this.pendingUpdatesPool.clear();this.updateHasDraped();
this.owner.view.deconflictor.setDirty();this.owner.view.labeler.setDirty()}};c.prototype._startAddGraphic=function(a,b){this.graphicsWithoutSymbol[a.uid]=a;var d=a.geometry;if(!d)return this.geometryWarningLogged||(this.geometryWarningLogged=!0,l.warn("Graphic in layer "+this.layer.id+" has no geometry and will not render")),!1;if(!this.graphicSymbolSupported&&a.symbol)return this.symbolWarningLogged||(this.symbolWarningLogged=!0,l.warn("Graphic in layer "+this.layer.id+" is not allowed to have a symbol, use a renderer instead")),
!1;var c=this.owner.getRenderingInfo&&this.owner.getRenderingInfo(a);if(!c||!c.symbol)return this.symbolWarningLogged||(this.symbolWarningLogged=!0,l.warn("Graphic in layer "+this.layer.id+" has no symbol and will not render")),!1;var e=this.getOrCreateGraphics3DSymbol(c.symbol,c.renderer);if(!e)return!1;c={graphic:a,renderingInfo:c,layer:this.layer};this.expandComputedExtent(d);this.beginGraphicUpdate(a,e);a=e.symbol.id;(d=b.get(a))?d.graphics.push(c):(d=C.acquire(),d.clear(),d.push(c),b.set(a,{asyncSymbol:e,
graphics:d}));return!0};c.prototype._finishAddGraphics=function(a){var b=this;a.asyncSymbol.then(function(){q.clear();for(var d=0;d<a.graphics.length;d++){var c=a.graphics.data[d],e=c.graphic;b.graphicsWaitingForSymbol.has(e.uid)&&(c=b.createGraphics3DGraphic(a.asyncSymbol,c),b.spatialIndex&&c&&q.push(c));b.endGraphicUpdate(e)}0<q.length&&b.spatialIndex.addMany(q.data,q.length);q.clear();a.graphics.clear();C.release(a.graphics);b.labeling&&(b.lastFastUpdate=performance.now(),b.owner.view.labeler.setDirty())},
function(){for(var d=0;d<a.graphics.length;d++)b.endGraphicUpdate(a.graphics.data[d].graphic);a.graphics.clear();C.release(a.graphics)})};c.prototype._removeGraphic=function(a){a=a.uid;var b=this.graphics[a];if(b){b.isDraped()&&delete this.graphicsDrapedUids[a];var d=b.graphics3DSymbol.symbol.id;b.destroy();delete this.graphicsBySymbol[d][a];delete this.graphicsWithoutSymbol[a];this.removeGraphics3DGraphic(a);this.labeling&&this.labeling.removeGraphic(b)}else this.graphicsWaitingForSymbol.delete(a);
return b};c.prototype.hasLabelingContext=function(a){if(a instanceof w.LabelSymbol3D||a instanceof w.TextSymbol){var b=this.symbolCreationContext.layer;return b.labelingInfo?b.labelingInfo.some(function(b){return b.symbol===a}):!1}return!1};c.prototype.hasValidSymbolCreationContext=function(a){return a instanceof w.LabelSymbol3D&&!this.hasLabelingContext(a)?(l.error("LabelSymbol3D is only valid as part of a LabelClass. Using LabelSymbol3D as a renderer symbol is not supported."),!1):!0};c.prototype.createGraphics3DSymbol=
function(a,b){var d=this;if(!this.hasValidSymbolCreationContext(a))return null;a=H.to3D(a,!0,!1,this.hasLabelingContext(a));if(a.symbol){var c=void 0;b&&"backgroundFillSymbol"in b&&b.backgroundFillSymbol&&(b=H.to3D(b.backgroundFillSymbol,!1,!0),b.symbol&&"web-style"!==b.symbol.type&&(c=b.symbol.symbolLayers));b=ea.make(a.symbol,this.symbolCreationContext,c);b.then(function(){d.notifyChange("maxSymbolNumberOfVertices")});return b}a.error&&l.error(a.error.message);return null};c.prototype.getOrCreateGraphics3DSymbol=
function(a,b){var d=this,c=this.symbols[a.id];void 0===c&&(c=a instanceof w.WebStyleSymbol?new fa(a,function(a){return d.createGraphics3DSymbol(a,b)}):this.createGraphics3DSymbol(a,b),this.symbols[a.id]=c);return c};c.prototype.addGraphics3DGraphic=function(a){this.graphics[a.graphic.uid]=a;this.graphicsKeys=null;this.numberOfGraphics++;this.updateLayerVisibility()};c.prototype.removeGraphics3DGraphic=function(a){delete this.graphics3DGraphics[a];this.graphicsKeys=null;this.numberOfGraphics--;this.updateLayerVisibility()};
c.prototype.createGraphics3DGraphic=function(a,b){var d=b.graphic;delete this.graphicsWithoutSymbol[d.uid];if(!this.symbols[a.symbol.id])this.add([d]);else if(!this.graphics[d.uid]){b=a.createGraphics3DGraphic(b);a=a.symbol.id;this.addGraphics3DGraphic(b);this.graphicsBySymbol[a]||(this.graphicsBySymbol[a]={});this.graphicsBySymbol[a][d.uid]=b;b.initialize(this.stageLayer,this.stage);b.isDraped()&&(this.graphicsDrapedUids[d.uid]=!0,this._set("hasDraped",!0));b.centroid=null;"point"!==d.geometry.type&&
b instanceof ca&&(b.centroid=I.computeCentroid(d.geometry),b.centroid&&I.convertPointSR(b.centroid,this.viewSR));a=this.scaleVisibility&&this.scaleVisibility.scaleRangeActive();this.labeling&&this.labeling.addGraphic(b);a&&this.scaleVisibility.updateGraphicScaleVisibility(b);b.setVisibilityFlag(0,!!d.visible&&!this.owner.suspended);this.owner.view.deconflictor.setInitialIconVisibilityFlag(this.layer,b);if(a=this.whenGraphics3DGraphicRequests[d.uid])delete this.whenGraphics3DGraphicRequests[d.uid],
a.resolve(b);this.highlights&&this.highlights.graphicCreated(b);return b}};c.prototype.rendererChange=function(a){var b=this.symbolCreationContext.renderer;if(a!==b){this.validateRenderer(a);var d=Z.diff(b,a);this.updateUnchangedSymbolMappings(d,a,b);this.symbolCreationContext.renderer=a;d&&("complete"===d.type?this.recreateAllGraphics():"partial"===d.type&&(this.applyRendererDiff(d,a,b)?this.volatileGraphicsUpdated():this.recreateAllGraphics()))}};c.prototype.diffHasSymbolChange=function(a){for(var b in a.diff)switch(b){case "visualVariables":case "defaultSymbol":case "uniqueValueInfos":break;
case "authoringInfo":case "fieldDelimiter":delete a.diff[b];break;default:return!0}return!1};c.prototype.applySymbolSetDiff=function(a,b,d,c){a=a||[];b=b||[];c=[];for(var e=0;e<b.length;e++){var k=b[e],f=this.graphicsBySymbol[k.id],g;for(g in f){var h=f[g],l=h.graphic,m=this.layer instanceof Y?this.layer:null;if(k!==d.defaultSymbol||d.getSymbol(G.hydrateGraphic(l,m))!==d.defaultSymbol)h.isDraped()&&delete this.graphicsDrapedUids[g],a.length||d.defaultSymbol?c.push(l):this.graphicsWithoutSymbol[g]=
l,h.destroy(),this.highlights&&this.highlights.graphicDeleted(this.graphics[g]),delete f[g],this.removeGraphics3DGraphic(g),this.updateLayerVisibility()}if(void 0===f||0===Object.keys(f).length)delete this.graphicsBySymbol[k.id],(f=this.symbols[k.id])&&f.destroy(),delete this.symbols[k.id],this.notifyChange("maxSymbolNumberOfVertices")}if(a.length||c.length){for(g in this.graphicsWithoutSymbol)c.push(this.graphicsWithoutSymbol[g]);this.graphicsWithoutSymbol={};this.add(c)}this.updateHasDraped();this.owner.view.deconflictor.setDirty();
this.owner.view.labeler.setDirty()};c.prototype.applyUniqueValueRendererDiff=function(a,b,d){var c=a.diff.defaultSymbol,e=a.diff.uniqueValueInfos;if(c||e){var f=e?e.added.map(function(a){return a.symbol}):[],g=e?e.removed.map(function(a){return a.symbol}):[];if(e)for(var h=0;h<e.changed.length;h++)f.push(e.changed[h].newValue.symbol),g.push(e.changed[h].oldValue.symbol);c?(d.defaultSymbol&&g.push(d.defaultSymbol),b.defaultSymbol&&f.push(b.defaultSymbol)):d.defaultSymbol&&f.length&&g.push(b.defaultSymbol);
this.applySymbolSetDiff(f,g,b,d);delete a.diff.defaultSymbol;delete a.diff.uniqueValueInfos;return!0}return!1};c.prototype.calculateUnchangedSymbolMapping=function(a,b,d){if(b instanceof v.UniqueValueRenderer&&d instanceof v.UniqueValueRenderer)if(!a){if(d&&d.defaultSymbol)return[{oldId:d.defaultSymbol.id,newId:b.defaultSymbol.id}]}else if("partial"===a.type){var c=a.diff;a=c.defaultSymbol;var c=c.uniqueValueInfos,e=void 0,e=c?c.unchanged.map(function(a){return{oldId:a.oldValue.symbol.id,newId:a.newValue.symbol.id}}):
d.uniqueValueInfos.map(function(a,d){return{oldId:a.symbol.id,newId:b.uniqueValueInfos[d].symbol.id}});!a&&d.defaultSymbol&&e.push({oldId:d.defaultSymbol.id,newId:b.defaultSymbol.id});return e}return[]};c.prototype.updateUnchangedSymbolMappings=function(a,b,d){var c=0;for(a=this.calculateUnchangedSymbolMapping(a,b,d);c<a.length;c++)if(d=a[c],b=d.oldId,d=d.newId,b&&b!==d){var e=this.graphicsBySymbol[b];delete this.graphicsBySymbol[b];void 0!==e&&(this.graphicsBySymbol[d]=e);e=this.symbols[b];delete this.symbols[b];
void 0!==e&&(this.symbols[d]=e,e.symbol.id=d)}};c.prototype.applyRendererDiff=function(a,b,d){if(this.diffHasSymbolChange(a))return!1;if(b instanceof v.UniqueValueRenderer&&d instanceof v.UniqueValueRenderer&&this.applyUniqueValueRendererDiff(a,b,d)&&0===Object.keys(a.diff).length)return!0;for(var c in this.graphicsBySymbol)if((d=this.symbols[c])&&!d.applyRendererDiff(a,b,this.graphicsBySymbol[c]))return!1;return!0};c.prototype.opacityChange=function(){for(var a in this.graphicsBySymbol){var b=this.symbols[a];
b&&b.layerPropertyChanged("opacity")}};c.prototype.setClippingExtent=function(a,b){var d=this.symbolCreationContext.clippingExtent,c=X.create();t.extentToBoundingRect(a,c,b)?this.symbolCreationContext.clippingExtent=[c[0],c[1],-Infinity,c[2],c[3],Infinity]:this.symbolCreationContext.clippingExtent=null;return!R.equals(this.symbolCreationContext.clippingExtent,d)};c.prototype.forEachGraphics3DGraphic=function(a){var b=this;if(this.owner.loadedGraphics){var c=!1;this.owner.loadedGraphics.forEach(function(d){var e=
b.getGraphics3DGraphicById(d.uid);e&&a(e,d)&&(c=!0)});c&&(this.owner.view.deconflictor.setDirty(),this.owner.view.labeler.setDirty())}};c.prototype.updateAllGraphicsVisibility=function(){var a=this;this.forEachGraphics3DGraphic(function(b,c){c=b.setVisibilityFlag(0,c.visible);var d=!1;a.scaleVisibility&&(d=a.scaleVisibility.updateGraphicScaleVisibility(b));return c||d})};c.prototype.hideAllGraphics=function(){this.forEachGraphics3DGraphic(function(a){return a.setVisibilityFlag(0,!1)})};c.prototype.validateRenderer=
function(a){(a=aa.validateTo3D(a))&&l.warn("Renderer for layer '"+(this.layer.title?this.layer.title+", ":"")+", id:"+this.layer.id+"' is not supported in a SceneView",a.message)};c.prototype.volatileGraphicsUpdated=function(){this.labeling&&(this.lastFastUpdate=performance.now(),this.labeling.clear());this.stageLayer.invalidateSpatialQueryAccelerator();this.stageLayer.shaderTransformationChanged();this.notifyChange("updating")};c.createLocalOriginFactory=function(){return new ha(5E6,16)};c.prototype.snapshotInternals=
function(){var a=this;return{graphics:Object.keys(this.graphics).sort(),symbols:Object.keys(this.symbols).sort(),graphicsBySymbol:Object.keys(this.graphicsBySymbol).sort().map(function(b){return{symbolId:b,graphics:Object.keys(a.graphicsBySymbol[b]).sort()}}),graphicsWithoutSymbol:Object.keys(this.graphicsWithoutSymbol).sort(),graphicsDrapedUids:Object.keys(this.graphicsDrapedUids).sort(),pendingUpdates:this.pendingUpdates}};var y;c.tmpVec=J.vec3d.create();g([h.property({readOnly:!0})],c.prototype,
"computedExtent",void 0);g([h.property({readOnly:!0})],c.prototype,"elevationAlignment",void 0);g([h.property({readOnly:!0})],c.prototype,"scaleVisibility",void 0);g([h.property({readOnly:!0})],c.prototype,"spatialIndex",void 0);g([h.property({readOnly:!0})],c.prototype,"labeling",void 0);g([h.property({readOnly:!0})],c.prototype,"highlights",void 0);g([h.property()],c.prototype,"asyncUpdates",void 0);g([h.property({constructOnly:!0})],c.prototype,"elevationFeatureExpressionEnabled",void 0);g([h.property({constructOnly:!0})],
c.prototype,"owner",void 0);g([h.property({constructOnly:!0})],c.prototype,"layer",void 0);g([h.property({constructOnly:!0})],c.prototype,"basemapTerrain",void 0);g([h.property({readOnly:!0})],c.prototype,"hasDraped",void 0);g([h.property({readOnly:!0})],c.prototype,"symbolsUpdating",void 0);g([h.property({constructOnly:!0})],c.prototype,"graphicSymbolSupported",void 0);g([h.property({readOnly:!0,dependsOn:["elevationAlignment.updating","scaleVisibility.updating"]})],c.prototype,"updating",null);
g([h.property({aliasOf:"owner.view.qualitySettings.graphics3D.maxTotalNumberOfVertices"})],c.prototype,"maxTotalNumberOfVertices",void 0);g([h.property({aliasOf:"owner.view.qualitySettings.graphics3D.maxTotalNumberOfFeatures"})],c.prototype,"maxTotalNumberOfFeatures",void 0);g([h.property()],c.prototype,"minTotalNumberOfFeatures",void 0);g([h.property({readOnly:!0,dependsOn:["maxSymbolNumberOfVertices","maxTotalNumberOfVertices","minTotalNumberOfFeatures","maxTotalNumberOfFeatures"]})],c.prototype,
"maxNumberOfFeatures",null);g([h.property({readOnly:!0})],c.prototype,"maxSymbolNumberOfVertices",null);return c=y=g([h.subclass("esri.views.3d.layers.graphics.Graphics3DCore")],c)}(h.declared(Q));var m=new Map,q=new z,C=new V(z);(function(){return function(){this.remove=this.add=null}})();var ja=10;return r});