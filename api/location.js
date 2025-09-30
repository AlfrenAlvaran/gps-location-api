import requestIp from "request-ip";

export default async function handler(req, res) {
  try {
    let ip = requestIp.getClientIp(req) || "";
    ip = ip.replace("::ffff:", "");

    const url =
      ip === "127.0.0.1"
        ? "https://ipapi.co/json/"
        : `https://ipapi.co/${ip}/json/`;

    const response = await fetch(url);
    const data = await response.json();

    res.status(200).json({
      ip,
      latitude: data.latitude,
      longitude: data.longitude,
      city: data.city,
      country: data.country_name,
       source: "ip",
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch location" });
  }
}
