import React from "react";
import {InfinitySpin} from 'react-loader-spinner'

const Loader = () => {
  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
      <InfinitySpin width="200" color="#4fa94d" />
    </div>
  );
};

export default Loader;

