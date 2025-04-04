"use client";
import { useQuizContext } from "@/providers/QuizProvider";
import Image from "next/image";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { quizId, topic } = useQuizContext();
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-[80px] bg-white shadow-md p-4">
        <Link href="/" className="block p-2 rounded hover:bg-gray-200">
          <Image src={"/assets/Logo.svg"} alt={`Logo`} width={32} height={32} />
        </Link>
        <br />
        <nav className="mt-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard/quiz"
                className="block p-2 rounded hover:bg-gray-200"
              >
                <Image
                  src={"/assets/quizIcon.svg"}
                  alt={`Quiz Icon`}
                  width={24}
                  height={24}
                />
              </Link>
            </li>
            <li>
              <Link href="#" className="block p-2 rounded hover:bg-gray-200">
                <Image
                  src={"/assets/otherIcon.svg"}
                  alt={`Logo`}
                  width={24}
                  height={24}
                />
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-[#F9F9F9]">
        {/* Header */}
        <header className="h-[100px] bg-[#F9F9F9] shadow p-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src={"/assets/quizHeaderIcon.svg"}
              alt={`Logo`}
              width={35}
              height={35}
            />
            <div className="font-inter font-bold text-[20px] leading-[24px] tracking-[-1.5%] capitalize ml-[10px]">
              {`${topic} : ${quizId}`}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Image
              src={"/assets/avatar.svg"}
              alt={`Logo`}
              width={35}
              height={35}
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
