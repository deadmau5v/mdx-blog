import Link from "next/link";

export function Footer() {
  return (
    <footer className=" bottom-0 z-40 w-full border-t bg-background p-6 ">
      <div className="sm:px-8 px-4 flex flex-col justify-between items-center h-16 space-y-4 sm:space-y-0">
        <div className="flex gap-6 items-center">
          <div className="">
            ©2023 - {new Date().getFullYear()}{" "}
            <span className="font-bold">
              <span className="primary-color">Deadmau5v</span>Blog
            </span>{" "}
          </div>
        </div>
        <nav className="flex gap-4 items-center text-sm">
          <Link href="https://beian.miit.gov.cn/#/Integrated/index">
            湘ICP备2023023816号-1
          </Link>
        </nav>
      </div>
    </footer>
  );
}
