import "./globals.css";



export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body className="w-full flex justify-center gap-4 items-center flex-col" >
        <div className="w-full flex bg-[var(--header)] h-16 p-4 items-center">
          <span className="text-white text-xl">Cryptocurrnecy</span>
        </div>
        <div className="w-full px-2">

        {children}
        </div>
      </body>
    </html>
  );
}
