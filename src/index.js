import "@kitware/vtk.js/Rendering/Profiles/All";

import vtkFullScreenRenderWindow from "@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow";

import vtk from "@kitware/vtk.js/vtk";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";
import vtkCalculator from "@kitware/vtk.js/Filters/General/Calculator";
import vtkConeSource from "@kitware/vtk.js/Filters/Sources/ConeSource";
import vtkJSONReader from "@kitware/vtk.js/IO/Misc/JSONReader";
import vtkHttpDataSetReader from "@kitware/vtk.js/IO/Core/HttpDataSetReader";
import "@kitware/vtk.js/IO/Core/DataAccessHelper/HttpDataAccessHelper";

import { AttributeTypes } from "@kitware/vtk.js/Common/DataModel/DataSetAttributes/Constants";
import { FieldDataTypes } from "@kitware/vtk.js/Common/DataModel/DataSet/Constants";

const API_URL = __API_URL__;
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

const reader = vtkHttpDataSetReader.newInstance({ fetchpGzip: true });
reader.setUrl(`${API_URL}/3Dscene/1`).then(() => {
  reader.loadData().then(() => {
    renderer.resetCamera();
    renderWindow.render();
  })
});
// ----------------------------------------------------------------------------
// Load JSON File as Actor code
// ----------------------------------------------------------------------------

// source
const source = reader.getOutputPort();

// mapper
const mapper = vtkMapper.newInstance();
mapper.setInputData(source);

// actor
const actor = vtkActor.newInstance();
actor.setMapper(mapper);
renderer.addActor(actor);

// fetch(`${API_URL}/3scene`)
//   .then((response) => {
//     console.log(response.status);
//     return response.json();
//   })
//   .then((json) => {
//     console.log("json", json, json.name);
//   })
//   .catch((err) => console.error(err));
