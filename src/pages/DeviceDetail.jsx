import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function DeviceDetail() {

  const { deviceName } = useParams();

  const navigate = useNavigate();

  const [experiments, setExperiments] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem("experiments")
      ) || [];


    const filtered = saved.filter((experiment) => {

      const name =
        experiment.device?.trim().toLowerCase();

      return name === deviceName.toLowerCase();

    });


    setExperiments(filtered.reverse());

  }, [deviceName]);



  const filteredExperiments =
  experiments.filter((experiment) => {

    const keyword =
      searchTerm.trim().toLowerCase();


    if (!keyword) {
      return true;
    }


    const bottom =
      experiment.bottom?.toLowerCase() || "";


    const layerMaterials =
      experiment.layers
        ?.map((layer) =>
          layer.material?.toLowerCase() || ""
        )
        .join(" ") || "";


    return (
      bottom.includes(keyword) ||
      layerMaterials.includes(keyword)
    );

  });


  return (

    <div>

      <h1 className="text-2xl font-bold">
        {deviceName.toUpperCase()}
      </h1>

      <p className="text-sm text-gray-500 mt-1">
        기록 {experiments.length}개
      </p>


<div className="relative mt-5">

  <input
    type="text"
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    placeholder="이 소자 내 재료 검색"
    className="
      w-full
      bg-white
      border
      rounded-xl
      pl-4
      pr-11
      py-3
      outline-none
      focus:ring-2
      focus:ring-blue-500
    "
  />


  {searchTerm && (

    <button
      type="button"
      onClick={() =>
        setSearchTerm("")
      }
      aria-label="검색어 지우기"
      className="
        absolute
        right-3
        top-1/2
        -translate-y-1/2
        w-7
        h-7
        flex
        items-center
        justify-center
        rounded-full
        text-gray-400
        hover:bg-gray-100
        hover:text-gray-700
      "
    >
      ×
    </button>

  )}

</div>
  

      <div className="mt-6 space-y-3">

  {filteredExperiments.length === 0 ? (

    <div
      className="
        bg-white
        border
        rounded-xl
        p-5
        text-sm
        text-gray-500
      "
    >
      {
        searchTerm.trim()
          ? "검색 결과가 없습니다."
          : "저장된 실험 기록이 없습니다."
      }
    </div>

  ) : (

    filteredExperiments.map((experiment) => (

      <div
        key={experiment.id}
        onClick={() =>
          navigate(`/experiment/${experiment.id}`)
        }
        className="
          bg-white
          border
          rounded-xl
          p-5
          cursor-pointer
          hover:bg-gray-50
        "
      >

        <p className="font-semibold">
          {experiment.date}
        </p>


        <p className="text-sm text-gray-500 mt-2">
          Bottom: {experiment.bottom || "-"}
        </p>


        <p className="text-sm text-gray-700 mt-1">
          Layers:{" "}

          {experiment.layers
            ?.map((layer) => layer.material)
            .join(" → ") || "-"
          }

        </p>

      </div>

    ))

  )}

</div>

    </div>

  );

}


export default DeviceDetail;