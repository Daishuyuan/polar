// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/Logger ../layers/support/MemoryManagedLayerView ./Evented ./MemCache".split(" "),function(l,m,f,g,h,e){var k=f.getLogger("esri.views.3d.support.MemoryController");return function(){function b(a){this._view=a;this._minQuality=.1;this._memoryHWM=this._maxQuality=1;this._memoryLWM=.75;this._divideRate=1.3;this._throttle=5;this.events=new h.Evented;this._maxMemory=500;this._additionalCacheMemory=100;this._quality=1;this._memoryCommitted=this._memoryUsed=this._throttled=
this._stableQuality=0;this._cacheStorage=new e.Storage;this.updating=!1}b.prototype.getMemCache=function(a,b){return new e(a,this._cacheStorage,b)};b.prototype.setMaxGpuMemory=function(a){null!=a&&0<a&&(this._maxMemory=a,this.setDirty())};b.prototype.setAdditionalCacheMemory=function(a){null!=a&&0<=a&&(this._additionalCacheMemory=a,this.setDirty())};b.prototype.disableMemCache=function(){this._additionalCacheMemory=-4096};b.prototype.getMemoryFactor=function(){return this._quality};b.prototype._updateQuality=
function(a){a=Math.min(Math.max(a,this._minQuality),this._maxQuality);if(a===this._quality)return!1;this._quality=a;this.events.emit("quality-changed",this._quality);return!0};b.prototype.getUsedMemory=function(){return this._memoryUsed};b.prototype.setDirty=function(){this._stableQuality=0};b.prototype.update=function(){this._updateMemory();if(!(0>=this._memoryCommitted)){this._throttled=Math.max(0,this._throttled-1);var a=this._layersUpdating();if(a){if(this._quality<=this._minQuality)return;if(this._memoryCommitted>
1.1*this._memoryHWM||this._memoryUsed>this._memoryHWM)if(0<this._stableQuality)this._updateQuality(this._stableQuality);else if(0===this._throttled||1.05<this._memoryUsed)this._updateQuality(this._quality/this._divideRate),this._throttled=this._throttle}else this._memoryUsed>this._memoryHWM&&(this._stableQuality=0,a=this._updateQuality(this._quality/this._divideRate)),this._memoryCommitted<this._memoryLWM&&this._quality<this._maxQuality&&this._stableQuality!==this._quality&&(this._stableQuality=this._quality,
a=this._updateQuality(this._quality+.1*(this._memoryLWM-this._memoryCommitted+.1)));this.updating!==a&&(this.updating=a,this.events.emit("updating-changed",this.updating))}};b.prototype._layersUpdating=function(){var a=!1;this._view.allLayerViews.forEach(function(b){a=a||b.updating});return a};b.prototype._updateMemory=function(){var a=0,b=0;this._view.basemapTerrain&&this._view.basemapTerrain.getUsedMemory&&(a+=this._view.basemapTerrain.getUsedMemory());var c=this._view._stage&&this._view._stage.view&&
this._view._stage.view.getEdgeView();c&&(a+=c.getGpuMemoryUsage());this._view.allLayerViews&&this._view.allLayerViews.forEach(function(c){g.isMemoryManagedLayerView(c)&&(a+=c.getUsedMemory(),b+=c.getUnloadedMemory())});var d=null==this._warnMemoryUsage||Math.round(10*a)!==Math.round(10*this._warnMemoryUsage),c=1048576*this._maxMemory;if(a>c&&d){this._warnMemoryUsage=a;var d=function(a){return(a/1048576).toLocaleString(void 0,{maximumFractionDigits:1})+" MB"},e=Math.round(100*this._quality);k.warn("GPU Memory Limit exceeded! Limit: "+
d(c)+" Current: "+d(a)+" Projected: "+d(a+b)+" Quality: "+e+"%")}this._memoryUsed=a/c;this._memoryCommitted=(a+b)/c;this._cacheStorage.maxSize=Math.max(0,c-a+1048576*this._additionalCacheMemory);this.events.emit("memory-used",this._memoryUsed)};return b}()});