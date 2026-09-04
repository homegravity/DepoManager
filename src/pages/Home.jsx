import ExperimentCard from "../components/experiment/ExperimentCard";


function Home() {


  const experiments = [

    {
      id: 1,
      device: "SOM",
      date: "2026.09.04",
      bottom: "TiN",
      layers: [
        "Se",
        "SiO₂",
        "Ru"
      ],
      memo: "O₂ 조건 변경 테스트"
    },


    {
      id: 2,
      device: "OTS",
      date: "2026.09.02",
      bottom: "Pt",
      layers: [
        "GeSe",
        "Ru"
      ],
      memo: "기존 조건 재현"
    }

  ];


  return (

    <div>


      <h1 className="
        text-2xl
        font-bold
        mb-4
      ">
        최근 실험 기록
      </h1>



      <div>

        {
          experiments.map((experiment)=>(

            <ExperimentCard
              key={experiment.id}
              experiment={experiment}
            />

          ))
        }


      </div>


    </div>

  )
}


export default Home;