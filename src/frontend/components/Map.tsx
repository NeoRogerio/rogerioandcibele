import React, { Component } from "react";
import MyImage, { AssetType } from "../views/Figure";
import GoogleMapReact from "google-map-react";
// @ts-ignore
import Fade from "react-reveal/Fade";

type Props = {
  source: string;
  lat: number;
  lng: number;
};
const Image = ({ source }: Props) => (
  <div>
    <MyImage
      assetType={AssetType.IMAGE}
      source={source}
      style={{ width: 50, height: 50, borderRadius: "50%" }}
    />
  </div>
);

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 0
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <Fade  delay={60}>
        <div style={{ height: "79%", width: "100%", borderRadius: 8, minHeight: 300}}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAKVNh-hY3u16NrHXFfFLeHRa0undnjSJM"
            }}
            defaultZoom={14}
            defaultCenter={{
              lat: -1.3064117,
              lng: -47.9312966
            }}
          >
            <Image lat={-1.3064117} lng={-47.9312966} source={"emporio.png"} />
          </GoogleMapReact>
        </div>
      </Fade>
    );
  }
}

export default Map;
