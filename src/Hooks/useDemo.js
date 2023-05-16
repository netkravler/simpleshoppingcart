import React, { useState } from "react";

const useDemo = (name) => {
  const [names, setNames] = useState(name);
  //content of functions

  return { names };
};

export default useDemo;
