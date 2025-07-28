declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    STRIPE_SECRET_KEY: string;
    STRIPE_WEBHOOK_SECRET: string;
    BASE_URL: string;
    AUTH_SECRET: string;
    GOOGLE_GENERATIVE_AI_API_KEY: string;
  }
}