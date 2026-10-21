import { useState } from "react";


function LayerForm({
  layer,
  index,
  totalLayers,
  updateLayer,
  removeLayer,
  
  moveLayerUp,
  moveLayerDown,
}) {

  

  const [isSaved, setIsSaved] = useState(false);
  const [recipes, setRecipes] = useState([]);
const [showRecipes, setShowRecipes] = useState(false);


  const saveCondition = () => {

    const savedRecipes =
      JSON.parse(
        localStorage.getItem("depositionRecipes")
      ) || [];


    const material =
      layer.material?.trim() || "Material";


    const powerPart =
      layer.power
        ? `${layer.powerType}${layer.power}W`
        : layer.powerType || "";


    const arPart =
      layer.ar
        ? `Ar${layer.ar}`
        : "";


    const depoPart =
      layer.depoTime
        ? `${layer.depoTime}s`
        : "";


    const autoName =
      [
        material,
        powerPart,
        arPart,
        depoPart,
      ]
        .filter(Boolean)
        .join("_");


    const newRecipe = {

      id: Date.now() + Math.random(),

      name: autoName,

      material: layer.material,

      basePressureValue:
        layer.basePressureValue,

      basePressureExponent:
        layer.basePressureExponent,

      workingPressure:
        layer.workingPressure,

      ar: layer.ar,

      useO2: layer.useO2,

      o2: layer.o2,

      powerType: layer.powerType,

      power: layer.power,

      preTime: layer.preTime,

      depoTime: layer.depoTime,

    };

    



    localStorage.setItem(
      "depositionRecipes",
      JSON.stringify([
        ...savedRecipes,
        newRecipe,
      ])
    );


    setIsSaved(true);


    setTimeout(() => {
      setIsSaved(false);
    }, 1500);

  };


const openRecipes = () => {

  const savedRecipes =
    JSON.parse(
      localStorage.getItem("depositionRecipes")
    ) || [];

  setRecipes(savedRecipes);

  setShowRecipes((prev) => !prev);

};



const loadRecipe = (recipeId) => {

  const recipe =
    recipes.find(
      (item) =>
        item.id === Number(recipeId)
    );


  if (!recipe) {
    return;
  }


  updateLayer(
    layer.id,
    "material",
    recipe.material || ""
  );

  updateLayer(
    layer.id,
    "basePressureValue",
    recipe.basePressureValue || ""
  );

  updateLayer(
    layer.id,
    "basePressureExponent",
    recipe.basePressureExponent || ""
  );

  updateLayer(
    layer.id,
    "workingPressure",
    recipe.workingPressure || ""
  );

  updateLayer(
    layer.id,
    "ar",
    recipe.ar || ""
  );

  updateLayer(
    layer.id,
    "useO2",
    recipe.useO2 || false
  );

  updateLayer(
    layer.id,
    "o2",
    recipe.o2 || ""
  );

  updateLayer(
    layer.id,
    "powerType",
    recipe.powerType || "DC"
  );

  updateLayer(
    layer.id,
    "power",
    recipe.power || ""
  );

  updateLayer(
    layer.id,
    "preTime",
    recipe.preTime || ""
  );

  updateLayer(
    layer.id,
    "depoTime",
    recipe.depoTime || ""
  );


  setShowRecipes(false);

};


  return (

  



  
    <div className="border rounded-xl p-4 md:p-5 bg-gray-50">

      {/* 카드 상단 */}
      <div className="flex justify-between items-center mb-5">

  <h3 className="font-semibold">
    {index + 1}번째 증착층
  </h3>

  <div className="flex items-center gap-3">

    <button
      type="button"
      onClick={() => moveLayerUp(layer.id)}
      disabled={index === 0}
      className="
        text-sm
        text-gray-500
        disabled:text-gray-300
      "
    >
      ↑
    </button>

    <button
      type="button"
      onClick={() => moveLayerDown(layer.id)}
      disabled={index === totalLayers - 1}
      className="
        text-sm
        text-gray-500
        disabled:text-gray-300
      "
    >
      ↓
    </button>

    <button
        type="button"
        onClick={saveCondition}
        disabled={isSaved}
        className={
          isSaved
            ? "text-sm text-green-600"
            : "text-sm text-blue-600"
        }
      >
        {isSaved
          ? "✓ 저장됨"
          : "조건 저장"}
      </button>



    <button
      type="button"
      onClick={() => removeLayer(layer.id)}
      className="text-sm text-red-500"
    >
      삭제
    </button>

  </div>

</div>





          <div className="mb-5">

  <button
    type="button"
    onClick={openRecipes}
    className="
      w-full
      bg-white
      border
      border-gray-300
      rounded-lg
      px-4
      py-2.5
      text-sm
      font-medium
      text-gray-700
      hover:bg-gray-50
    "
  >
    기존 조건 불러오기
  </button>


  {showRecipes && (

    <div className="mt-2">

      {recipes.length === 0 ? (

        <p className="
          text-sm
          text-gray-500
          bg-white
          border
          rounded-lg
          p-3
        ">
          저장된 조건이 없습니다.
        </p>

      ) : (

        <select
          defaultValue=""
          onChange={(e) =>
            loadRecipe(e.target.value)
          }
          className="
            w-full
            bg-white
            border
            rounded-lg
            p-3
            text-sm
          "
        >

          <option value="" disabled>
            저장된 조건 선택
          </option>


          {recipes.map((recipe) => (

            <option
              key={recipe.id}
              value={recipe.id}
            >
              {recipe.name}
            </option>

          ))}

        </select>

      )}

    </div>

  )}

</div>



      <div className="space-y-6">

        {/* 기본 정보 */}
        <div>

          <h4 className="text-sm font-semibold mb-3">
            기본 정보
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="text-sm text-gray-600">
                층 종류
              </label>

              <select
                value={layer.type}
                onChange={(e) =>
                  updateLayer(
                    layer.id,
                    "type",
                    e.target.value
                  )
                }
                className="
                  mt-1
                  w-full
                  border
                  rounded-lg
                  p-2
                  bg-white
                "
              >
                <option value="middle">
                  중간층
                </option>

                <option value="top">
                  상부층
                </option>
              </select>
            </div>


            <div>
              <label className="text-sm text-gray-600">
                증착 물질
              </label>

              <input
                type="text"
                value={layer.material}
                onChange={(e) =>
                  updateLayer(
                    layer.id,
                    "material",
                    e.target.value
                  )
                }
                placeholder="예: Ru, Al2O3, Se"
                className="
                  mt-1
                  w-full
                  border
                  rounded-lg
                  p-2
                  bg-white
                "
              />
            </div>

          </div>

        </div>



        {/* Vacuum */}
        <div>

          <h4 className="text-sm font-semibold mb-3">
            Vacuum
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Base Pressure */}
            <div>

              <label className="text-sm text-gray-600">
                B.P
              </label>

              <div className="mt-1 flex items-center gap-2">

                <input
                  type="number"
                  step="any"
                  value={layer.basePressureValue}
                  onChange={(e) =>
                    updateLayer(
                      layer.id,
                      "basePressureValue",
                      e.target.value
                    )
                  }
                  placeholder="7.3"
                  className="
                    min-w-0
                    w-full
                    border
                    rounded-lg
                    p-2
                    bg-white
                  "
                />

                <span className="text-gray-500">
                  E
                </span>

                <input
                  type="number"
                  value={layer.basePressureExponent}
                  onChange={(e) =>
                    updateLayer(
                      layer.id,
                      "basePressureExponent",
                      e.target.value
                    )
                  }
                  placeholder="-6"
                  className="
                    w-20
                    border
                    rounded-lg
                    p-2
                    bg-white
                  "
                />

              </div>

              {layer.basePressureValue &&
                layer.basePressureExponent && (
                  <p className="mt-1 text-xs text-gray-400">
                    {layer.basePressureValue}
                    E
                    {layer.basePressureExponent}
                  </p>
                )}

            </div>


            {/* Working Pressure */}
            <div>

              <label className="text-sm text-gray-600">
                W.P
              </label>

              <div className="mt-1 flex items-center gap-2">

                <input
                  type="number"
                  step="any"
                  value={layer.workingPressure}
                  onChange={(e) =>
                    updateLayer(
                      layer.id,
                      "workingPressure",
                      e.target.value
                    )
                  }
                  placeholder="5"
                  className="
                    min-w-0
                    w-full
                    border
                    rounded-lg
                    p-2
                    bg-white
                  "
                />

                <span className="text-sm text-gray-500 whitespace-nowrap">
                  mTorr
                </span>

              </div>

            </div>

          </div>

        </div>



        {/* Gas */}
        <div>

          <h4 className="text-sm font-semibold mb-3">
            Gas
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Ar */}
            <div>

              <label className="text-sm text-gray-600">
                Ar
              </label>

              <div className="mt-1 flex items-center gap-2">

                <input
                  type="number"
                  step="any"
                  value={layer.ar}
                  onChange={(e) =>
                    updateLayer(
                      layer.id,
                      "ar",
                      e.target.value
                    )
                  }
                  placeholder="20"
                  className="
                    min-w-0
                    w-full
                    border
                    rounded-lg
                    p-2
                    bg-white
                  "
                />

                <span className="text-sm text-gray-500 whitespace-nowrap">
                  sccm
                </span>

              </div>

            </div>


            {/* O2 */}
            <div>

              <div className="flex items-center gap-2">

                <input
                  type="checkbox"
                  checked={layer.useO2}
                  onChange={(e) =>
                    updateLayer(
                      layer.id,
                      "useO2",
                      e.target.checked
                    )
                  }
                />

                <label className="text-sm text-gray-600">
                  O₂ 사용
                </label>

              </div>


              {layer.useO2 && (

                <div className="mt-2 flex items-center gap-2">

                  <input
                    type="number"
                    step="any"
                    value={layer.o2}
                    onChange={(e) =>
                      updateLayer(
                        layer.id,
                        "o2",
                        e.target.value
                      )
                    }
                    placeholder="5"
                    className="
                      min-w-0
                      w-full
                      border
                      rounded-lg
                      p-2
                      bg-white
                    "
                  />

                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    sccm
                  </span>

                </div>

              )}

            </div>

          </div>

        </div>



        {/* Power */}
        <div>

          <h4 className="text-sm font-semibold mb-3">
            Power
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>

              <label className="text-sm text-gray-600">
                방식
              </label>

              <select
                value={layer.powerType}
                onChange={(e) =>
                  updateLayer(
                    layer.id,
                    "powerType",
                    e.target.value
                  )
                }
                className="
                  mt-1
                  w-full
                  border
                  rounded-lg
                  p-2
                  bg-white
                "
              >
                <option value="DC">
                  DC
                </option>

                <option value="RF">
                  RF
                </option>
              </select>

            </div>


            <div>

              <label className="text-sm text-gray-600">
                Power
              </label>

              <div className="mt-1 flex items-center gap-2">

                <input
                  type="number"
                  step="any"
                  value={layer.power}
                  onChange={(e) =>
                    updateLayer(
                      layer.id,
                      "power",
                      e.target.value
                    )
                  }
                  placeholder="100"
                  className="
                    min-w-0
                    w-full
                    border
                    rounded-lg
                    p-2
                    bg-white
                  "
                />

                <span className="text-sm text-gray-500">
                  W
                </span>

              </div>

            </div>

          </div>

        </div>



        {/* Time */}
        <div>

          <h4 className="text-sm font-semibold mb-3">
            Time
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>

              <label className="text-sm text-gray-600">
                Pre
              </label>

              <div className="mt-1 flex items-center gap-2">

                <input
                  type="number"
                  step="any"
                  value={layer.preTime}
                  onChange={(e) =>
                    updateLayer(
                      layer.id,
                      "preTime",
                      e.target.value
                    )
                  }
                  placeholder="5"
                  className="
                    min-w-0
                    w-full
                    border
                    rounded-lg
                    p-2
                    bg-white
                  "
                />

                <span className="text-sm text-gray-500">
                  min
                </span>

              </div>

            </div>


            <div>

              <label className="text-sm text-gray-600">
                Depo
              </label>

              <div className="mt-1 flex items-center gap-2">

                <input
                  type="number"
                  step="any"
                  value={layer.depoTime}
                  onChange={(e) =>
                    updateLayer(
                      layer.id,
                      "depoTime",
                      e.target.value
                    )
                  }
                  placeholder="600"
                  className="
                    min-w-0
                    w-full
                    border
                    rounded-lg
                    p-2
                    bg-white
                  "
                />

                <span className="text-sm text-gray-500">
                  sec
                </span>

              </div>

            </div>

          </div>

        </div>



        {/* Memo */}
        <div>

          <label className="text-sm font-semibold">
            메모
          </label>

          <textarea
            value={layer.memo}
            onChange={(e) =>
              updateLayer(
                layer.id,
                "memo",
                e.target.value
              )
            }
            placeholder="이 증착층에 대한 메모"
            rows="3"
            className="
              mt-2
              w-full
              border
              rounded-lg
              p-3
              bg-white
              resize-none
            "
          />

        </div>

      </div>

    </div>
  );
}

export default LayerForm;