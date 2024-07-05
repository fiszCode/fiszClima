// Los css se agregan solo acá y son globales para todos los modulitos

import '@/styles/clima.css';
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
