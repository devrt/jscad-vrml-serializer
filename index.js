////////////////////////////////////////////
// VRML Export
////////////////////////////////////////////

const mimeType = 'application/vrml';

function serialize(data, options) {
    var result = "#VRML V2.0 utf8\n\n";
    result += "Shape {\n";
    result += "geometry IndexedFaceSet {\n";
    result += "coord Coordinate {\n";
    result += "point [\n";
    data.polygons.map(function(p) {
        if (p.vertices.length < 3)
            return;
        for (var i = 0; i < p.vertices.length; i++) {
            var vertex = p.vertices[i];
            result += vertex.pos._x.toString() + " " +
                vertex.pos._y.toString() + " " +
                vertex.pos._z.toString() + ",\n";
        }
    });
    result += "]\n";
    result += "}\n";
    result += "coordIndex [\n";
    var n = 0;
    data.polygons.map(function(p) {
        if (p.vertices.length < 3)
            return;
        for (var i = 0; i < p.vertices.length - 2; i++) {
            result += (n) + ", " +
                (n + i + 1) + ", " +
                (n + i + 2) + " -1,\n";
        }
        n += p.vertices.length;
    });
    result += "]\n";
    result += "color Color {\n";
    result += "color [\n";
    data.polygons.map(function(p) {
        if (p.vertices.length < 3)
            return;
        var r = 1,
            g = 0.4,
            b = 1,
            a = 1,
            colorSet = false;
        if (p.shared && p.shared.color) {
            r = p.shared.color[0];
            g = p.shared.color[1];
            b = p.shared.color[2];
            a = p.shared.color[3];
            colorSet = true;
        }
        else if (p.color) {
            r = p.color[0];
            g = p.color[1];
            b = p.color[2];
            if (p.color.length() > 3) a = p.color[3];
            colorSet = true;
        }
        for (var i = 0; i < p.vertices.length; i++) {
            result += r + " " +
                g + " " +
                b + ",\n";
        }
    });
    result += "]\n";
    result += "}\n";
    result += "colorIndex [\n";
    n = 0;
    data.polygons.map(function(p) {
        if (p.vertices.length < 3)
            return;
        for (var i = 0; i < p.vertices.length - 2; i++) {
            result += (n) + ", " +
                (n + i + 1) + ", " +
                (n + i + 2) + " -1,\n";
        }
        n += p.vertices.length;
    });
    result += "]\n";
    result += "colorPerVertex TRUE\n";
    result += "}\n";
    result += "}\n";
    return [result];
}

module.exports = {
    serialize,
    mimeType
};