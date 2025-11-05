import PusherJS from "pusher-js";

const socketClient = new PusherJS("vaithuhay-soketi-key", {
  cluster: "eu-west-1",
  wsHost: "103.20.96.135",
  wsPort: 6001,
  forceTLS: false,
  authEndpoint: `${import.meta.env.VITE_BASE_URL}/pusher/auth`,

  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  },
  encrypted: true,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
});

export default socketClient;
