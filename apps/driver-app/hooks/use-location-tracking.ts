// Example usage in a location-tracking hook
import MQTTClient from "../services/mqtt-client";

const client = new MQTTClient("unique-client-id");
client.connect(
  () => console.log("MQTT Connected!"),
  (error) => console.error("MQTT Connection Error:", error)
);

// Publish location
client.publishLocation(37.7749, -122.4194); // Replace with actual coordinates
