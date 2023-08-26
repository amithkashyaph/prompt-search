import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metaData = {
    title: "AI Promopt Application",
    description: "Discover and Share AI prompts"
}

function RootLayout({ children }) {
  return (
    <html lang="en">
        <Provider>
            <body>
                <div className="main">
                    <div className="main" />
                </div>
                <main className="app">
                    <Nav />
                    {children}
                </main>
            </body>
        </Provider>
    </html>
  )
}

export default RootLayout