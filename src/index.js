// Load the rendering pieces we want to use (for both WebGL and WebGPU)
import '@kitware/vtk.js/Rendering/Profiles/All';

import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';

import vtk                  from '@kitware/vtk.js/vtk';
import vtkActor         from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkMapper            from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkVolume from '@kitware/vtk.js/Rendering/Core/Volume';
import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper';
import vtkPiecewiseFunction from '@kitware/vtk.js/Common/DataModel/PiecewiseFunction';
import vtkColorTransferFunction from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction';
import vtkCamera from '@kitware/vtk.js/Rendering/Core/Camera';
import vtkInteractorStyleManipulator from '@kitware/vtk.js/Interaction/Style/InteractorStyleManipulator';
import vtkMouseCameraTrackballRotateManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballRotateManipulator';
import vtkRenderWindowInteractor from '@kitware/vtk.js/Rendering/Core/RenderWindowInteractor';
import vtkHttpDataSetReader from '@kitware/vtk.js/IO/Core/HttpDataSetReader';
import vtkHttpSceneLoader from '@kitware/vtk.js/IO/Core/HttpSceneLoader';

// Force DataAccessHelper to have access to various data source
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HtmlDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/JSZipDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/LiteHttpDataAccessHelper';

const sceneJSON = require('../3Dscene/index.json');
const firstJSON = require('../3Dscene/1/index.json');
const secondJSON = require('../3Dscene/2/index.json');
const thirdJSON = require('../3Dscene/3/index.json');

console.log(sceneJSON);
console.log(firstJSON);

// ----------------------------------------------------------------------------
// Read JSON File
//
// setUrl(url): dataset을 불러올 url
// update(): 활성화된 모든 data 배열을 로딩
// getArray(): 사용 가능한 배열의 목록을 위치와 함께 반환. update method를 사용해 다운로드할 수
//             있는지 여부 반환
//             return: [{name, location, enable}, ...]
// getBlocks(): 데이터 로딩을 위한 블록과 블록의 상태를 나열.
//              return: { BlockName: {type: 'MultiBlock', enable: true, SubBlockName: }}
//              ex) { "Edget Blocks": { "enable": true }, SubBlockName: { type: 'UnstructuredGrid', enable: true } }
// enableArray(location, name, enable=true): 배열을 enable/disable
//                                           ex) reader.enableArray('pointData', 'Pressure', false);
// enableBlock(blockPath, enable=true, pathSeparater='.'): 블럭을 enable/disable
//                                                         ex) reader.enableBlock('Edge Sets', false);
// getOutputData(): 현재 상태의 dataset 반환
//                  return: {dataset}
// delete() : 메모리 반환 혹은 리스너 제거
// onBusy() : 데이터를 다운로딩 할 때 리스너 추가
// getBaseURL(): 데이터를 다운받을 url(폴더 경로) 반환
//               return: String
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance();
const renderer = fullScreenRenderer.getRenderer();
const renderWindow = fullScreenRenderer.getRenderWindow();

// const loader = vtkHttpSceneLoader.newInstance({
//   renderer,
//   fetchGzip: true,
// });
// loader.setUrl('../3Dscene');
// loader.onReady(() => {
//   renderWindow.render();
// });
const reader = vtkHttpDataSetReader.newInstance();
reader.setUrl(`../3Dscene`).then(() => {
  reader.loadData().then(() => {
    renderer.resetCamera();
    renderWindow.render();
  })
});
// ----------------------------------------------------------------------------
// Load JSON File as Actor code
// ----------------------------------------------------------------------------
const source = vtk(firstJSON);

// mapper
const mapper = vtkMapper.newInstance({ interpolateScalarsBeforeMapping: true });
mapper.setInputData(source);

// actor
const actor = vtkActor.newInstance();
actor.setMapper(mapper);
renderer.addActor(actor);

// camera
const camera = vtkCamera.newInstance();
renderer.setActiveCamera(camera);
camera.setFocalPoint(sceneJSON.camera.focalPoint);
camera.setPosition(sceneJSON.camera.position);
camera.setViewUp(sceneJSON.camera.viewUp);
renderer.resetCameraClippingRange();

// interaction
const interactor = vtkRenderWindowInteractor.newInstance();
const manipulator = vtkInteractorStyleManipulator.newInstance();
renderWindow.setInteractor(interactor);
interactor.setInteractorStyle(manipulator);
interactor.initialize();
const rotateManipulator = vtkMouseCameraTrackballRotateManipulator.newInstance();
rotateManipulator.setButton(1);
manipulator.addMouseManipulator(rotateManipulator);
manipulator.setCenterOfRotation(sceneJSON.centerOfRotation);

renderWindow.render();
