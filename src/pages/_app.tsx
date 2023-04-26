import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "@/utils/api";
import { WASMContextProvider } from "@/context/wasm_context_provider";

import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <WASMContextProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </WASMContextProvider>
  );
};

export default api.withTRPC(MyApp);
