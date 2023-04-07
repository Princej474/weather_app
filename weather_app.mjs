import {
    addLocation,
    updateLocation,
    getWeatherData,
    deleteLocation,
    getAllCities,
  } from "./modules/LocationOperations.mjs";
  import http from "http";
  import url from "url";
  
  function getDataFromRoutes(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    if (path === "/get-weather") {
      let q = parsedUrl.query;
  
      if (q.city !== undefined) {
        let data = getWeatherData(q.city);
        if (data !== undefined) {
          res.write(JSON.stringify(data));
          res.end();
        } else {
          res.write(JSON.stringify({ message: "city not found" }));
          res.end();
        }
      }
    }
    if (path === "/get-all-cities") {
      res.write(JSON.stringify(getAllCities()));
      res.end();
    }
  }
  
  const server = http.createServer((req, res) => {
    try {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.writeHead(200, { "Content-Type": "text/plain" });
  
      getDataFromRoutes(req, res);
    } catch (err) {
      console.log(err);
    }
  });
  
  server.listen(5000);