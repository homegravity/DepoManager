import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function DeviceList() {

    const navigate = useNavigate();
  const [devices, setDevices] = useState([]);


  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem("experiments")
      ) || [];


    const grouped = {};


    saved.forEach((experiment) => {

      const deviceName =
  experiment.device?.trim();


if (!deviceName) {
  return;
}


// 그룹화용 키: 대소문자 무시
const deviceKey =
  deviceName.toLowerCase();


// 화면 표시용 이름: 대문자 통일
const displayName =
  deviceName.toUpperCase();


if (!grouped[deviceKey]) {

  grouped[deviceKey] = {
    key: deviceKey,
    name: displayName,
    count: 0,
  };

}


grouped[deviceKey].count += 1;

    });


    setDevices(
      Object.values(grouped)
    );

  }, []);



  return (

    <div>

      <h1 className="text-2xl font-bold">
        소자
      </h1>

      <p className="text-sm text-gray-500 mt-1">
        소자별 실험 기록을 확인할 수 있습니다.
      </p>



      <div className="mt-6 space-y-3">

        {devices.length === 0 ? (

          <div className="
            bg-white
            border
            rounded-xl
            p-5
            text-sm
            text-gray-500
          ">
            저장된 소자가 없습니다.
          </div>

        ) : (

          devices.map((device) => (

            <div
            key={device.key}
            onClick={() =>
              navigate(`/devices/${device.key}`)
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

              <h2 className="font-bold text-lg">
                {device.name}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                기록 {device.count}개
              </p>

            </div>

          ))

        )}

      </div>

    </div>

  );

}


export default DeviceList;