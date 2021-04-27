import "../styles/globals.css";
import "./../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../styles/icon.css";
import store from "./../components/redux/store";

//
import { Provider } from "react-redux";
import Axios from "axios";
import { SWRConfig } from "swr";

import { AppProps /*, AppContext */ } from "next/app";
import dynamic from "next/dynamic";

Axios.defaults.baseURL = process.env.NEXT_PUBLIC_PUBLIC_URL;
Axios.defaults.withCredentials = true;

const fetcher = async (url: string) => {
  try {
    const res = await Axios.get(url);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        dedupingInterval: 10000,
      }}
    >
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SWRConfig>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
