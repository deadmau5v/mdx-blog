import LoaderLink from "@/components/nav/custom-link";
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col gap-6">
        <h2 className="font-bold text-lg">404 Not Found</h2>
        <p>抱歉，您访问的页面不存在</p>
        <LoaderLink isButton={false} url="/">
          <span className="cursor-pointer text-xl">返回首页</span>
        </LoaderLink>
      </div>
    </main>
  );
}
