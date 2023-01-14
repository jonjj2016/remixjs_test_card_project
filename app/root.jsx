import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from '@remix-run/react'
import styles from '~/styles/main.css'

export const meta = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
})
import MainNavigation from './components/MainNavigation'

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <MainNavigation />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
export const CatchBoundary = () => {
  const caughtResponse = useCatch()
  const message = caughtResponse.data?.message || 'Data Not Found'
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>An Error occurred</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main className="error">
          <h1>{message}</h1>
          <p>{caughtResponse.statusText}</p>
          <p>
            Back To Main <Link to="/">Main</Link>
          </p>
        </main>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
export const ErrorBoundary = ({ error }) => {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>An Error occurred</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main>
          <h1 className="info-message">An Error Occurred</h1>
          <p className="info-message">{error.message}</p>
          <p>
            Back To Main <Link to="/">Main</Link>
          </p>
        </main>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}
