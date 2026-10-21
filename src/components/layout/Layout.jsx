import { Outlet, useNavigate } from "react-router-dom";

function Layout() {
const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">


      {/* PC Sidebar */}
      <aside
        className="
          hidden
          md:flex
          fixed
          left-0
          top-0
          h-screen
          w-64
          bg-white
          border-r
          flex-col
          p-6
        "
      >

        <h1 className="text-xl font-bold">
          🧪 Depo Manager
        </h1>


        <nav className="mt-10 flex flex-col gap-5">

          <button
            onClick={() => navigate("/")}
            className="text-left"
          >
            📝 기록
          </button>

         <button
          onClick={() => navigate("/create")}
          className="
            text-left
            bg-blue-600
            text-white
            rounded-lg
            px-4
            py-3
            font-medium
          "
        >
          ＋ 새 실험
        </button>


         <button
          onClick={() => navigate("/devices")}
          className="text-left"
        >
          📚 소자
        </button>


          <button
        onClick={() => navigate("/recipes")}
        className="text-left"
      >
        🧪 저장 조건
      </button>



          <button
          onClick={() => navigate("/settings")}
          className="text-left"
        >
          ⚙ 설정
        </button>

        </nav>


      </aside>



      {/* Main Content */}
      <main
        className="
          p-4
          pb-20
          md:ml-64
        "
      >

        {/* Mobile Header */}
        <header
          className="
            md:hidden
            bg-white
            border-b
            p-4
            mb-4
          "
        >

          <h1 className="text-xl font-bold">
            🧪 Depo Manager
          </h1>

        </header>


        <div className="
                max-w-5xl
                mx-auto
                ">

                <Outlet />

                </div>


      </main>




        {/* Mobile Add Button */}

        <button
                onClick={() => navigate("/create")}
                className="
                    md:hidden
                    fixed
                    right-5
                    bottom-20
                    w-14
                    h-14
                    rounded-full
                    bg-blue-600
                    text-white
                    text-2xl
                    shadow-lg
                    flex
                    items-center
                    justify-center
                "
                >
                
                <span className="leading-none relative top+1.0">
  +
</span>

                </button>





      {/* Mobile Bottom Navigation */}
      <nav
        className="
          md:hidden
          fixed
          bottom-0
          left-0
          right-0
          bg-white
          border-t
          p-3
        "
      >

        <div className="
                flex
                justify-around
                items-center
                ">
          
          <button
            onClick={() => navigate("/")}
            className="
              flex
              flex-col
              items-center
              justify-center
            "
          >
            📝
            <span>
              기록
            </span>
          </button>


         <button
            onClick={() => navigate("/devices")}
            className="
              flex
              flex-col
              items-center
              justify-center
            "
          >
            📚
            <span>
              소자
            </span>
          </button>


        <button
          onClick={() => navigate("/recipes")}
          className="
            flex
            flex-col
            items-center
            justify-center
          "
        >
          🧪
          <span>
            저장 조건
          </span>
        </button>



              <button
                type="button"
                onClick={() => navigate("/settings")}
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                "
              >
                ⚙
                <span>
                  설정
                </span>
              </button>


          

        </div>

      </nav>


    </div>
  );
}

export default Layout;