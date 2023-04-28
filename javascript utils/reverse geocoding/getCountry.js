import { allCountries } from "./countryGeo.js";

// public

const point_in_polygon = function (polygon, point) {
  var nvert = polygon.length;
  var c = false;
  var i = 0;
  var j = 0;
  for (i = 0, j = nvert - 1; i < nvert; j = i++) {
    if (
      polygon[i][1] > point[1] != polygon[j][1] > point[1] &&
      point[0] <
        ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1])) /
          (polygon[j][1] - polygon[i][1]) +
          polygon[i][0]
    ) {
      c = !c;
    }
  }
  return c;
};

export const get_country = function (lat, lng) {
  if (typeof lat !== "number" || typeof lng !== "number") {
    return new Error("Wrong coordinates (" + lat + "," + lng + ")");
  }

  var point = [lng, lat];
  var i = 0;
  var found = false;
  do {
    var country = allCountries[i];
    if (country.geometry.type === "Polygon") {
      found = point_in_polygon(country.geometry.coordinates[0], point);
    } else if (country.geometry.type === "MultiPolygon") {
      var j = 0;
      do {
        found = point_in_polygon(country.geometry.coordinates[j][0], point);
        j++;
      } while (j < country.geometry.coordinates.length && !found);
    }
    i++;
  } while (i < allCountries.length && !found);

  if (found) {
    return {
      code: allCountries[i - 1].id,
      name: allCountries[i - 1].properties.name,
    };
  } else {
    return null;
  }
};

//   fwk.method(that, "get_country", get_country, _super);
//   fwk.method(that, "get_us_state", get_us_state, _super);

//   return get_country;

// exports.country_reverse_geocoding = country_reverse_geocoding;
