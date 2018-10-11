// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/4.9/esri/copyright.txt for details.
//>>built
define("require exports ../../config ../../core/kebabDictionary ../../core/wgs84Constants ./WKIDUnitConversion".split(" "),function(v,b,l,r,t,u){function m(a){return n.fromJSON(a.toLowerCase())||null}function f(a){return h(a)||b.decDegToMeters}function h(a){var c,b,d;a&&("object"===typeof a?(c=a.wkid,b=a.wkt):"number"===typeof a?c=a:"string"===typeof a&&(b=a));c?d=g.values[g[c]]:b&&-1!==b.search(/^PROJCS/i)&&(a=p.exec(b))&&a[1]&&(d=parseFloat(a[1].split(",")[1]));return d}function k(a){var b,e,d;
a&&("object"===typeof a?(b=a.wkid,e=a.wkt):"number"===typeof a?b=a:"string"===typeof a&&(e=a));b?d=g.units[g[b]]:e&&-1!==e.search(/^PROJCS/i)&&(a=p.exec(e))&&a[1]&&(d=(a=/[\\"\\']{1}([^\\"\\']+)/.exec(a[1]))&&a[1]);return d?m(d):null}function q(a,c){c=f(c);return a/(c*b.inchesPerMeter*l.screenDPI)}Object.defineProperty(b,"__esModule",{value:!0});b.inchesPerMeter=39.37;b.decDegToMeters=t.wgs84Radius*Math.PI/180;var p=/UNIT\[([^\]]+)\]\]$/i,g=u,n=r.strict()({meter:"meters",foot:"feet",foot_us:"us-feet",
foot_clarke:"clarke-feet",yard_clarke:"clarke-yards",link_clarke:"clarke-links",yard_sears:"sears-yards",foot_sears:"sears-feet",chain_sears:"sears-chains",chain_benoit_1895_b:"benoit-1895-b-chains",yard_indian:"indian-yards",yard_indian_1937:"indian-1937-yards",foot_gold_coast:"gold-coast-feet",chain_sears_1922_truncated:"sears-1922-truncated-chains","50_kilometers":"50-kilometers","150_kilometers":"150-kilometers"});b.unitFromRESTJSON=m;b.unitToRESTJSON=function(a){return n.toJSON(a)||null};b.getMetersPerVerticalUnitForSR=
function(a){a=f(a);return 1E5<a?1:a};b.getVerticalUnitStringForSR=function(a){return 1E5<f(a)?"meters":k(a)};b.getMetersPerUnitForSR=f;b.getMetersPerUnit=h;b.getUnitString=k;b.getDefaultUnitSystem=function(a){if(!a)return null;switch(k(a)){case "feet":case "us-feet":case "clarke-feet":case "clarke-yards":case "clarke-links":case "sears-yards":case "sears-feet":case "sears-chains":case "benoit-1895-b-chains":case "indian-yards":case "indian-1937-yards":case "gold-coast-feet":case "sears-1922-truncated-chains":return"imperial";
case "50-kilometers":case "150-kilometers":case "meters":return"metric"}return null};b.getScale=function(a,c){c=c||a.extent;a=a.width;var e=h(c&&c.spatialReference);return c&&a?c.width/a*(e||b.decDegToMeters)*b.inchesPerMeter*l.screenDPI:0};b.getResolutionForScale=q;b.getExtentForScale=function(a,b){var c=a.extent;a=a.width;b=q(b,c.spatialReference);return c.clone().expand(b*a/c.width)}});