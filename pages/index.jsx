import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null)
  const router = useRouter()

  const handleCardClick = (href) => {
    router.push(href)
  }

  return (
    <>
      <Head>
        <title>Conway's Game of Life</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="container">
        <main>
          <h1 className="title">
            Welcome to Conway's<br /><span className="highlight">Game of Life</span>
          </h1>

          <div className="grid">
            {[
              { title: "Play", href: "/game", description: "A Web Application which simulates Conway's Game of Life." },
              { title: "Learn", href: "/learn", description: "Read and learn more about the game, its history and its implications." },
              { title: "Source", href: "#", description: "See the source code behind this application here on Github." },
              { title: "About", href: "https://github.com/AnishSarkar22", description: "Find out more about the people behind this application." }
            ].map((card, index) => (
              <div 
                key={index}
                className={`card ${hoveredCard === index ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(card.href)}
              >
                <h3>{card.title} &rarr;</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </main>

        <footer>
          <p>Powered by NextJS, Material-UI and Vercel</p>
        </footer>
      </div>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 2rem;
        }

        main {
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
          text-align: center;
        }

        .title {
          margin: 2rem 0 2rem;
          line-height: 1.15;
          font-size: 3.3rem;
          font-weight: 700;
          text-align: center;
          color: #2d3748;
        }

        .highlight {
          color: #0abd80;
          background: linear-gradient(180deg, rgba(10,189,128,0) 50%, rgba(10,189,128,0.2) 50%);
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          width: 100%;
          margin-top: 3.5rem;
        }

        .card {
          padding: 1.5rem;
          text-align: left;
          color: #2d3748;
          text-decoration: none;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          transition: all 0.3s ease;
          background-color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }

        .card.hovered {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
          font-weight: 600;
          color: #0abd80;
        }

        .card p {
          margin: 0;
          font-size: 1rem;
          line-height: 1.5;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 2rem;
        }

        footer p {
          font-size: 0.9rem;
          color: #718096;
        }

        @media (max-width: 600px) {
          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;

        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </>
  )
}