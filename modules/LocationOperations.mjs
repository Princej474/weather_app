import fs from "fs";
import path from "path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const readFileData = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, "weatherDb.txt"), "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
};

const writeFileData = (data) => {
  try {
    fs.writeFileSync(
      path.join(__dirname, "weatherDb.txt"),
      JSON.stringify(data)
    );
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = (location) => {
  const data = readFileData();
  let weatherData = data.find(
    (item) => item.location.name.toLowerCase() === location.toLowerCase()
  );
  return weatherData;
};

export const addLocation = (location, current) => {
  console.log(location, current);
  const data = readFileData();
  let isPresent = false;
  data.forEach((item) => {
    if (item.location.name === location.name) {
      isPresent = true;
    }
  });
  console.log(isPresent);
  if (!isPresent) {
    data.push({ location, current });
    console.log(data);
    writeFileData(data);
  }
};

export const updateLocation = (city, obj) => {
  const data = readFileData();
  let index = data.findIndex(
    (item) => item.location.name.toLowerCase() === city.toLowerCase()
  );
  if (index > -1) {
    data.splice(index, 1, obj);
    writeFileData(data);
  } else {
    console.log("City not found");
  }
};

export const deleteLocation = (city) => {
  const data = readFileData();

  let index = data.findIndex(
    (item) => item.location.name.toLowerCase() === city.toLowerCase()
  );
  if (index > -1) {
    data.splice(index, 1);
    writeFileData(data);
    console.log(data);
  } else {
    console.log("City not found");
  }
};

export const getAllCities = () => {
  const data = readFileData();

  let cities = [];
  data.forEach((item) => {
    cities.push(item.location.name);
  });
  return cities;
};
