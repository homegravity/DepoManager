import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function DeviceList() {

    const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


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


    const filteredDevices =
    devices.filter((device) => {

      const keyword =
        searchTerm.trim().toLowerCase();

      if (!keyword) {
        return true;
      }

      return device.name
        .toLowerCase()
        .includes(keyword);

    });



  return (

    <div>

      <h1 className="text-2xl font-bold">
        소자
      </h1>

      <p className="text-sm text-gray-500 mt-1">
        소자별 실험 기록을 확인할 수 있습니다.
      </p>




      <div className="relative mt-5">

        <input
          type="text"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          placeholder="소자명 검색"
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

        {filteredDevices.length === 0 ? (

          <div className="
            bg-white
            border
            rounded-xl
            p-5
            text-sm
            text-gray-500
          ">

            {
              searchTerm.trim()
                ? "검색 결과가 없습니다."
                : "저장된 소자가 없습니다."
            }

          </div>

        ) : (

          filteredDevices.map((device) => (

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