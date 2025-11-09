import { useRef, useEffect } from 'react';
import { morphSVG, morphLoop } from '@/scripts/svgMorph';
import SVG from '@/components/ui/svg-comp';

/**
 * Example 1: Simple morph using ref
 */
export function SimpleMorphExample() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      morphSVG(pathRef.current, 'M43.5 0 L87 43.5 L43.5 87 L0 43.5 Z', {
        duration: 2000,
        easing: 'easeInOutQuad',
        loop: true,
        direction: 'alternate'
      }).catch(console.error);
    }
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-xl mb-4">Simple Morph (Star → Diamond)</h2>
      <SVG 
        svgName="Star-3" 
        scale="100" 
        pathRef={pathRef}
        className="text-border"
      />
    </div>
  );
}

/**
 * Example 2: Morph loop with multiple shapes
 */
export function MorphLoopExample() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (pathRef.current) {
      const paths = [
        // Star
        'M47.2502 36.3242L43.007 0.5625L38.7732 36.2454L23.2272 23.9435L35.3338 39.3772L0 43.5695L35.6768 47.8026L23.1427 63.642L38.8261 51.3396L43.007 86.5766L47.1879 51.3396L62.8413 63.7265L50.3491 47.8012L86.0141 43.5695L50.7711 39.3879L62.9258 24.0279L47.2502 36.3242Z',
        // Diamond
        'M43.5 0 L87 43.5 L43.5 87 L0 43.5 Z',
        // Circle approximation
        'M43.5 0 C67.524 0 87 19.476 87 43.5 C87 67.524 67.524 87 43.5 87 C19.476 87 0 67.524 0 43.5 C0 19.476 19.476 0 43.5 0 Z'
      ];

      morphLoop(pathRef.current, paths, {
        duration: 1500,
        easing: 'easeInOutSine'
      }).catch(console.error);
    }
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-xl mb-4">Morph Loop (Star → Diamond → Circle)</h2>
      <SVG 
        svgName="Star-3" 
        scale="100" 
        pathRef={pathRef}
        className="text-foreground"
      />
    </div>
  );
}

/**
 * Example 3: Using ID selector
 */
export function MorphWithIdExample() {
  useEffect(() => {
    morphSVG('#flower-morph', 'M 128 0 L 256 128 L 128 256 L 0 128 Z', {
      duration: 2000,
      easing: 'easeInOutElastic(1, .6)',
      loop: true,
      direction: 'alternate'
    }).catch(console.error);
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-xl mb-4">Morph with ID Selector</h2>
      <SVG 
        svgName="Flower-2" 
        scale="100" 
        pathId="flower-morph"
        className="text-primary"
      />
    </div>
  );
}

/**
 * Example 4: Interactive morph on hover
 */
export function InteractiveMorphExample() {
  const pathRef = useRef<SVGPathElement>(null);

  const handleMouseEnter = () => {
    if (pathRef.current) {
      morphSVG(pathRef.current, 'M43.5 10 L77 43.5 L43.5 77 L10 43.5 Z', {
        duration: 500,
        easing: 'easeOutElastic(1, .8)'
      }).catch(console.error);
    }
  };

  const handleMouseLeave = () => {
    if (pathRef.current) {
      morphSVG(pathRef.current, 'M47.2502 36.3242L43.007 0.5625L38.7732 36.2454L23.2272 23.9435L35.3338 39.3772L0 43.5695L35.6768 47.8026L23.1427 63.642L38.8261 51.3396L43.007 86.5766L47.1879 51.3396L62.8413 63.7265L50.3491 47.8012L86.0141 43.5695L50.7711 39.3879L62.9258 24.0279L47.2502 36.3242Z', {
        duration: 500,
        easing: 'easeOutElastic(1, .8)'
      }).catch(console.error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl mb-4">Interactive Morph (Hover me!)</h2>
      <div 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer"
      >
        <SVG 
          svgName="Star-3" 
          scale="100" 
          pathRef={pathRef}
          className="text-accent-foreground transition-colors hover:text-primary"
        />
      </div>
    </div>
  );
}

/**
 * Combined demo component
 */
export default function MorphingSVGDemo() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold mb-8">SVG Morphing Examples</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SimpleMorphExample />
        <MorphLoopExample />
        <MorphWithIdExample />
        <InteractiveMorphExample />
      </div>
    </div>
  );
}
