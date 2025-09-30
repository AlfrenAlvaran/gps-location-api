import express from "express";
import requestIp from "request-ip";

const app = express();
app.set("trust proxy", true);

app.get("/location", async (req, res) => {
  const ip = requestIp.getClientIp(req).replace("::ffff:", "");
  const response = await fetch(`https://ipapi.co/${ip}/json/`);
  const data = await response.json();

  res.json({
    ip,
    latitude: data.latitude,
    longitude: data.longitude,
    city: data.city,
    country: data.country_name
  });
});

app.listen(3000, () => console.log("Express running on http://localhost:3000"));
