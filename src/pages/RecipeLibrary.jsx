import { useEffect, useState } from "react";


function RecipeLibrary() {

  const [recipes, setRecipes] = useState([]);


  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem("depositionRecipes")
      ) || [];


    setRecipes([...saved].reverse());

  }, []);





  const deleteRecipe = (id) => {

  const confirmDelete =
    window.confirm(
      "이 저장 조건을 삭제하시겠습니까?"
    );


  if (!confirmDelete) {
    return;
  }


  const updated =
    recipes.filter(
      (recipe) =>
        recipe.id !== id
    );


  setRecipes(updated);


  localStorage.setItem(
    "depositionRecipes",
    JSON.stringify(updated)
  );

};



const renameRecipe = (id) => {

  const target =
    recipes.find(
      (recipe) => recipe.id === id
    );


  if (!target) {
    return;
  }


  const newName =
    window.prompt(
      "저장 조건 이름을 입력하세요.",
      target.name
    );


  // 취소 누른 경우
  if (newName === null) {
    return;
  }


  const trimmedName =
    newName.trim();


  // 빈 이름 방지
  if (!trimmedName) {
    alert("이름을 입력해주세요.");
    return;
  }


  const updated =
    recipes.map((recipe) =>

      recipe.id === id
        ? {
            ...recipe,
            name: trimmedName,
          }
        : recipe

    );


  setRecipes(updated);


  localStorage.setItem(
    "depositionRecipes",
    JSON.stringify(updated)
  );

};


  return (

    <div>

      <h1 className="text-2xl font-bold">
        저장 조건
      </h1>

      <p className="text-sm text-gray-500 mt-1">
        저장해둔 증착 조건을 확인할 수 있습니다.
      </p>



      <div className="mt-6 space-y-4">

        {recipes.length === 0 ? (

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
            저장된 증착 조건이 없습니다.
          </div>

        ) : (

          recipes.map((recipe) => (

            <div
              key={recipe.id}
              className="
                bg-white
                border
                rounded-xl
                p-5
              "
            >

              <div className="flex justify-between items-start gap-4">

  <div className="min-w-0">

    <h2 className="text-lg font-bold break-words">
      {recipe.name}
    </h2>

    <p className="text-sm text-gray-500 mt-1">
      {recipe.material || "재료 미입력"}
    </p>

  </div>


  <div className="flex gap-3 shrink-0">

    <button
      type="button"
      onClick={() =>
        renameRecipe(recipe.id)
      }
      className="
        text-sm
        text-blue-600
        hover:text-blue-800
      "
    >
      이름 수정
    </button>


    <button
      type="button"
      onClick={() =>
        deleteRecipe(recipe.id)
      }
      className="
        text-sm
        text-red-500
        hover:text-red-700
      "
    >
      삭제
    </button>

  </div>

</div>


              <div
                className="
                  grid
                  grid-cols-2
                  md:grid-cols-4
                  gap-3
                  mt-4
                "
              >

                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    B.P
                  </p>

                  <p className="text-sm font-medium mt-1">
                    {
                      recipe.basePressureValue &&
                      recipe.basePressureExponent
                        ? `${recipe.basePressureValue}E${recipe.basePressureExponent}`
                        : "-"
                    }
                  </p>

                </div>


                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    W.P
                  </p>

                  <p className="text-sm font-medium mt-1">
                    {
                      recipe.workingPressure
                        ? `${recipe.workingPressure} mTorr`
                        : "-"
                    }
                  </p>

                </div>


                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Power
                  </p>

                  <p className="text-sm font-medium mt-1">
                    {
                      recipe.power
                        ? `${recipe.powerType} ${recipe.power} W`
                        : "-"
                    }
                  </p>

                </div>


                <div className="bg-gray-50 rounded-lg p-3">

                  <p className="text-xs text-gray-500">
                    Depo
                  </p>

                  <p className="text-sm font-medium mt-1">
                    {
                      recipe.depoTime
                        ? `${recipe.depoTime} sec`
                        : "-"
                    }
                  </p>

                </div>

              </div>


              <div className="mt-4 text-sm text-gray-600">

                <span>
                  Ar: {recipe.ar || "-"} sccm
                </span>

                <span className="mx-2">
                  ·
                </span>

                <span>
                  O₂:{" "}
                  {
                    recipe.useO2
                      ? `${recipe.o2 || "-"} sccm`
                      : "사용 안 함"
                  }
                </span>

                <span className="mx-2">
                  ·
                </span>

                <span>
                  Pre: {recipe.preTime || "-"} min
                </span>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

}


export default RecipeLibrary;