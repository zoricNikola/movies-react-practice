// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";

function init() {
  // Sentry.init({
  //   dsn:
  //     "https://f3e68c4c59394b378c5e35b45c4456cf@o457330.ingest.sentry.io/5453145",
  //   integrations: [new Integrations.BrowserTracing()],
  //   // We recommend adjusting this value in production, or using tracesSampler
  //   // for finer control
  //   tracesSampleRate: 1.0,
  // });
}

function log(error) {
  // Sentry.captureException(error);
  console.error(error);
}

export default {
  init,
  log,
};
