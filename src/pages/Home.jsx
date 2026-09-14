import { useEffect, useState } from "react";
import ExperimentCard from "../components/experiment/ExperimentCard";


function Home() {


  const [experiments, setExperiments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


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


    if (!keyword) {
      return true;
    }


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


    return (
      device.includes(keyword) ||
      bottom.includes(keyword) ||
      layerMaterials.includes(keyword)
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



      {
        filteredExperiments.length === 0 ? (

          <p className="text-gray-500">
            아직 저장된 실험 기록이 없습니다.
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