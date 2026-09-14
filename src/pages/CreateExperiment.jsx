import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LayerForm from "../components/experiment/LayerForm";
import { useSearchParams } from "react-router-dom";



function CreateExperiment() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const editId = searchParams.get("id");

  // 오늘 날짜를 YYYY-MM-DD 형식으로 만들기
  const getToday = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // 실험 기본 정보
  const [experiment, setExperiment] = useState({
    date: getToday(),
    device: "",
    bottom: "",
    layers: [],
  });



  useEffect(() => {

  if (!editId) {
    return;
  }


  const saved =
    JSON.parse(
      localStorage.getItem("experiments")
    ) || [];


  const found =
    saved.find(
      (item) =>
        item.id === Number(editId)
    );


  if (found) {
    setExperiment(found);
  }


}, [editId]);





  // 입력값이 바뀔 때 실행
  const handleChange = (e) => {
    const { name, value } = e.target;

    setExperiment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };










  
  const addLayer = () => {
  const newLayer = {
    id: Date.now() + Math.random(),

    type: "middle",
    material: "",

    basePressureValue: "",
    basePressureExponent: "",

    workingPressure: "",

    ar: "",

    useO2: false,
    o2: "",

    powerType: "DC",
    power: "",

    preTime: "",
    depoTime: "",

    memo: "",
  };

  setExperiment((prev) => ({
    ...prev,
    layers: [...prev.layers, newLayer],
  }));
};


const updateLayer = (id, field, value) => {
  setExperiment((prev) => ({
    ...prev,
    layers: prev.layers.map((layer) =>
      layer.id === id
        ? { ...layer, [field]: value }
        : layer
    ),
  }));
};


const removeLayer = (id) => {
  setExperiment((prev) => ({
    ...prev,
    layers: prev.layers.filter((layer) => layer.id !== id),
  }));
};


const saveExperiment = () => {

  const saved =
    JSON.parse(
      localStorage.getItem("experiments")
    ) || [];


  let updated;



  // 수정 모드
  if (editId) {


    updated = saved.map((item) =>

      item.id === Number(editId)

        ? {
            ...experiment,
            id: Number(editId),
          }

        : item

    );


  } 
  
  // 새 작성 모드
  else {


    const newExperiment = {

      ...experiment,

      id: Date.now(),

    };


    updated = [

      ...saved,

      newExperiment,

    ];


  }



  localStorage.setItem(

    "experiments",

    JSON.stringify(updated)

  );


  navigate("/");

};

const copyLayer = (id) => {
  setExperiment((prev) => {
    const targetIndex = prev.layers.findIndex((layer) => layer.id === id);

    if (targetIndex === -1) {
      return prev;
    }

    const copiedLayer = {
      ...prev.layers[targetIndex],
      id: Date.now() + Math.random(),
    };

    const newLayers = [...prev.layers];

    newLayers.splice(
      targetIndex + 1,
      0,
      copiedLayer
    );

    return {
      ...prev,
      layers: newLayers,
    };
  });
};


const moveLayerUp = (id) => {
  setExperiment((prev) => {
    const index = prev.layers.findIndex((layer) => layer.id === id);

    if (index <= 0) {
      return prev;
    }

    const newLayers = [...prev.layers];

    [newLayers[index - 1], newLayers[index]] = [
      newLayers[index],
      newLayers[index - 1],
    ];

    return {
      ...prev,
      layers: newLayers,
    };
  });
};


const moveLayerDown = (id) => {
  setExperiment((prev) => {
    const index = prev.layers.findIndex((layer) => layer.id === id);

    if (index === -1 || index >= prev.layers.length - 1) {
      return prev;
    }

    const newLayers = [...prev.layers];

    [newLayers[index], newLayers[index + 1]] = [
      newLayers[index + 1],
      newLayers[index],
    ];

    return {
      ...prev,
      layers: newLayers,
    };
  });
};


  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        새 실험 기록
      </h1>


      {/* 기본 정보 */}
      <section className="bg-white rounded-xl border p-5 mb-5">

        <h2 className="font-bold mb-4">
          기본 정보
        </h2>


        <div className="space-y-4">

          {/* 날짜 */}
          <div>
            <label className="text-sm text-gray-600">
              날짜
            </label>

            <input
              type="date"
              name="date"
              value={experiment.date}
              onChange={handleChange}
              className="
                mt-1
                w-full
                border
                rounded-lg
                p-2
              "
            />
          </div>


          {/* 소자 종류 */}
          <div>
            <label className="text-sm text-gray-600">
              소자 종류
            </label>

            <input
              type="text"
              name="device"
              value={experiment.device}
              onChange={handleChange}
              placeholder="예: SOM, OTS, SRC"
              className="
                mt-1
                w-full
                border
                rounded-lg
                p-2
              "
            />
          </div>


          {/* 하부층 */}
          <div>
            <label className="text-sm text-gray-600">
              하부층 물질
            </label>

            <input
              type="text"
              name="bottom"
              value={experiment.bottom}
              onChange={handleChange}
              placeholder="예: TiN"
              className="
                mt-1
                w-full
                border
                rounded-lg
                p-2
              "
            />
          </div>

        </div>

      </section>


      {/* 증착층 */}
<section className="bg-white rounded-xl border p-5 mb-5">

  <div className="flex justify-between items-center mb-4">

    <div>
      <h2 className="font-bold">
        증착층
      </h2>

      <p className="text-sm text-gray-500 mt-1">
        실제 증착 순서대로 추가해주세요.
      </p>
    </div>

    <button
      type="button"
      onClick={addLayer}
      className="text-blue-600 text-sm font-medium"
    >
      + 추가
    </button>

  </div>


  {experiment.layers.length === 0 ? (

    <p className="text-sm text-gray-500">
      아직 추가된 증착층이 없습니다.
    </p>

  ) : (

    <div className="space-y-4">

      {experiment.layers.map((layer, index) => (

        <LayerForm
        key={layer.id}
        layer={layer}
        index={index}
        totalLayers={experiment.layers.length}
        updateLayer={updateLayer}
        removeLayer={removeLayer}
        copyLayer={copyLayer}
        moveLayerUp={moveLayerUp}
        moveLayerDown={moveLayerDown}
      />
      ))}

        </div>

  )}


  <button
    type="button"
    onClick={addLayer}
    className="
      mt-4
      w-full
      border
      border-dashed
      border-gray-300
      rounded-xl
      py-3
      text-sm
      font-medium
      text-gray-600
      hover:bg-gray-50
    "
  >
    + 증착층 추가
  </button>


</section>






      {/* 저장 */}
      <button
        onClick={saveExperiment}
        className="
          w-full
          bg-blue-600
          text-white
          rounded-xl
          py-3
          font-bold
        "
      >
        저장하기
      </button>

    </div>
  );
}

export default CreateExperiment;