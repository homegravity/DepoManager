import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b p-4">
        <h1 className="text-xl font-bold">
          🧪 Depo Manager
        </h1>
      </header>


      {/* Page Content */}
      <main className="p-4">
        <Outlet />
      </main>


      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t p-3">
        <div className="flex justify-around">

          <button>
            📝 기록
          </button>

          <button>
            📚 소자
          </button>

          <button>
            ⚙ 설정
          </button>

        </div>
      </nav>

    </div>
  );
}

export default Layout;