import { useEffect, useState } from "react";
import ExperimentCard from "../components/experiment/ExperimentCard";


function Home() {


  const [experiments, setExperiments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");


  const deleteExperiment = (id) => {

  const confirmDelete =
    window.confirm(
      "정말 이 실험 기록을 삭제하시겠습니까?"
    );


  if (!confirmDelete) {
    return;
  }


  const updated =
    experiments.filter(
      (experiment) =>
        experiment.id !== id
    );


  setExperiments(updated);


  localStorage.setItem(
    "experiments",
    JSON.stringify(updated)
  );

};


  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem("experiments")
      ) || [];


    setExperiments(saved.reverse());


  }, []);

  const filteredExperiments =
  experiments.filter((experiment) => {

    const keyword =
      searchTerm.trim().toLowerCase();


    const device =
      experiment.device?.toLowerCase() || "";

    const bottom =
      experiment.bottom?.toLowerCase() || "";

    const layerMaterials =
      experiment.layers
        ?.map((layer) =>
          layer.material?.toLowerCase() || ""
        )
        .join(" ") || "";


    // 글자 검색
    const matchesSearch =
      !keyword ||
      device.includes(keyword) ||
      bottom.includes(keyword) ||
      layerMaterials.includes(keyword);


    // 시작 날짜
    const matchesStartDate =
      !startDate ||
      experiment.date >= startDate;


    // 종료 날짜
    const matchesEndDate =
      !endDate ||
      experiment.date <= endDate;


    return (
      matchesSearch &&
      matchesStartDate &&
      matchesEndDate
    );

  });


  return (

    <div>


      <h1
        className="
          text-2xl
          font-bold
          mb-4
        "
      >
        최근 실험 기록
      </h1>


      <input
        type="text"
        value={searchTerm}
        onChange={(e) =>
          setSearchTerm(e.target.value)
        }
        placeholder="소자 또는 재료 검색"
        className="
          w-full
          bg-white
          border
          rounded-xl
          px-4
          py-3
          mb-5
          outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

      <div
  className="
    grid
    grid-cols-1
    sm:grid-cols-2
    gap-3
    mb-5
  "
>

  <div>

    <label className="text-xs text-gray-500">
      시작 날짜
    </label>

    <input
      type="date"
      value={startDate}
      onChange={(e) =>
        setStartDate(e.target.value)
      }
      className="
        w-full
        mt-1
        bg-white
        border
        rounded-xl
        px-4
        py-3
        outline-none
        focus:ring-2
        focus:ring-blue-500
      "
    />

  </div>


  <div>

    <label className="text-xs text-gray-500">
      종료 날짜
    </label>

    <input
      type="date"
      value={endDate}
      onChange={(e) =>
        setEndDate(e.target.value)
      }
      className="
        w-full
        mt-1
        bg-white
        border
        rounded-xl
        px-4
        py-3
        outline-none
        focus:ring-2
        focus:ring-blue-500
      "
    />

  </div>

    </div>

    {(startDate || endDate) && (

      <div className="flex justify-end mb-5">

        <button
          type="button"
          onClick={() => {
            setStartDate("");
            setEndDate("");
          }}
          className="
            text-sm
            text-gray-500
            hover:text-gray-800
          "
        >
          날짜 초기화
        </button>

      </div>

    )}


      {
          filteredExperiments.length === 0 ? (

            <p className="text-gray-500">

              {
                  searchTerm.trim() || startDate || endDate
                  ? "검색 결과가 없습니다."
                  : "아직 저장된 실험 기록이 없습니다."
              }

            </p>

          ) : (


          <div>

            {
              filteredExperiments.map((experiment)=>(

                <ExperimentCard
                  key={experiment.id}
                  experiment={experiment}
                  deleteExperiment={deleteExperiment}
                />

              ))
            }

          </div>


        )
      }


    </div>

  )
}


export default Home;