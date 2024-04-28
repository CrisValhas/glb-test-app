import React, { useState } from "react";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Model, WallGeometries } from "./models/models.tsx";
import { Grid } from "@mui/material";
import Dropdown from "./components/dropdown.tsx";

export const wallTexts = {
  Front_Wall: "Front Wall",
  Back_Wall: "Back Wall",
  Right_Wall: "Right Wall",
  Left_Wall: "Left Wall",
};

const wallGeometries = {
  Front_Wall: {
    position: [0, 110, 380],
    size: [370, 180, 0],
  },
  Back_Wall: {
    position: [0, 110, -5],
    size: [370, 180, 0],
  },
  Right_Wall: {
    position: [205, 110, 188],
    size: [0, 180, 350],
  },
  Left_Wall: {
    position: [-205, 110, 188],
    size: [0, 180, 350],
  },
};

export default function App() {
  const [selectedWalls, setSelectedWalls] = useState<string[]>([]);

  const getWallName = (geometricName: string): string => {
    switch (geometricName) {
      case "Front_Wall":
        return "Frontal";
      case "Back_Wall":
        return "Trasera";
      case "Right_Wall":
        return "Derecha";
      case "Left_Wall":
        return "Izquierda";
      default:
        return "";
    }
  };

  const selectWall = (wallName: string) => {
    setSelectedWalls((prevSelectedWalls) => {
      if (prevSelectedWalls.includes(wallName)) {
        return prevSelectedWalls.filter((wall) => wall !== wallName);
      } else {
        return [...prevSelectedWalls, wallName];
      }
    });
  };

  return (
    <Grid container height={"100vh"} position={"relative"}>
      <Canvas
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <color attach="background" args={["#eee"]} />
        <Environment preset="studio" />
        <PerspectiveCamera makeDefault position={[8, 4, 8]} />
        <OrbitControls />
        <Model
          selectWall={selectWall}
          selectedWalls={selectedWalls}
          wallGeometries={wallGeometries as unknown as WallGeometries}
          wallTexts={wallTexts}
        />
        <ContactShadows />
      </Canvas>
      <Dropdown
        getLabelItem={getWallName}
        items={wallGeometries as unknown as WallGeometries}
        onChange={(e) => {
          const value = e.target.value;
          if (Array.isArray(value)) {
            setSelectedWalls(value);
          } else {
            setSelectedWalls([value]);
          }
        }}
        selectedItems={selectedWalls}
      />
    </Grid>
  );
}

