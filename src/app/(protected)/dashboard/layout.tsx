"use client";
import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-[80px] bg-white shadow-md p-4">
        <Image src={"/assets/Logo.svg"} alt={`Logo`} width={32} height={32} />
        <br />
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <a href="#" className="block p-2 rounded hover:bg-gray-200">
                <Image
                  src={"/assets/quizIcon.svg"}
                  alt={`Logo`}
                  width={24}
                  height={24}
                />
              </a>
            </li>
            <li>
              <a href="#" className="block p-2 rounded hover:bg-gray-200">
                <Image
                  src={"/assets/otherIcon.svg"}
                  alt={`Logo`}
                  width={24}
                  height={24}
                />
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-[100px] bg-white shadow p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src={"/assets/quizHeaderIcon.svg"}
              alt={`Logo`}
              width={35}
              height={35}
            />
            <div className="font-inter font-bold text-[20px] leading-[24px] tracking-[-1.5%] capitalize ml-[10px]">
              Biology - Chapter 22: Evolution
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* <span className="text-gray-600">Time left: 00:18:54</span> */}
            <Image
              src={"/assets/avatar.svg"}
              alt={`Logo`}
              width={35}
              height={35}
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
