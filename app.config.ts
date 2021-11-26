import "dotenv/config";

export default {
  extra: {
    pusherApiKey: process.env.PUSHER_API_KEY,
    appCluster: process.env.APP_CLUSTER,
    ngrokUrl: process.env.NGROK_URL,
  },
};
