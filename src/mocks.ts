import { OgpData } from "./types";

export const mockOgpData: OgpData = {
  pageUrl: "https://beta.reactjs.org/learn/state-as-a-snapshot",
  title: "State as a Snapshot",
  description: "A JavaScript library for building user interfaces",
  faviconUrl: "https://beta.reactjs.org/favicon.ico",
  ogImgUrl: "https://beta.reactjs.org/logo-og.png",
};

export const mockOgpData1: OgpData = {
  pageUrl: "https://beta.reactjs.org/learn/state-as-a-snapshot",
  title:
    "State variables might look like regular JavaScript variables that you can read and write to. However, state behaves more like a snapshot. Setting it does not change the state variable you already have, but instead triggers a re-render.",
  description: "A JavaScript library for building user interfaces",
  faviconUrl: "https://beta.reactjs.org/favicon.ico",
  ogImgUrl: "https://beta.reactjs.org/logo-og.png",
};

export const mockOgpData2: OgpData = {
  pageUrl: "https://beta.reactjs.org/learn/state-as-a-snapshot",
  title: "State as a Snapshot",
  description:
    "State variables might look like regular JavaScript variables that you can read and write to. However, state behaves more like a snapshot. Setting it does not change the state variable you already have, but instead triggers a re-render.",
  faviconUrl: "",
  ogImgUrl: "",
};

export const mockOgpDataList = [mockOgpData, mockOgpData1, mockOgpData2];
