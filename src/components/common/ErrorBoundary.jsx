import { Component } from 'react'
import { Link } from 'react-router-dom'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error('[ErrorBoundary]', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#07080C] px-6">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-2xl border border-red-500/20 bg-red-500/5">
              <svg
                className="h-10 w-10 text-red-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h1 className="font-mono text-2xl font-bold text-white">
              Something went wrong
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              An unexpected error occurred while rendering this page.
              This has been logged for investigation.
            </p>

            {this.state.error && (
              <details className="mt-4 rounded-lg border border-white/10 bg-white/5 p-4 text-left">
                <summary className="cursor-pointer font-mono text-xs text-gray-500">
                  Error details
                </summary>
                <pre className="mt-2 overflow-x-auto whitespace-pre-wrap font-mono text-xs text-red-300">
                  {this.state.error.message || 'Unknown error'}
                </pre>
              </details>
            )}

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/20 hover:bg-white/5"
                onClick={() => {
                  this.setState({ hasError: false, error: null })
                  window.location.reload()
                }}
                type="button"
              >
                Reload Page
              </button>
              <Link
                className="rounded-lg border border-[#9AA4FF]/30 px-5 py-2.5 text-sm font-medium text-[#9AA4FF] transition-colors hover:bg-[#9AA4FF]/10"
                to="/"
                onClick={() => this.setState({ hasError: false, error: null })}
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
