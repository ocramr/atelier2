    Number.prototype.toRad = function() {
	return this * Math.PI / 180;
    }

    function distance(lat1, lat2, lon1, lon2) {
        var R = 6371000; // meter
        var Phi1 = lat1.toRad();
        var Phi2 = lat2.toRad();
        var DeltaPhi = (lat2 - lat1).toRad();
        var DeltaLambda = (lon2 - lon1).toRad();

        var a = Math.sin(DeltaPhi / 2) * Math.sin(DeltaPhi / 2)
                + Math.cos(Phi1) * Math.cos(Phi2) * Math.sin(DeltaLambda / 2)
                * Math.sin(DeltaLambda / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;

        return d;
    }