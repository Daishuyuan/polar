/**
 * @name Producer
 * @author dsy
 * @description 产生三维物体或三维场景
 */
define([
    "Utils",
    "Constants",
    "ShaderFactory",
    "BasicTools"
], function (Utils, Constants, ShaderFactory, tools) {
    'use strict';

    function Producer(_renderer, _container, _resources) {
        var _utils = Utils,
            _cts = Constants,
            _shaders = ShaderFactory(),
            _uniform = THREE.UniformsUtils;

        /**
         * switch latlon(lat, lon) to world(x,y,z)
         * 
         * @param {*} lat latitude
         * @param {*} lon longtitude
         * @param {*} sphere sphere
         */
        function ltlg2xyz(lat, lon, sphere) {
            let rad = sphere.geometry.parameters.radius,
                phi = (90 - lat) * (Math.PI / 180),
                theta = (lon + 180) * (Math.PI / 180),
                x = -((rad) * Math.sin(phi) * Math.cos(theta)),
                y = ((rad) * Math.cos(phi)),
                z = ((rad) * Math.sin(phi) * Math.sin(theta));
            _utils.__debug__ && tools.mutter(`latlon(${lat}, ${lon}) to world(${x}, ${y}, ${z})`, "info");
            return {
                x: x + sphere.position.x,
                y: y + sphere.position.y,
                z: z + sphere.position.z,
            };
        }

        /**
         * get resource from preloaded list by path
         * 
         * @param {*} type the type of resource 
         * @param {*} path the path of resource
         */
        function __getRes__(type, path) {
            var res = _resources[type];
            try {
                if (_resources == null) {
                    throw new Error("resource can't be null!");
                } else if (res && res.has(path)) {
                    return res.get(path);
                } else {
                    path = path ? path : "ufo";
                    throw new Error(`[${type}] resource(${path}) could not be preloaded.`);
                }
            } catch (e) {
                tools.mutter(e, "error");
            }
        }

        function __generateTexture__(data, width, height) {
            var canvas, canvasScaled, context, image, imageData, vector3, sun, shade;
            vector3 = new THREE.Vector3(0, 0, 0);
            sun = new THREE.Vector3(1, 1, 1);
            sun.normalize();
            canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            context = canvas.getContext('2d');
            context.fillStyle = '#000';
            context.fillRect(0, 0, width, height);
            image = context.getImageData(0, 0, canvas.width, canvas.height);
            imageData = image.data;
            for (var i = 0, j = 0, l = imageData.length; i < l; i += 4, j++) {
                vector3.x = data[j - 2] - data[j + 2];
                vector3.y = 2;
                vector3.z = data[j - width * 2] - data[j + width * 2];
                vector3.normalize();
                shade = vector3.dot(sun);
                imageData[i] = (96 + shade * 128) * (0.5 + data[j] * 0.007);
                imageData[i + 1] = (32 + shade * 96) * (0.5 + data[j] * 0.007);
                imageData[i + 2] = (shade * 96) * (0.5 + data[j] * 0.007);
            }
            context.putImageData(image, 0, 0);
            // Scaled 4x
            canvasScaled = document.createElement('canvas');
            canvasScaled.width = width * 4;
            canvasScaled.height = height * 4;
            context = canvasScaled.getContext('2d');
            context.scale(4, 4);
            context.drawImage(canvas, 0, 0);
            image = context.getImageData(0, 0, canvasScaled.width, canvasScaled.height);
            imageData = image.data;
            for (var i = 0, l = imageData.length; i < l; i += 4) {
                var v = ~~(Math.random() * 5);
                imageData[i] += v;
                imageData[i + 1] += v;
                imageData[i + 2] += v;
            }
            context.putImageData(image, 0, 0);
            return canvasScaled;
        }

        return {
            getPointCloud: function (props = {}) {
                _utils.__defaultParam__(props, "pColor", 0xffffff);
                _utils.__defaultParam__(props, "pSize", 1);
                _utils.__defaultParam__(props, "ratio", 1);
                _utils.__defaultParam__(props, "transparent", false);
                _utils.__defaultParam__(props, "elevation", null);
                if (props.elevation) {
                    var particlePositions = null,
                        particles = new THREE.BufferGeometry(),
                        particlesData = [],
                        particleCount = 0,
                        pointCloud = null,
                        count = 0,
                        width = 0,
                        long = 0,
                        compCloud = new THREE.Group();
                    props.elevation.forEach(function (row) {
                        long = Math.max(long, row.length);
                        width++;
                        particleCount += row.length;
                    });
                    particlePositions = new Float32Array(particleCount * 3);
                    for (var i = 0; i < props.elevation.length; ++i) {
                        for (var j = 0; j < props.elevation[i].length; ++j) {
                            particlePositions[count * 3] = (j - parseInt(width / 2)) * props.ratio;
                            particlePositions[count * 3 + 1] = props.elevation[i][j] * props.ratio;
                            particlePositions[count * 3 + 2] = (i - parseInt(long / 2)) * props.ratio;
                            count++;
                            // get it to the geometry
                            particlesData.push({
                                velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2),
                                numConnections: 0
                            });
                        }
                    }
                    particles.setDrawRange(0, particleCount);
                    particles.addAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setDynamic(true));
                    // create the particle system
                    pointCloud = new THREE.Points(particles, new THREE.PointsMaterial({
                        color: props.pColor,
                        size: props.pSize,
                        blending: THREE.AdditiveBlending,
                        transparent: props.transparent,
                        sizeAttenuation: false
                    }));
                    compCloud.add(pointCloud);
                    return compCloud;
                }
            },
            getChaos: function (props = {}) {
                _utils.__defaultParam__(props, "right", null);
                _utils.__defaultParam__(props, "left", null);
                _utils.__defaultParam__(props, "top", null);
                _utils.__defaultParam__(props, "bottom", null);
                _utils.__defaultParam__(props, "back", null);
                _utils.__defaultParam__(props, "front", null);
                _utils.__defaultParam__(props, "size", 300);
                _utils.__defaultParam__(props, "sizeSeg", 7);
                let textures = [props.right, props.left, props.top, props.bottom, props.back, props.front],
                    materials = [],
                    m = 10;
                for (let i = 0, len = textures.length; i < len; ++i) {
                    materials.push(new THREE.MeshBasicMaterial({
                        map: __getRes__(_cts.RES_TYPE_TEXTURES, textures[i]),
                        overdraw: 0.5
                    }));
                }
                var geometry = new THREE.BoxGeometry(m, m, m, m, m, m);
                geometry.scale(-1, 1, 1);
                var mesh = new THREE.Mesh(geometry, materials);
                for (var i = 0, l = mesh.geometry.vertices.length; i < l; i++) {
                    var vertex = mesh.geometry.vertices[i];
                    vertex.normalize();
                    vertex.multiplyScalar(props.size);
                }
                return mesh;
            },
            getEarth: function (props = {}) {
                _utils.__defaultParam__(props, "x", 0);
                _utils.__defaultParam__(props, "y", 0);
                _utils.__defaultParam__(props, "z", 0);
                _utils.__defaultParam__(props, "radius", 200);
                _utils.__defaultParam__(props, "widthSeg", 20);
                _utils.__defaultParam__(props, "heightSeg", 20);
                _utils.__defaultParam__(props, "surface", null);
                _utils.__defaultParam__(props, "bumpMap", null);
                _utils.__defaultParam__(props, "bumpScale", 10);
                _utils.__defaultParam__(props, "spec", null);
                _utils.__defaultParam__(props, "atmosphere", null);
                _utils.__defaultParam__(props, "opacity", 1);
                _utils.__defaultParam__(props, "ring", null);
                const GEO_RATIO = 1.0015696123057605;
                var earthGroup = new THREE.Group(),
                    labels = new THREE.Group();
                // build ring
                if (props.ring) {
                    // var res = __getRes__(_cts.RES_TYPE_TEXTURES, props.ring);
                    // var ringMaterial = new THREE.SpriteMaterial({
                    //     map: res,
                    //     color: 0xffffff
                    // }), ring = new THREE.Sprite(ringMaterial);
                    // ring.position.y = props.radius / 2;
                    // ring.scale.set(props.radius * 1.2, props.radius, 0);
                    // earthGroup.add(ring);
                }
                // build earth
                var sphere = new THREE.SphereGeometry(props.radius, props.widthSeg, props.heightSeg);
                sphere.computeVertexNormals();
                var material = new THREE.MeshPhongMaterial({
                    bumpMap: __getRes__(_cts.RES_TYPE_TEXTURES, props.bumpMap),
                    bumpScale: props.bumpScale,
                    specularMap: __getRes__(_cts.RES_TYPE_TEXTURES, props.spec),
                    specular: new THREE.Color('grey'),
                    transparent: true,
                    opacity: props.opacity,
                    map: __getRes__(_cts.RES_TYPE_TEXTURES, props.surface),
                    shininess: 60,
                    depthWrite: false
                });
                var earth = new THREE.Mesh(sphere, material);
                earthGroup.add(earth);
                // build atmosphere
                var atmosphereGeo = new THREE.SphereGeometry(props.radius * GEO_RATIO, props.widthSeg, props.heightSeg);
                var atMaterial = new THREE.MeshBasicMaterial({
                    map: __getRes__(_cts.RES_TYPE_TEXTURES, props.atmosphere),
                    transparent: true,
                    side: THREE.DoubleSide,
                    opacity: props.opacity,
                    depthWrite: false
                });
                var atmosphere = new THREE.Mesh(atmosphereGeo, atMaterial);
                earthGroup.add(atmosphere);
                // add labels
                earthGroup.add(labels);
                // add function to exert outside
                _utils.__addProperty__(earthGroup, "ltlg2xyz", function (lat, lon) {
                    return ltlg2xyz(lat, lon, earth);
                });
                _utils.__addProperty__(earthGroup, "getLabels", function () {
                    return labels;
                });
                _utils.__addProperty__(earthGroup, "addLabelToEarth", function (props = {}) {
                    _utils.__defaultParam__(props, "lon", 1);
                    _utils.__defaultParam__(props, "lat", 1);
                    _utils.__defaultParam__(props, "width", 1);
                    _utils.__defaultParam__(props, "height", 1);
                    _utils.__defaultParam__(props, "scale", 1.01);
                    _utils.__defaultParam__(props, "path", null);
                    _utils.__defaultParam__(props, "attr", {});
                    _utils.__defaultParam__(props, "change", null);
                    var worldPt = ltlg2xyz(props.lat, props.lon, atmosphere),
                        spriteMaterial = new THREE.SpriteMaterial({
                            map: __getRes__(_cts.RES_TYPE_TEXTURES, props.path),
                            color: 0xffffff
                        }),
                        sprite = new THREE.Sprite(spriteMaterial);
                    sprite.scale.set(props.width, props.height, 1.0);
                    sprite.position.x = worldPt.x * props.scale;
                    sprite.position.y = worldPt.y * props.scale;
                    sprite.position.z = worldPt.z * props.scale;
                    sprite.attr = props.attr;
                    labels.add(sprite);
                });
                _utils.__addProperty__(earthGroup, "addObjToSyncOrbit", function (props = {}) {
                    _utils.__defaultParam__(props, "lon", 1);
                    _utils.__defaultParam__(props, "lat", 1);
                    _utils.__defaultParam__(props, "scale", 1.5);
                    _utils.__defaultParam__(props, "item", null);
                    let worldPt = ltlg2xyz(props.lat, props.lon, atmosphere);
                    if (props.item.innerObj) {
                        let obj = props.item.innerObj;
                        obj.position.set(worldPt.x * props.scale, worldPt.y * props.scale, worldPt.z * props.scale);
                    }
                    props.item ? earthGroup.add(props.item) : null;
                });
                return earthGroup;
            },
            getItem: function (props = {}) {
                _utils.__defaultParam__(props, "x", 0);
                _utils.__defaultParam__(props, "y", 0);
                _utils.__defaultParam__(props, "z", 0);
                _utils.__defaultParam__(props, "scale", 1);
                _utils.__defaultParam__(props, "path", null);
                if (props.path) {
                    var object = null;
                    if (props.path.endsWith(".fbx")) {
                        object = __getRes__(_cts.RES_TYPE_MODELS, props.path);
                    } else if (props.path.endsWith(".gltf")) {
                        object = __getRes__(_cts.RES_TYPE_MODELS, props.path);
                        object.scene.children[0].position.set(props.x, props.y, props.z);
                        object.scene.children[0].rotateX(Math.PI / 2);
                        object.scene.children[0].scale.set(props.scale, props.scale, props.scale);
                        object = object.scene;
                        _utils.__addProperty__(object, "innerObj", object.children[0]);
                    }
                }
                return object;
            },
            getCliender: function (props = {}) {
                _utils.__defaultParam__(props, "radiusTop", 1);
                _utils.__defaultParam__(props, "radiusBottom", 1);
                _utils.__defaultParam__(props, "height", 1);
                _utils.__defaultParam__(props, "radialSegments", 1);
                _utils.__defaultParam__(props, "heightSegments", 1);
                _utils.__defaultParam__(props, "openEnded", 1);
                _utils.__defaultParam__(props, "thetaStart", 1);
                _utils.__defaultParam__(props, "thetaLength", 1);
                _utils.__defaultParam__(props, "color", 0xffff00);
                var geometry = new THREE.CylinderBufferGeometry(
                    props.radiusTop,
                    props.radiusBottom,
                    props.height,
                    props.radialSegments,
                    props.heightSegments,
                    props.openEnded,
                    props.thetaStart,
                    props.thetaLength
                ),
                    material = null;
                material = new THREE.MeshBasicMaterial({
                    color: props.color
                });
                return new THREE.Mesh(geometry, material);
            },
            getTerrain: function (props = {}) {
                _utils.__defaultParam__(props, "x", 0);
                _utils.__defaultParam__(props, "y", 0);
                _utils.__defaultParam__(props, "z", 0);
                _utils.__defaultParam__(props, "l", 1);
                _utils.__defaultParam__(props, "w", 1);
                _utils.__defaultParam__(props, "ratio", 1);
                _utils.__defaultParam__(props, "block", false);
                _utils.__defaultParam__(props, "recompute", true);
                _utils.__defaultParam__(props, "renderFrame", false);
                _utils.__defaultParam__(props, "receiveShadow", false);
                _utils.__defaultParam__(props, "castShadow", false);
                _utils.__defaultParam__(props, "depth", 5);
                _utils.__defaultParam__(props, "color", 0x2194ce);
                var geometry = [],
                    material = null,
                    elevation = [],
                    terrain = new THREE.Group(),
                    min = Infinity,
                    i = 0,
                    len = 0,
                    rl = props.l * props.ratio,
                    rw = props.w * props.ratio,
                    starts = [],
                    sideTable = ["top", "bottom", "front", "behind", "left", "right"];
                // generate geometry
                if (props.elevation) {
                    for (i = 0; i < 6; ++i) {
                        elevation[i] = new Array();
                    }
                    for (i = 0, len = props.elevation.length; i < len; ++i) {
                        var row = props.elevation[i];
                        row.forEach(function (x) {
                            min = min > x ? x : min;
                        });
                        elevation[0] = elevation[0].concat(row);
                        elevation[4].push(row[row.length - 1]);
                        elevation[5].push(row[0]);
                        if (i == 0) {
                            elevation[2] = row;
                        } else if (i == (len - 1)) {
                            elevation[3] = row.slice(0).reverse();
                            elevation[5].reverse();
                        }
                    }
                    geometry[0] = new THREE.PlaneBufferGeometry(
                        rl,
                        rw,
                        props.l - 1,
                        props.w - 1
                    );
                    geometry[0].rotateX(-Math.PI / 2);
                    starts[0] = 0;
                    if (props.block) {
                        var mh = (min - props.depth) * props.ratio;
                        // bottom
                        geometry[1] = new THREE.PlaneBufferGeometry(rl, rw);
                        geometry[1].rotateX(-(Math.PI * 3) / 2);
                        geometry[1].translate(0, mh, 0);
                        // front
                        geometry[2] = new THREE.PlaneBufferGeometry(rl, mh, props.l - 1, 1);
                        geometry[2].translate(0, mh / 2, -rl / 2);
                        starts[2] = props.l * 3;
                        // behind
                        geometry[3] = new THREE.PlaneBufferGeometry(rl, mh, props.l - 1, 1);
                        geometry[3].rotateY(Math.PI);
                        geometry[3].translate(0, mh / 2, rl / 2);
                        starts[3] = props.l * 3;
                        // left
                        geometry[4] = new THREE.PlaneBufferGeometry(rw, mh, props.w - 1, 1);
                        geometry[4].rotateY(-Math.PI / 2);
                        geometry[4].translate(rw / 2, mh / 2, 0);
                        starts[4] = props.w * 3;
                        //right
                        geometry[5] = new THREE.PlaneBufferGeometry(rw, mh, props.w - 1, 1);
                        geometry[5].rotateY(Math.PI / 2);
                        geometry[5].translate(-rw / 2, mh / 2, 0);
                        starts[5] = props.w * 3;
                    }
                    for (i = 0; i < 6; ++i) {
                        if (geometry[i] && elevation[i].length > 0) {
                            var vertices = geometry[i].attributes.position.array,
                                vlen = vertices.length,
                                elen = elevation[i].length;
                            for (var z = 0, j = starts[i]; z < vlen && z < elen; ++z, j += 3) {
                                vertices[j + 1] += elevation[i][z] * props.ratio;
                            }
                            if (props.recompute) {
                                geometry[i].attributes.position.needsUpdate = true;
                                geometry[i].computeVertexNormals();
                            }
                        }
                    }
                }
                // generate material
                for (i = 0; i < 6; ++i) {
                    if (geometry[i]) {
                        var side = sideTable[i],
                            sideColor = props["color_" + side],
                            meshName = props.mesh[side];
                        if (meshName) {
                            if (meshName) {
                                var texture = __getRes__(_cts.RES_TYPE_TEXTURES, meshName);
                                if (side === "top") {
                                    material = new THREE.MeshLambertMaterial({
                                        map: texture
                                    });
                                } else {
                                    texture.wrapS = THREE.RepeatWrapping;
                                    texture.wrapT = THREE.RepeatWrapping;
                                    texture.repeat.set(1, 1);
                                    material = new THREE.MeshBasicMaterial({
                                        map: texture
                                    });
                                }
                                material.wireframe = props.renderFrame;
                            }
                        } else if (i == 0 && elevation && elevation.length > 0) {
                            var texture = new THREE.CanvasTexture(__generateTexture__(
                                elevation,
                                props.l * props.ratio,
                                props.w * props.ratio));
                            texture.wrapS = THREE.ClampToEdgeWrapping;
                            texture.wrapT = THREE.ClampToEdgeWrapping;
                            material = new THREE.MeshBasicMaterial({
                                map: texture
                            });
                        } else {
                            material = new THREE.MeshBasicMaterial({
                                color: sideColor ? sideColor : props.color
                            });
                        }
                        var mesh = new THREE.Mesh(geometry[i], material);
                        props.receiveShadow && (mesh.receiveShadow = true);
                        props.castShadow && (mesh.castShadow = true);
                        terrain.get(mesh);
                    }
                }
                // final calculation
                terrain.position.x = props.x;
                terrain.position.y = props.y;
                terrain.position.z = props.z;
                return terrain;
            },
            getCube: function (props = {}) {
                _utils.__defaultParam__(props, "l", 1);
                _utils.__defaultParam__(props, "w", 1);
                _utils.__defaultParam__(props, "h", 1);
                _utils.__defaultParam__(props, "color", 0xffffff);
                var cubeGeometry = new THREE.BoxGeometry(props.l, props.w, props.h);
                var cubeMaterial = new THREE.MeshLambertMaterial({
                    color: props.color
                });
                return new THREE.Mesh(cubeGeometry, cubeMaterial);
            }
        }
    }

    return Producer;
});