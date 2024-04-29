import BarModel from "./Barn_Testing.glb";
import React, { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber/dist/declarations/src/three-types";
import {
  BoxGeometry,
  BufferGeometry,
  MeshBasicMaterial,
  TextureLoader,
} from "three";

export type WallGeometries = {
  [key: string]: {
    position: [number, number, number];
    size: [number, number, number];
  };
};

export type WallTexts = {
  [key: string]: string;
};

interface ModelProps {
  selectedWalls: string[];
  selectWall: (wallName: string) => void;
  wallGeometries: WallGeometries;
  wallTexts: WallTexts;
}

interface Node {
  name: string;
  geometry: BufferGeometry;
  material?: MeshBasicMaterial;
  mesh: React.MutableRefObject<any>;
}

export function Model(props: ModelProps): JSX.Element {
  const { nodes, materials } = useGLTF(BarModel);
  const [textures, setTextures] = useState<any>({});

  const isWallSelected = (wallName: string): boolean => {
    return props.selectedWalls.includes(wallName);
  };

  const generateSelectedWalls = () => {
    const textureLoader = new TextureLoader();
    const wallTextureMap = {};

    Object.keys(props.wallTexts).forEach((wallName) => {
      const text = props.wallTexts[wallName];
      textureLoader.load(
        `https://dummyimage.com/400x400/345a94/ffffff&text=${text}`,
        (texture) => {
          wallTextureMap[wallName] = texture;
          setTextures({ ...wallTextureMap });
        }
      );
    });
  };

  useEffect(() => {
    generateSelectedWalls();
  });

  return (
    <group scale={[0.008, 0.011, 0.01]}>
      {Object.entries(props.wallGeometries).map(
        ([wallName, { position, size }]) => (
          <group key={wallName}>
            <mesh
              geometry={new BoxGeometry(...size)}
              material={
                new MeshBasicMaterial({
                  map: textures[wallName],
                  visible: isWallSelected(wallName),
                })
              }
              position={position as Vector3}
            />
          </group>
        )
      )}
      {Object.entries(nodes).map(([name, node], index) => (
        <mesh
          key={index}
          geometry={(node as Node).geometry as BufferGeometry}
          material={materials[(node as Node).material?.name]}
          onClick={() => props.selectWall(name)}
          ref={(ref) => {
            ((node as Node).mesh as unknown) = ref;
          }}
        />
      ))}
    </group>
  );
}

useGLTF.preload(BarModel);
