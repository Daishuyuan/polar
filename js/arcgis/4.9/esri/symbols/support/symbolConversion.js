// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../Color ../../symbols ../../core/Error ../../core/lang ../Font ./simpleMarkerStyles".split(" "),function(r,h,k,c,n,p,q,e){function l(a){var m=a.color?a.color.clone():new k([255,255,255]),d,b,g;a instanceof c.PictureMarkerSymbol?(a.color&&0===a.color.r&&0===a.color.g&&0===a.color.b&&(m=new k([255,255,255])),d={href:a.url},b=a.width<=a.height?a.height:a.width):(d=a.style,d in f?d=f[d]:(console.log(d+' cannot be mapped to Icon symbol. Fallback to "circle"'),d="circle"),d=
{primitive:d},b=a.size,a.outline&&0<a.outline.width&&(g={size:a.outline.width,color:a.outline.color?a.outline.color.clone():[255,255,255]}));return new c.PointSymbol3D(new c.IconSymbol3DLayer({size:b,resource:d,material:{color:m},outline:g}))}Object.defineProperty(h,"__esModule",{value:!0});var f={};f[e.STYLE_CIRCLE]="circle";f[e.STYLE_CROSS]="cross";f[e.STYLE_DIAMOND]="kite";f[e.STYLE_SQUARE]="square";f[e.STYLE_X]="x";h.to3D=function(a,f,d,b){void 0===f&&(f=!1);void 0===d&&(d=!1);void 0===b&&(b=
!0);if(!a)return{symbol:null};if(c.isSymbol3D(a)||a instanceof c.WebStyleSymbol)b=a.clone();else if(a instanceof c.SimpleLineSymbol)b=new c.LineSymbol3D(new c.LineSymbol3DLayer({size:a.width||1,material:{color:a.color?a.color.clone():[255,255,255]}}));else if(a instanceof c.SimpleMarkerSymbol)b=l(a);else if(a instanceof c.PictureMarkerSymbol)b=l(a);else if(a instanceof c.SimpleFillSymbol)b=new c.FillSymbol3DLayer({material:{color:a.color?a.color.clone():[255,255,255,0]}}),a.outline&&(b.outline={size:a.outline.width||
0,color:a.outline.color?a.outline.color.clone():[255,255,255]}),b=new c.PolygonSymbol3D(b);else if(a instanceof c.TextSymbol){var g;g=a.haloColor;var e=a.haloSize;g=g&&0<e?{color:p.clone(g),size:e}:null;e=a.font?a.font.clone():new q;b=new (b?c.LabelSymbol3D:c.PointSymbol3D)(new c.TextSymbol3DLayer({size:e.size,font:e,halo:g,material:{color:a.color.clone()},text:a.text}))}else return{error:new n("symbol-conversion:unsupported-2d-symbol","2D symbol of type '"+(a.type||a.declaredClass)+"' is unsupported in 3D",
{symbol:a})};f&&(b.id=a.id);if(d&&c.isSymbol3D(b))for(a=0;a<b.symbolLayers.length;++a)b.symbolLayers.getItemAt(a)._ignoreDrivers=!0;return{symbol:b}}});