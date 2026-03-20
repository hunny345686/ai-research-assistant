export async function getWeather(city: string) {
  return {
    city: city,
    temperature: "28°C",
    condition: "Barish Ho rhi hai",
  };
}
