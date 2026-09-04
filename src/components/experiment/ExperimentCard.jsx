function ExperimentCard({ experiment }) {
  return (
    <div className="
      bg-white
      rounded-xl
      shadow-sm
      border
      p-4
      mb-4
    ">

      <div className="flex justify-between items-center">

        <h2 className="text-lg font-bold">
          {experiment.device}
        </h2>

        <span className="text-sm text-gray-500">
          {experiment.date}
        </span>

      </div>


      <div className="mt-3 text-sm text-gray-700">

        <p>
          Bottom:
          <span className="font-medium ml-2">
            {experiment.bottom}
          </span>
        </p>


        <p className="mt-2">
          Layers:
        </p>


        <div className="mt-1">
          {experiment.layers.join(" → ")}
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