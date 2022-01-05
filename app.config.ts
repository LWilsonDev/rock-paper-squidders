import "dotenv/config";

export default {
  extra: {
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingID: process.env.FIREBASE_MESSAGING_ID,
    firebaseAppID: process.env.FIREBASE_APP_ID,
    firebaseMeasurementID: process.env.FIREBASE_MEASUREMENT_ID,
    firebaseDatabaseURL: process.env.FIREBASE_DATABASE_URL,
  },
};
