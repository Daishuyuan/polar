// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../../core/Error ../../../core/promiseUtils ../../../geometry/projection ../../../geometry/support/spatialReferenceUtils ../../../geometry/support/webMercatorUtils".split(" "),function(y,m,p,g,h,k,l){function q(b,a){var d;if(!a)return null;if("x"in a){var c={x:0,y:0};b=b(a.x,a.y,n,0);c.x=b[0];c.y=b[1];null!=a.z&&(c.z=a.z);null!=a.m&&(c.m=a.m);return c}if("xmin"in a)return c={xmin:0,ymin:0,xmax:0,ymax:0},d=b(a.xmin,a.ymin,n,0),c.xmin=d[0],c.ymin=d[1],b=b(a.xmax,a.ymax,n,
0),c.xmax=b[0],c.ymax=b[1],a.hasZ&&(c.zmin=a.zmin,c.zmax=a.zmax,c.hasZ=!0),a.hasM&&(c.mmin=a.mmin,c.mmax=a.mmax,c.hasM=!0),c;if("rings"in a)return{rings:r(a.rings,b),hasM:a.hasM,hasZ:a.hasZ};if("paths"in a)return{paths:r(a.paths,b),hasM:a.hasM,hasZ:a.hasZ};if("points"in a)return{points:t(a.points,b),hasM:a.hasM,hasZ:a.hasZ}}function r(b,a){for(var d=[],c=0;c<b.length;c++)d.push(t(b[c],a));return d}function t(b,a){for(var d=[],c=0;c<b.length;c++){var e=b[c],f=a(e[0],e[1],[0,0],0);d.push(f);2<e.length&&
f.push(e[2]);3<e.length&&f.push(e[3])}return d}function u(b,a){return!b||!a||k.equals(b,a)||l.canProject(b,a)?!1:!0}Object.defineProperty(m,"__esModule",{value:!0});var n=[0,0];m.checkProjectionSupport=function(b,a){if(Array.isArray(b)){for(var d=0;d<b.length;d++){var c=b[d];if(u(c.geometry&&c.geometry.spatialReference,a))return h.isSupported()?h.load():g.reject(new p("feature-store:unsupported-query","projection not supported",{inSpatialReference:b,outSpatialReference:a}))}return g.resolve()}return u(b,
a)?h.isSupported()?h.load():g.reject(new p("feature-store:unsupported-query","projection not supported",{inSpatialReference:b,outSpatialReference:a})):g.resolve()};var v=q.bind(null,l.lngLatToXY),w=q.bind(null,l.xyToLngLat);m.project=function(b,a,d){return a&&d&&!k.equals(a,d)?l.canProject(a,d)?k.isWebMercator(d)?v(b):w(b):h.projectMany([b],a,d,null,!0)[0]:b};var x=new (function(){function b(){this._jobs=[];this._timer=null;this._process=this._process.bind(this)}b.prototype.push=function(a,b,c){var d=
this;a&&a.length&&b&&c&&!k.equals(b,c)||g.resolve(a);var f={geometries:a,inSpatialReference:b,outSpatialReference:c,resolve:null};this._jobs.push(f);return g.create(function(a){f.resolve=a;null===d._timer&&(d._timer=setTimeout(d._process,10))},function(){var a=d._jobs.indexOf(f);-1<a&&d._jobs.splice(a,1)})};b.prototype._process=function(){this._timer=null;var a=this._jobs.shift();if(a){var b=a.geometries,c=a.inSpatialReference,e=a.outSpatialReference,a=a.resolve;l.canProject(c,e)?k.isWebMercator(e)?
a(b.map(v)):a(b.map(w)):a(h.projectMany(b,c,e,null,!0));0<this._jobs.length&&(this._timer=setTimeout(this._process,10))}};return b}());m.projectMany=function(b,a,d){return x.push(b,a,d)}});