// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../../../core/tsSupport/extendsHelper ../../lib/gl-matrix ../../support/buffer/InterleavedLayout ../lib/GLMaterial ../lib/Material ../lib/RenderSlot ../lib/Util ./internal/MaterialUtil ../shaders/MeasurementArrowPrograms".split(" "),function(q,J,r,c,A,B,C,D,f,g,E){q=function(c){function a(b,a){a=c.call(this,a)||this;a.bufferWriter=new F;a.params=g.copyParameters(b,G);return a}r(a,c);a.prototype.dispose=function(){};a.prototype.getParameterValues=function(){var b=this.params;
return{width:b.width,outlineSize:b.outlineSize,outlineColor:b.outlineColor,stripeLength:b.stripeLength,stripeEvenColor:b.stripeEvenColor,stripeOddColor:b.stripeOddColor,polygonOffset:b.polygonOffset}};a.prototype.setParameterValues=function(b){g.updateParameters(this.params,b)&&this.notifyDirty("matChanged")};a.prototype.getParams=function(){return this.params};a.prototype.intersect=function(b,a,c,f,k,h,m,p){};a.prototype.getGLMaterials=function(){return{color:H,depthShadowMap:void 0,normal:void 0,
depth:void 0,highlight:void 0}};a.prototype.getAllTextureIds=function(){return[]};return a}(C);var H=function(c){function a(b,a,l){a=c.call(this,b,a)||this;a.params=g.copyParameters(b.getParams());a.selectProgram();return a}r(a,c);a.prototype.selectProgram=function(){this.program=this.programRep.getProgram(E.colorPass)};a.prototype.updateParameters=function(){this.params=this.material.getParameterValues();this.selectProgram()};a.prototype.beginSlot=function(b){return b===D.OPAQUE_MATERIAL};a.prototype.getProgram=
function(){return this.program};a.prototype.getDrawMode=function(b){return 5};a.prototype.bind=function(b,a){a=this.program;b.setDepthTestEnabled(!0);b.setDepthWriteEnabled(!0);b.setFaceCullingEnabled(!1);b.setBlendingEnabled(!1);this.params.polygonOffset&&(b.setPolygonOffsetFillEnabled(!0),b.setPolygonOffset(0,-4));b.bindProgram(a);a.setUniform1f("width",this.params.width);a.setUniform1f("outlineSize",this.params.outlineSize);a.setUniform4fv("outlineColor",this.params.outlineColor);a.setUniform1f("stripeLength",
this.params.stripeLength);a.setUniform4fv("stripeEvenColor",this.params.stripeEvenColor);a.setUniform4fv("stripeOddColor",this.params.stripeOddColor)};a.prototype.bindView=function(a,c){a=c.origin;var b=this.getProgram();g.bindView(a,c.view,b)};a.prototype.bindInstance=function(a,c){this.getProgram().setUniformMatrix4fv("model",c.transformation)};a.prototype.release=function(a){a.setDepthTestEnabled(!0);a.setDepthWriteEnabled(!0);a.setBlendingEnabled(!1);this.params.polygonOffset&&a.setPolygonOffsetFillEnabled(!1)};
return a}(B),G={width:32,outlineSize:.2,outlineColor:[1,.5,0,1],stripeLength:1,stripeEvenColor:[1,1,1,1],stripeOddColor:[1,.5,0,1],polygonOffset:!1},I=A.newLayout().vec3f(f.VertexAttrConstants.POSITION).vec3f(f.VertexAttrConstants.NORMAL).vec2f(f.VertexAttrConstants.UV0).f32(f.VertexAttrConstants.AUXPOS1),m=c.vec3d.create(),u=c.vec3d.create(),x=c.vec3d.create(),p=c.vec3d.create(),y=c.vec3d.create(),F=function(){function h(){this.vertexBufferLayout=I}h.prototype.allocate=function(a){return this.vertexBufferLayout.createBuffer(a)};
h.prototype.elementCount=function(a){return 2*(a.indices[f.VertexAttrConstants.POSITION].length/2+1)};h.prototype.write=function(a,b,n,l,h){var k=b.vertexAttr[f.VertexAttrConstants.POSITION].data,g=b.vertexAttr[f.VertexAttrConstants.NORMAL].data;n=k.length/3;(b=b&&b.indices&&b.indices.position)&&b.length!==2*(n-1)&&console.warn("MeasurementArrowMaterial does not support indices");b=a.transformation;for(var q=a.invTranspTransformation,r=l.position,z=l.normal,v=l.uv0,e=a=0;e<n;++e){var d=3*e;c.vec3d.set3(k[d],
k[d+1],k[d+2],m);e<n-1&&(d=3*(e+1),c.vec3d.set3(k[d],k[d+1],k[d+2],u),c.vec3d.set3(g[d],g[d+1],g[d+2],y),c.vec3d.normalize(y),c.vec3d.subtract(u,m,x),c.vec3d.normalize(x),c.vec3d.cross(y,x,p),c.vec3d.normalize(p));d=c.vec3d.dist(m,u);b&&q&&(c.mat4d.multiplyVec3(b,m),c.mat4d.multiplyVec3(b,u),c.mat4d.multiplyVec3(q,p));var t=h+2*e,w=t+1;r.setVec(t,m);r.setVec(w,m);z.setVec(t,p);z.setVec(w,p);v.set(t,0,a);v.set(t,1,-1);v.set(w,0,a);v.set(w,1,1);e<n-1&&(a+=d)}l=l.auxpos1;for(e=0;e<2*n;++e)l.set(h+e,
a)};return h}();return q});