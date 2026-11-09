import { Component, Suspense, useRef, useState } from "react";
import { hasWebGL, useInView } from "../hooks";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const webgl = typeof window !== "undefined" && hasWebGL();

/**
 * 3D sahnani ekranga birinchi marta yaqinlashganda yuklaydi.
 * Ekrandan chiqqanda sahna o'chirilmaydi, faqat chizish to'xtatiladi (active=false) —
 * bu batareya va protsessorni tejaydi. WebGL ishlamasa, fallback ko'rsatiladi.
 * children — funksiya: (active) => <Scene active={active} />
 */
const Lazy3D = ({ children, fallback = null, className = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, "200px");
  const [mounted, setMounted] = useState(false);
  if (inView && !mounted) setMounted(true);

  return (
    <div ref={ref} className={className}>
      {webgl ? (
        mounted && (
          <ErrorBoundary fallback={fallback}>
            <Suspense fallback={fallback}>{children(inView)}</Suspense>
          </ErrorBoundary>
        )
      ) : (
        fallback
      )}
    </div>
  );
};

export default Lazy3D;
