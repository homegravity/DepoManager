import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function DeviceDetail() {

  const { deviceName } = useParams();

  const navigate = useNavigate();

  const [experiments, setExperiments] = useState([]);


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


  return (

    <div>

      <h1 className="text-2xl font-bold">
        {deviceName.toUpperCase()}
      </h1>

      <p className="text-sm text-gray-500 mt-1">
        기록 {experiments.length}개
      </p>


      <div className="mt-6 space-y-3">

        {experiments.map((experiment) => (

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

        ))}

      </div>

    </div>

  );

}


export default DeviceDetail;