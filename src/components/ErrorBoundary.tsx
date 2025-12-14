import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  message?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Tablet error boundary', error, errorInfo);
  }

  reset = (): void => this.setState({ hasError: false, message: undefined });

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-6">
          <div className="max-w-md w-full bg-slate-900/70 border border-red-500/40 rounded-2xl p-8 shadow-tablet">
            <p className="text-lg font-semibold text-red-300 mb-2">Se produjo un error</p>
            <p className="text-sm text-slate-200 mb-4">
              {this.state.message || 'Algo salió mal. Intente recargar la tablet.'}
            </p>
            <button
              className="w-full rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-500 transition"
              type="button"
              onClick={this.reset}
            >
              Reintentar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
