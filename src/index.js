import "@kitware/vtk.js/Rendering/Profiles/All";

import vtkFullScreenRenderWindow from "@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow";

import vtk from '@kitware/vtk.js/vtk';
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkInteractor from '@kitware/vtk.js/Rendering/Core/RenderWindowInteractor';
import vtkHttpSceneLoader from '@kitware/vtk.js/IO/Core/HttpSceneLoader';
import vtkHttpDataSetReader from '@kitware/vtk.js/IO/Core/HttpDataSetReader';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HttpDataAccessHelper';

import { AttributeTypes } from '@kitware/vtk.js/Common/DataModel/DataSetAttributes/Constants';
import { FieldDataTypes } from '@kitware/vtk.js/Common/DataModel/DataSet/Constants';

import { sceneLoader } from './SceneLoader';
const API_URL = __API_URL__;

// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance();
const renderer = fullScreenRenderer.getRenderer();
const renderWindow = fullScreenRenderer.getRenderWindow();

// httpSceneLoader

const sceneImporter = vtkHttpSceneLoader.newInstance({ renderer });
sceneImporter.setUrl(`${API_URL}/3Dscene`);
sceneImporter.onReady( () => {
  // const scenes = sceneImporter.getScene();
  // for (scene of scenes) {
  //   const source = scene.source;
  //   const mapper = scene.mapper;
  //   mapper.setInputData(source.getOutputData());
  //   const actor = scene.actor;
  //   renderer.addActor(actor);
  //   console.log(scene);
  // }
  renderer.resetCamera();
  renderWindow.render();
});

