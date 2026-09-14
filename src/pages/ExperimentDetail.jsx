import {
  useParams,
  useNavigate
} from "react-router-dom";
import { useEffect, useState } from "react";



function ExperimentDetail() {


  const { id } = useParams();
  const navigate = useNavigate();


  const [experiment, setExperiment] = useState(null);



  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem("experiments")
      ) || [];


    const found =
      saved.find(
        (item) =>
          item.id === Number(id)
      );


    setExperiment(found);


  }, [id]);



  if (!experiment) {

    return (
      <div>
        기록을 찾을 수 없습니다.
      </div>
    );

  }


  return (

  <div>


    {/* 제목 */}

    <div className="flex justify-between items-start">

  <div>

    <h1
      className="
        text-2xl
        font-bold
      "
    >
      {experiment.device}
    </h1>


    <p className="text-sm text-gray-500 mt-1">
      {experiment.date}
    </p>

  </div>


<button
  onClick={() =>
    navigate(`/create?id=${experiment.id}`)
  }
  className="
    text-sm
    text-blue-600
  "
>
  수정
</button>


</div>


    {/* 구조 */}

    <div
      className="
        bg-white
        border
        rounded-xl
        p-5
        mt-5
      "
    >

      <h2 className="font-bold mb-4">
        구조
      </h2>


      {
        experiment.layers.filter(
          (layer) => layer.type === "top"
        ).length > 0 && (

          <div className="mb-4">

            <p className="text-xs text-gray-500">
              TOP
            </p>

            <p className="font-medium">
              {
                experiment.layers
                  .filter(
                    (layer) => layer.type === "top"
                  )
                  .map(
                    (layer) => layer.material
                  )
                  .join(" → ")
              }
            </p>

          </div>

        )
      }



      {
        experiment.layers.filter(
          (layer) => layer.type === "middle"
        ).length > 0 && (

          <div className="mb-4">

            <p className="text-xs text-gray-500">
              MIDDLE
            </p>

            <p className="font-medium">
              {
                experiment.layers
                  .filter(
                    (layer) => layer.type === "middle"
                  )
                  .map(
                    (layer) => layer.material
                  )
                  .join(" → ")
              }
            </p>

          </div>

        )
      }



      <div>

        <p className="text-xs text-gray-500">
          BOTTOM
        </p>

        <p className="font-medium">
          {experiment.bottom}
        </p>

      </div>


    </div>






          {/* 증착 조건 */}

    <div className="mt-6">

      <h2 className="text-lg font-bold mb-4">
        증착 조건
      </h2>


      <div className="space-y-4">

        {experiment.layers.map((layer, index) => (

          <div
            key={layer.id}
            className="
              bg-white
              border
              rounded-xl
              p-5
            "
          >

            {/* 층 제목 */}
            <div className="flex justify-between items-start mb-5">

              <div>

                <p className="text-xs text-gray-500">
                  {index + 1}번째 증착층
                </p>

                <h3 className="text-lg font-bold mt-1">
                  {layer.material || "물질 미입력"}
                </h3>

              </div>


              <span className="
                text-xs
                bg-gray-100
                px-2
                py-1
                rounded-md
                text-gray-600
              ">
                {layer.type === "top"
                  ? "상부층"
                  : "중간층"}
              </span>

            </div>



            {/* Vacuum */}
            <div className="mb-5">

              <p className="text-sm font-semibold mb-2">
                Vacuum
              </p>

              <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
              ">

                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    B.P
                  </p>

                  <p className="font-medium mt-1">
                    {
                      layer.basePressureValue !== "" &&
                      layer.basePressureExponent !== ""
                        ? `${layer.basePressureValue}E${layer.basePressureExponent}`
                        : "-"
                    }
                  </p>

                </div>


                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    W.P
                  </p>

                  <p className="font-medium mt-1">
                    {
                      layer.workingPressure !== ""
                        ? `${layer.workingPressure} mTorr`
                        : "-"
                    }
                  </p>

                </div>

              </div>

            </div>



            {/* Gas */}
            <div className="mb-5">

              <p className="text-sm font-semibold mb-2">
                Gas
              </p>

              <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
              ">

                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Ar
                  </p>

                  <p className="font-medium mt-1">
                    {
                      layer.ar !== ""
                        ? `${layer.ar} sccm`
                        : "-"
                    }
                  </p>

                </div>


                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    O₂
                  </p>

                  <p className="font-medium mt-1">
                    {
                      layer.useO2
                        ? `${layer.o2 || "-"} sccm`
                        : "사용 안 함"
                    }
                  </p>

                </div>

              </div>

            </div>



            {/* Power */}
            <div className="mb-5">

              <p className="text-sm font-semibold mb-2">
                Power
              </p>

              <div className="bg-gray-50 rounded-lg p-3">

                <p className="text-xs text-gray-500">
                  {layer.powerType}
                </p>

                <p className="font-medium mt-1">
                  {
                    layer.power !== ""
                      ? `${layer.power} W`
                      : "-"
                  }
                </p>

              </div>

            </div>



            {/* Time */}
            <div>

              <p className="text-sm font-semibold mb-2">
                Time
              </p>

              <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
              ">

                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Pre
                  </p>

                  <p className="font-medium mt-1">
                    {
                      layer.preTime !== ""
                        ? `${layer.preTime} min`
                        : "-"
                    }
                  </p>

                </div>


                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Depo
                  </p>

                  <p className="font-medium mt-1">
                    {
                      layer.depoTime !== ""
                        ? `${layer.depoTime} sec`
                        : "-"
                    }
                  </p>

                </div>

              </div>

            </div>



            {/* 층 메모 */}
            {
              layer.memo && (

                <div className="
                  mt-5
                  border-t
                  pt-4
                  text-sm
                  text-gray-600
                ">
                  📝 {layer.memo}
                </div>

              )
            }

          </div>

        ))}

      </div>

    </div>




    {/* 메모 */}

    {
      experiment.memo && (

        <div
          className="
            bg-gray-50
            rounded-xl
            p-4
            mt-4
            text-sm
          "
        >

          📝 {experiment.memo}

        </div>

      )
    }


  </div>

)
  

}

export default ExperimentDetail;