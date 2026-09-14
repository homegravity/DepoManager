import { useNavigate } from "react-router-dom";


function ExperimentCard({
  experiment,
  deleteExperiment
}) {


  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(`/experiment/${experiment.id}`)
      }
      className="
        bg-white
        rounded-xl
        shadow-sm
        border
        p-5
        mb-4
        cursor-pointer
      "
    >

    



      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-lg font-bold">
            {experiment.device}
          </h2>

          <span className="text-sm text-gray-500">
            {experiment.date}
          </span>

        </div>


        <button
          onClick={(e) => {

            e.stopPropagation();

            deleteExperiment(experiment.id);

          }}
          className="
            text-sm
            text-red-500
          "
        >
          삭제
        </button>


      </div>


     <div className="mt-4 text-sm text-gray-700">


  {/* Top Layer */}

  {
    experiment.layers.filter(
      (layer) => layer.type === "top"
    ).length > 0 && (

      <div className="mb-4">

        <p className="text-xs text-gray-500 mb-1">
          Top Layer
        </p>

        <div className="
          font-medium
          bg-gray-50
          rounded-lg
          p-2
        ">

          {
            experiment.layers
              .filter(
                (layer) => layer.type === "top"
              )
              .map((layer) => layer.material)
              .join(" → ")
          }

        </div>

      </div>

    )
  }



  {/* Middle Layer */}

  {
    experiment.layers.filter(
      (layer) => layer.type === "middle"
    ).length > 0 && (

      <div className="mb-4">

        <p className="text-xs text-gray-500 mb-1">
          Middle Layer
        </p>


        <div className="
          font-medium
          bg-gray-50
          rounded-lg
          p-2
        ">

          {
            experiment.layers
              .filter(
                (layer) => layer.type === "middle"
              )
              .map((layer) => layer.material)
              .join(" → ")
          }

        </div>

      </div>

    )
  }



  {/* Bottom */}

  <div>

    <p className="text-xs text-gray-500 mb-1">
      Bottom Layer
    </p>


    <div className="
      font-medium
      bg-gray-50
      rounded-lg
      p-2
    ">

      {experiment.bottom}

    </div>

  </div>


</div>


      {
        experiment.memo &&
        (
          <div className="
            mt-3
            text-sm
            text-gray-500
            bg-gray-50
            rounded-lg
            p-2
          ">
            📝 {experiment.memo}
          </div>
        )
      }


    </div>
  )
}


export default ExperimentCard