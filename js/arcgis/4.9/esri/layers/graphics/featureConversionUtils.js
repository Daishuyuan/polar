// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../core/Error ../../core/Logger ./OptimizedFeature ./OptimizedFeatureSet ./OptimizedGeometry".split(" "),function(la,l,G,fa,D,ga,y){function B(a,b){return Math.round((b-a.translate[0])/a.scale[0])}function C(a,b){return Math.round((a.translate[1]-b)/a.scale[1])}function K(a,b){return b*a.scale[0]+a.translate[0]}function L(a,b){return a.translate[1]-b*a.scale[1]}function M(a){a=a.coords;return{x:a[0],y:a[1]}}function T(a){var b=new y.default;b.coords[0]=a.x;b.coords[1]=a.y;
return b}function U(a){a=a.coords;return{x:a[0],y:a[1],z:a[2]}}function ha(a){var b=new y.default;b.coords[0]=a.x;b.coords[1]=a.y;b.coords[2]=a.z;return b}function V(a){a=a.coords;return{x:a[0],y:a[1],m:a[2]}}function ia(a){var b=new y.default;b.coords[0]=a.x;b.coords[1]=a.y;b.coords[2]=a.m;return b}function W(a){a=a.coords;return{x:a[0],y:a[1],z:a[2],m:a[3]}}function ja(a){var b=new y.default;b.coords[0]=a.x;b.coords[1]=a.y;b.coords[2]=a.z;b.coords[3]=a.m;return b}function X(a,b,c){if(!a)return null;
for(var d=b?c?4:3:c?3:2,e=[],g=0;g<a.coords.length;g+=d){for(var f=[],h=0;h<d;h++)f.push(a.coords[g+h]);e.push(f)}return b?c?{points:e,hasZ:b,hasM:c}:{points:e,hasZ:b}:c?{points:e,hasM:c}:{points:e}}function Y(a,b,c){if(!a)return null;var d=b?c?4:3:c?3:2,e=a.coords,g=[],f=0,h=0;for(a=a.lengths;h<a.length;h++){for(var k=a[h],m=[],p=0;p<k;p++){for(var n=[],r=0;r<d;r++)n.push(e[f++]);m.push(n)}g.push(m)}return b?c?{paths:g,hasZ:b,hasM:c}:{paths:g,hasZ:b}:c?{paths:g,hasM:c}:{paths:g}}function Z(a,b,c){if(!a)return null;
var d=b?c?4:3:c?3:2,e=a.coords,g=[],f=0,h=0;for(a=a.lengths;h<a.length;h++){for(var k=a[h],m=[],p=0;p<k;p++){for(var n=[],r=0;r<d;r++)n.push(e[f++]);m.push(n)}g.push(m)}return b?c?{rings:g,hasZ:b,hasM:c}:{rings:g,hasZ:b}:c?{rings:g,hasM:c}:{rings:g}}function N(a,b,c,d,e,g){a.length=0;if(c){switch(c){case "esriGeometryPoint":c=T;d&&e?c=ja:d?c=ha:e&&(c=ia);for(d=0;d<b.length;d++){var f=b[d];e=f.geometry;f=f.attributes;e=e?c(e):void 0;a.push(new D.default(e,f,null,f[g]))}break;case "esriGeometryMultipoint":c=
d?e?4:3:e?3:2;for(d=0;d<b.length;d++){e=b[d];var h=e.geometry;e=e.attributes;f=void 0;if(h){f=new y.default;f.lengths[0]=h.points.length;for(var k=f.coords,m=0,p=0,h=h.points;p<h.length;p++)for(var n=h[p],r=0;r<c;r++)k[m++]=n[r]}a.push(new D.default(f,e,null,e[g]))}break;case "esriGeometryPolyline":c=d?e?4:3:e?3:2;for(d=0;d<b.length;d++){e=b[d];n=e.geometry;e=e.attributes;f=void 0;if(n)for(f=new y.default,k=f.lengths,m=f.coords,h=p=0,n=n.paths;h<n.length;h++){for(var r=n[h],q=0,t=r;q<t.length;q++)for(var u=
t[q],v=0;v<c;v++)m[p++]=u[v];k.push(r.length)}a.push(new D.default(f,e,null,e[g]))}break;case "esriGeometryPolygon":c=d?e?4:3:e?3:2;for(d=0;d<b.length;d++){f=b[d];r=f.geometry;e=f.centroid;f=f.attributes;k=void 0;if(r)for(k=new y.default,m=k.lengths,p=k.coords,n=h=0,r=r.rings;n<r.length;n++){q=r[n];t=0;for(u=q;t<u.length;t++)for(var v=u[t],l=0;l<c;l++)p[h++]=v[l];m.push(q.length)}e?a.push(new D.default(k,f,T(e),f[g])):a.push(new D.default(k,f,null,f[g]))}break;default:H.error("convertToFeatureSet:unknown-geometry",
new G("Unable to parse unknown geometry type '"+c+"'")),a.length=0}return a}a.length=0}function O(a,b,c,d,e){a.length=0;switch(c){case "esriGeometryPoint":c=M;e&&d?c=W:e?c=U:d&&(c=V);for(d=0;d<b.length;d++){var g=b[d];e=g.geometry;g=g.attributes;e=e?c(e):null;a.push({attributes:g,geometry:e})}break;case "esriGeometryMultipoint":for(c=0;c<b.length;c++){var f=b[c],g=f.geometry,f=f.attributes,h=void 0;g&&(h=X(g,d,e));a.push({attributes:f,geometry:h})}break;case "esriGeometryPolyline":for(c=0;c<b.length;c++)f=
b[c],g=f.geometry,f=f.attributes,h=void 0,g&&(h=Y(g,d,e)),a.push({attributes:f,geometry:h});break;case "esriGeometryPolygon":for(c=0;c<b.length;c++){var h=b[c],f=h.geometry,g=h.attributes,k=h.centroid,h=void 0;f&&(h=Z(f,d,e));k?(f=M(k),a.push({attributes:g,centroid:f,geometry:h})):a.push({attributes:g,geometry:h})}break;default:H.error("convertToFeatureSet:unknown-geometry",new G("Unable to parse unknown geometry type '"+c+"'"))}return a}function P(a,b,c,d,e,g){a.lengths.length&&(a.lengths.length=
0);a.coords.length&&(a.coords.length=0);if(!b||!b.coords.length)return null;e=Q[e];var f=b.coords;b=b.lengths;var h=c?d?4:3:d?3:2;c=c?d?I:A:d?A:J;if(!b.length)return c(a.coords,f,0,0,B(g,f[0]),C(g,f[1])),a.lengths.length&&(a.lengths.length=0),a.coords.length=h,a;for(var k,m,p,n=0,r,q=0,t=0;t<b.length;t++){var u=b[t];if(!(u<e)){var l=0;r=q;m=d=B(g,f[n]);p=k=C(g,f[n+1]);c(a.coords,f,r,n,m,p);l++;n+=h;r+=h;for(var x=1;x<u;x++,n+=h)if(m=B(g,f[n]),p=C(g,f[n+1]),m!==d||p!==k)c(a.coords,f,r,n,m-d,p-k),r+=
h,l++,d=m,k=p;l>=e&&(a.lengths.push(l),q=r)}}a.coords.length=q;return a.coords.length?a:null}function R(a,b,c,d,e,g,f){for(var h=f-c,k=0,m=0,p,n=g+c;n<f-c;n+=c){p=b[n];var r=b[n+1],q=b[g],t=b[g+1],l=b[h],v=b[h+1];q===l?p=Math.abs(p-q):(l=(v-t)/(l-q),p=Math.abs(l*p-r+(t-l*q))/Math.sqrt(l*l+1));p>k&&(m=n,k=p)}k>d?(R(a,b,c,d,e,g,m+c),R(a,b,c,d,e,m,f)):(e(a,b,a.length,g,b[g],b[g+1]),e(a,b,a.length,h,b[h],b[h+1]))}function S(a,b,c,d,e){var g=b.coords,f=b.lengths,h=c?d?I:A:d?A:J;c=c?d?4:3:d?3:2;if(!g.length)return a!==
b&&(a.lengths.length=0,a.coords.length=0),a;if(!f.length)return h(a.coords,g,0,0,K(e,g[0]),L(e,g[1])),a!==b&&(a.lengths.length=0,a.coords.length=c),a;var k=e.scale;d=k[0];for(var k=k[1],m=0,p=0;p<f.length;p++){var n=f[p];a.lengths[p]=n;var r=K(e,g[m]),q=L(e,g[m+1]);h(a.coords,g,m,m,r,q);for(var m=m+c,l=1;l<n;l++,m+=c)r+=g[m]*d,q-=g[m+1]*k,h(a.coords,g,m,m,r,q)}a!==b&&(a.lengths.length=f.length,a.coords.length=g.length);return a}function ka(a,b,c,d,e,g){g=e?g?4:3:g?3:2;var f=c,h=c+g,k=0,m=0,p=c=0,
n=0,r=0;for(--d;r<d;r++,f+=g,h+=g){var q=b[f],l=b[f+1],u=b[f+2],v=b[h],x=b[h+1],z=b[h+2],w=q*x-v*l,p=p+w,k=k+(q+v)*w,m=m+(l+x)*w;e&&(w=q*z-v*u,c+=(u+z)*w,n+=w);q<a[0]&&(a[0]=q);q>a[1]&&(a[1]=q);l<a[2]&&(a[2]=l);l>a[3]&&(a[3]=l);e&&(u<a[4]&&(a[4]=u),u>a[5]&&(a[5]=u))}0<p&&(p*=-1);0<n&&(n*=-1);if(!p)return null;a=[k,m,.5*p];e&&(a[3]=c,a[4]=.5*n);return a}function aa(a,b,c,d,e){e=d?e?4:3:e?3:2;for(var g=b,f=b+e,h=0,k=0,m=0,p=0,n=0,l=c-1;n<l;n++,g+=e,f+=e){var q=a[g],t=a[g+1],u=a[g+2],v=a[f],x=a[f+1],
z=a[f+2],w=d?ba(q,t,u,v,x,z):ca(q,t,v,x);w&&(h+=w,d?(q=da(q,t,u,v,x,z),k+=w*q[0],m+=w*q[1],p+=w*q[2]):(q=ea(q,t,v,x),k+=w*q[0],m+=w*q[1]))}return 0<h?d?[k/h,m/h,p/h]:[k/h,m/h]:0<c?d?[a[b],a[b+1],a[b+2]]:[a[b],a[b+1]]:null}function ca(a,b,c,d){a=c-a;b=d-b;return Math.sqrt(a*a+b*b)}function ba(a,b,c,d,e,g){a=d-a;b=e-b;c=g-c;return Math.sqrt(a*a+b*b+c*c)}function ea(a,b,c,d){return[a+.5*(c-a),b+.5*(d-b)]}function da(a,b,c,d,e,g){return[a+.5*(d-a),b+.5*(e-b),c+.5*(g-c)]}Object.defineProperty(l,"__esModule",
{value:!0});var H=fa.getLogger("esri.tasks.support.optimizedFeatureSet"),Q={esriGeometryPoint:0,esriGeometryPolyline:2,esriGeometryPolygon:3,esriGeometryMultipoint:0},J=function(a,b,c,d,e,g){a[c]=e;a[c+1]=g},A=function(a,b,c,d,e,g){a[c]=e;a[c+1]=g;a[c+2]=b[d+2]},I=function(a,b,c,d,e,g){a[c]=e;a[c+1]=g;a[c+2]=b[d+2];a[c+3]=b[d+3]};l.quantizeX=B;l.quantizeY=C;l.hydrateX=K;l.hydrateY=L;l.convertToPoint=function(a,b,c){return a?b?c?W(a):U(a):c?V(a):M(a):null};l.convertToMultipoint=X;l.convertToPolyline=
Y;l.convertToPolygon=Z;var E=[],F=[];l.convertFromFeature=function(a,b,c,d,e){E[0]=a;a=N(F,E,b,c,d,e)[0];E.length=F.length=0;return a};l.convertFromFeatures=N;l.convertToFeature=function(a,b,c,d){F[0]=a;O(E,F,b,c,d);a=E[0];E.length=F.length=0;return a};l.convertToFeatures=O;l.convertToFeatureSet=function(a){var b=a.objectIdFieldName,c=a.spatialReference,d=a.transform,e=a.fields,g=a.hasM,f=a.hasZ,h=a.geometryType,k=a.exceededTransferLimit;a={features:O([],a.features,h,f,g),fields:e,geometryType:h,
objectIdFieldName:b,spatialReference:c};d&&(a.transform=d);k&&(a.exceededTransferLimit=k);g&&(a.hasM=g);f&&(a.hasZ=f);return a};l.convertFromFeatureSet=function(a,b){var c=new ga.default,d=a.hasM,e=a.hasZ,g=a.features,f=a.objectIdFieldName,h=a.spatialReference,k=a.geometryType,m=a.exceededTransferLimit,p=a.transform;c.fields=a.fields;c.geometryType=k;c.objectIdFieldName=f||b;c.spatialReference=h;if(!c.objectIdFieldName)return H.error(new G("optimized-features:invalid-objectIdFieldName","objectIdFieldName is missing")),
c;g&&N(c.features,g,k,e,d,c.objectIdFieldName);m&&(c.exceededTransferLimit=m);d&&(c.hasM=d);e&&(c.hasZ=e);p&&(c.transform=p);return c};l.hydrateOptimizedFeatureSet=function(a){var b=a.transform,c=a.hasM,d=a.hasZ;if(!b)return a;for(var e=0,g=a.features;e<g.length;e++){var f=g[e];f.geometry&&S(f.geometry,f.geometry,c,d,b);f.centroid&&S(f.centroid,f.centroid,c,d,b)}a.transform=null;return a};l.quantizeOptimizedFeatureSet=function(a,b){var c=b.geometryType,d=b.features,e=b.hasM,g=b.hasZ;if("esriGeometryEnvelope"===
c)return H.error(new G("optimized-features:invalid-geometry-type",'FeatureSet with geometry type "'+c+'" is not supported')),b;if(!a)return b;for(var f=0;f<d.length;f++){var h=d[f],k=new D.default(new y.default,h.attributes);P(k.geometry,h.geometry,e,g,c,a);h.centroid&&(k.centroid=new y.default,P(k.centroid,h.centroid,e,g,"esriGeometryPoint",a));d[f]=k}b.transform=a;return b};l.quantizeOptimizedGeometry=P;l.quantizeOptimizedGeometryRemoveCollinear=function(a,b,c,d,e,g){a.lengths.length&&(a.lengths.length=
0);a.coords.length&&(a.coords.length=0);if(!b||!b.coords.length)return null;e=Q[e];var f=b.coords;b=b.lengths;var h=c?d?4:3:d?3:2;c=c?d?I:A:d?A:J;if(!b.length)return c(a.coords,f,0,0,B(g,f[0]),C(g,f[1])),a.lengths.length&&(a.lengths.length=0),a.coords.length=h,a;for(var k,m,p,n=0,l,q=0,t=0;t<b.length;t++){var u=b[t];if(!(u<e)){var v=0;l=q;d=k=B(g,f[n]);p=m=C(g,f[n+1]);c(a.coords,f,l,n,d,p);v++;for(var n=n+h,x=!1,z=0,w=0,y=1;y<u;y++,n+=h)if(d=B(g,f[n]),p=C(g,f[n+1]),d!==k||p!==m)k=d-k,m=p-m,x&&(0===
z&&0===k||0===w&&0===m)?(z+=k,w+=m):(x=!0,z=k,w=m,l+=h,v++),c(a.coords,f,l,n,z,w),k=d,m=p;x&&(l+=h,c(a.coords,f,l,n,z,w));v>=e&&(a.lengths.push(v),q=l)}}a.coords.length!==q&&(a.coords.length=q);return a.coords.length?a:null};l.generalizeOptimizedGeometry=function(a,b,c,d,e,g){a.lengths.length&&(a.lengths.length=0);a.coords.length&&(a.coords.length=0);if(!b||!b.coords.length)return null;e=Q[e];var f=b.coords;b=b.lengths;var h=c?d?4:3:d?3:2;c=c?d?I:A:d?A:J;if(!b.length)return c(a.coords,f,0,0,f[0],
f[1]),a.lengths.length&&(a.lengths.length=0),a.coords.length=h,a;for(var k=d=0;k<b.length;k++){var m=b[k];if(!(m<e)){var l=a.coords.length/h;R(a.coords,f,h,g,c,d,d+m*h);var n=a.coords.length/h-l;n>=e?a.lengths.push(n):a.coords.length=l*h}d+=m*h}return a.coords.length?a:null};l.getBoundsOptimizedGeometry=function(a,b,c,d){c=c?d?4:3:d?3:2;var e=d=Number.POSITIVE_INFINITY,g=Number.NEGATIVE_INFINITY,f=Number.NEGATIVE_INFINITY;if(b&&b.coords){b=b.coords;for(var h=0;h<b.length;h+=c){var k=b[h],m=b[h+1];
d=Math.min(d,k);g=Math.max(g,k);e=Math.min(e,m);f=Math.max(f,m)}}a[0]=d;a[1]=e;a[2]=g;a[3]=f;return a};l.getQuantizedBoundsOptimizedGeometry=function(a,b,c,d){c=c?d?4:3:d?3:2;d=b.coords;var e=Number.POSITIVE_INFINITY,g=Number.POSITIVE_INFINITY,f=Number.NEGATIVE_INFINITY,h=Number.NEGATIVE_INFINITY,k=0,m=0;for(b=b.lengths;m<b.length;m++)for(var l=b[m],n=d[k],r=d[k+1],e=Math.min(n,e),g=Math.min(r,g),f=Math.max(n,f),h=Math.max(r,h),k=k+c,q=1;q<l;q++,k+=c){var t=d[k],u=d[k+1],n=n+t,r=r+u;0>t&&(e=Math.min(e,
n));0<t&&(f=Math.max(f,n));0>u?g=Math.min(g,r):0<u&&(h=Math.max(h,r))}a[0]=e;a[1]=g;a[2]=f;a[3]=h;return a};l.hydrateOptimizedGeometry=S;l.getCentroidOptimizedGeometry=function(a,b,c,d){if(!b||!b.lengths.length)return null;a.lengths.length&&(a.lengths.length=0);a.coords.length&&(a.coords.length=0);for(var e=a.coords,g=[],f=c?[Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY]:[Number.POSITIVE_INFINITY,
Number.NEGATIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY],h=b.lengths,k=b.coords,m=c?d?4:3:d?3:2,l=0,n=0;n<h.length;n++){var r=h[n],q=ka(f,k,l,r,c,d);q&&g.push(q);l+=r*m}g.sort(function(a,b){var d=a[2]-b[2];0===d&&c&&(d=a[4]-b[4]);return d});g.length&&(m=6*g[0][2],e[0]=g[0][0]/m,e[1]=g[0][1]/m,c&&(m=6*g[0][4],e[2]=0!==m?g[0][3]/m:0),e[0]<f[0]||e[0]>f[1]||e[1]<f[2]||e[1]>f[3]||c&&(e[2]<f[4]||e[2]>f[5]))&&(e.length=0);if(!e.length)if(b=b.lengths[0]?aa(k,0,h[0],c,d):null)e[0]=b[0],
e[1]=b[1],c&&2<b.length&&(e[2]=b[2]);else return null;return a};l.lineCentroid=aa;l.getLength2D=ca;l.getLength3D=ba;l.getMidpoint2D=ea;l.getMidpoint3D=da});