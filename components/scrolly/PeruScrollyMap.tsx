'use client';


import { useEffect, useRef, useState } from 'react';
import { Application, Assets, Container, Sprite, Graphics, Text } from 'pixi.js';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { regions, type Region } from '../../lib/data/regions';
import './peru-scrolly-map.css';

gsap.registerPlugin(ScrollTrigger);

const ACCENT = 0xb91c1c;

type MarkerItem = {
  region: Region;
  dot: Graphics;
  pulse: Graphics;
  label: Text;
  glow: Graphics;
};

type ParticleItem = {
  node: Graphics;
};

export default function PeruScrollyMap() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const appRef = useRef<Application | null>(null);
  const sceneRef = useRef<Container | null>(null);
  const mapSpriteRef = useRef<Sprite | null>(null);
  const markerLayerRef = useRef<Container | null>(null);
  const particleLayerRef = useRef<Container | null>(null);

  const markersRef = useRef<MarkerItem[]>([]);
  const particlesRef = useRef<ParticleItem[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRegionRef = useRef<Region>(regions[0]);

  const [activeRegion, setActiveRegion] = useState<Region>(regions[0]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'image-error' | 'error'>('loading');

  useEffect(() => {
    let destroyed = false;

    const killOwnedScrollTriggers = () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };

    const killTimeline = () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };

    const destroyMarkers = () => {
      markersRef.current.forEach(({ dot, pulse, label, glow }) => {
        dot.destroy();
        pulse.destroy();
        label.destroy();
        glow.destroy();
      });
      markersRef.current = [];
    };

    const destroyParticles = () => {
      particlesRef.current.forEach(({ node }) => {
        node.destroy();
      });
      particlesRef.current = [];
    };

    const setMarkerState = (regionId: string) => {
      markersRef.current.forEach(({ region, dot, label, pulse, glow }) => {
        const active = region.id === regionId;

        gsap.to(dot.scale, {
          x: active ? 1.35 : 1,
          y: active ? 1.35 : 1,
          duration: 0.28,
          overwrite: true,
        });

        gsap.to(dot, {
          alpha: active ? 1 : 0.42,
          duration: 0.28,
          overwrite: true,
        });

        gsap.to(label, {
          alpha: active ? 1 : 0.38,
          duration: 0.28,
          overwrite: true,
        });

        gsap.to(pulse, {
          alpha: active ? 0.7 : 0.16,
          duration: 0.28,
          overwrite: true,
        });

        gsap.to(glow.scale, {
          x: active ? 1.8 : 1,
          y: active ? 1.8 : 1,
          duration: 0.35,
          overwrite: true,
        });

        gsap.to(glow, {
          alpha: active ? 0.22 : 0.05,
          duration: 0.35,
          overwrite: true,
        });
      });
    };

    const updateActiveRegion = (region: Region) => {
      activeRegionRef.current = region;
      setActiveRegion(region);
      setMarkerState(region.id);

      if (panelRef.current) {
        gsap.fromTo(
          panelRef.current,
          { y: 18, opacity: 0.65 },
          { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }
        );
      }
    };

    const placeMap = () => {
      const mapSprite = mapSpriteRef.current;
      const canvasHost = canvasHostRef.current;
      if (!mapSprite || !canvasHost) return;

      const hostW = canvasHost.clientWidth || window.innerWidth;
      const hostH = canvasHost.clientHeight || window.innerHeight;

      const texture = mapSprite.texture;
      const texW = texture.width || 1000;
      const texH = texture.height || 1400;

      mapSprite.x = hostW / 2;
      mapSprite.y = hostH / 2;

      const isMobile = hostW < 900;
const maxW = isMobile ? hostW * 0.82 : hostW * 0.68;
const maxH = isMobile ? hostH * 0.58 : hostH * 0.86;
      const scale = Math.min(maxW / texW, maxH / texH);

      mapSprite.width = texW * scale;
      mapSprite.height = texH * scale;
    };

    const positionMarkers = () => {
      const mapSprite = mapSpriteRef.current;
      if (!mapSprite) return;

      markersRef.current.forEach(({ region, dot, pulse, label, glow }) => {
        const x = mapSprite.x + (region.x - 0.5) * mapSprite.width;
        const y = mapSprite.y + (region.y - 0.5) * mapSprite.height;

        dot.x = x;
        dot.y = y;
        pulse.x = x;
        pulse.y = y;
        glow.x = x;
        glow.y = y;
        label.x = x + 12;
        label.y = y - 10;
      });
    };

    const positionParticles = () => {
      const canvasHost = canvasHostRef.current;
      if (!canvasHost) return;

      const hostW = canvasHost.clientWidth || window.innerWidth;
      const hostH = canvasHost.clientHeight || window.innerHeight;

      particlesRef.current.forEach(({ node }, index) => {
        if (node.x > hostW) node.x = hostW * 0.2;
        if (node.y > hostH) node.y = hostH * 0.3;

        if (index % 3 === 0 && node.y < 0) {
          node.y = hostH;
        }
      });
    };

    const getFocusValues = (region: Region) => {
      const mapSprite = mapSpriteRef.current;
      const canvasHost = canvasHostRef.current;
      if (!mapSprite || !canvasHost) {
        return { x: 0, y: 0, scaleX: 1, scaleY: 1 };
      }

      const hostW = canvasHost.clientWidth || window.innerWidth;
      const hostH = canvasHost.clientHeight || window.innerHeight;

      const pointX = mapSprite.x + (region.x - 0.5) * mapSprite.width;
      const pointY = mapSprite.y + (region.y - 0.5) * mapSprite.height;
      const zoom = region.zoom || 1.2;

      return {
        scaleX: zoom,
        scaleY: zoom,
        x: hostW / 2 - pointX * zoom,
        y: hostH / 2 - pointY * zoom,
      };
    };

    const createParticles = () => {
      const particleLayer = particleLayerRef.current;
      const canvasHost = canvasHostRef.current;
      if (!particleLayer || !canvasHost) return;

      destroyParticles();
      particleLayer.removeChildren();

      const hostW = canvasHost.clientWidth || window.innerWidth;
      const hostH = canvasHost.clientHeight || window.innerHeight;
      const isMobile = hostW < 900;
const count = isMobile
  ? Math.min(24, Math.max(14, Math.floor(hostW / 30)))
  : Math.min(70, Math.max(36, Math.floor(hostW / 22)));

      for (let i = 0; i < count; i++) {
        const node = new Graphics();
        const r = Math.random() > 0.8 ? 2 : 1.2;

        node.circle(0, 0, r);
        node.fill(ACCENT);
        node.alpha = 0.04 + Math.random() * 0.08;

        node.x = Math.random() * hostW;
        node.y = Math.random() * hostH;

        particleLayer.addChild(node);

        const driftX = (Math.random() - 0.5) * 30;
        const driftY = 20 + Math.random() * 60;
        const duration = 5 + Math.random() * 5;

        gsap.to(node, {
          x: node.x + driftX,
          y: node.y - driftY,
          duration,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        gsap.to(node, {
          alpha: 0.02 + Math.random() * 0.08,
          duration: duration * 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });

        particlesRef.current.push({ node });
      }
    };

  const jumpToRegion = (regionId: string) => {
  const idx = regions.findIndex((r) => r.id === regionId);
  if (idx === -1) return;

  const timelineTrigger = scrollTriggersRef.current.find((trigger) => {
    const vars = trigger.vars as { animation?: gsap.core.Timeline };
    return vars.animation === timelineRef.current;
  });

  if (!timelineTrigger) return;

  const totalStops = regions.length;
  const progress = totalStops <= 1 ? 0 : idx / (totalStops - 1);
  const targetY =
    timelineTrigger.start +
    (timelineTrigger.end - timelineTrigger.start) * progress;

  window.scrollTo({
    top: targetY,
    behavior: 'smooth',
  });
};

const createMarkers = () => {
  const markerLayer = markerLayerRef.current;
  const mapSprite = mapSpriteRef.current;
  if (!markerLayer || !mapSprite) return;

  destroyMarkers();
  markerLayer.removeChildren();

  regions.forEach((region) => {
    const glow = new Graphics();
    glow.circle(0, 0, 20);
    glow.fill(ACCENT);
    glow.alpha = 0.06;
    glow.eventMode = 'none';

    const pulse = new Graphics();
    pulse.circle(0, 0, 18);
    pulse.stroke({ width: 2, color: ACCENT, alpha: 0.3 });
    pulse.alpha = 0.3;
    pulse.eventMode = 'none';

    const dot = new Graphics();
    dot.circle(0, 0, 8);
    dot.fill(ACCENT);
    dot.alpha = 0.55;
    dot.eventMode = 'static';
    dot.cursor = 'pointer';

    const label = new Text({
      text: region.name,
      style: {
        fill: '#7f1d1d',
        fontSize: 13,
      },
    });
    label.alpha = 0.45;
    label.eventMode = 'none';

    dot.on('pointertap', () => {
      jumpToRegion(region.id);
    });

    dot.on('pointerover', () => {
      gsap.to(dot.scale as any, {
        x: 1.22,
        y: 1.22,
        duration: 0.18,
        overwrite: true,
      });

      gsap.to(label, {
        alpha: 1,
        duration: 0.18,
        overwrite: true,
      });

      gsap.to(glow, {
        alpha: 0.18,
        duration: 0.18,
        overwrite: true,
      });
    });

    dot.on('pointerout', () => {
      const active = activeRegionRef.current.id === region.id;

      gsap.to(dot.scale as any, {
        x: active ? 1.35 : 1,
        y: active ? 1.35 : 1,
        duration: 0.2,
        overwrite: true,
      });

      gsap.to(label, {
        alpha: active ? 1 : 0.38,
        duration: 0.2,
        overwrite: true,
      });

      gsap.to(glow, {
        alpha: active ? 0.22 : 0.05,
        duration: 0.2,
        overwrite: true,
      });
    });

    gsap.to(pulse.scale as any, {
      x: 1.5,
      y: 1.5,
      duration: 1.8,
      repeat: -1,
      ease: 'power1.out',
    });

    gsap.to(pulse, {
      alpha: 0,
      duration: 1.8,
      repeat: -1,
      ease: 'power1.out',
    });

    markerLayer.addChild(glow);
    markerLayer.addChild(pulse);
    markerLayer.addChild(dot);
    markerLayer.addChild(label);

    markersRef.current.push({ region, dot, pulse, label, glow });
  });

  positionMarkers();
};

    const buildTimeline = () => {
      const scene = sceneRef.current;
      if (!scene || !rootRef.current) return;

      killOwnedScrollTriggers();
      killTimeline();

      scene.x = 0;
      scene.y = 0;
      scene.scale.set(1);

      const tl = gsap.timeline({
        paused: true,
        defaults: {
          duration: 1,
          ease: 'power2.inOut',
        },
      });

      regions.forEach((region, index) => {
        const focus = getFocusValues(region);

        if (index !== 0) {
          tl.add(() => updateActiveRegion(region));
        }

        tl.to(
          scene,
          {
            x: focus.x,
            y: focus.y,
          },
          index === 0 ? 0 : '>'
        );

        tl.to(
          scene.scale,
          {
            x: focus.scaleX,
            y: focus.scaleY,
          },
          '<'
        );
      });

      timelineRef.current = tl;

      const timelineTrigger = ScrollTrigger.create({
        animation: tl,
        trigger: rootRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.15,
      });

      const activeStateTrigger = ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const progress = self.progress;
          const segmentSize = 1 / regions.length;
          const idx = Math.min(
            regions.length - 1,
            Math.floor(progress / segmentSize)
          );

          const region = regions[idx];
          if (region && region.id !== activeRegionRef.current.id) {
            updateActiveRegion(region);
          }
        },
      });

      scrollTriggersRef.current.push(timelineTrigger, activeStateTrigger);
    };

    const rebuildScene = () => {
      placeMap();
      createParticles();
      createMarkers();
      buildTimeline();
      positionParticles();
      updateActiveRegion(activeRegionRef.current || regions[0]);
      ScrollTrigger.refresh();
    };

    const init = async () => {
      try {
        if (!canvasHostRef.current) return;

        const app = new Application();
        await app.init({
          resizeTo: canvasHostRef.current,
          background: '#fff7f7',
          antialias: true,
        });

        if (destroyed) {
          app.destroy(true);
          return;
        }

        appRef.current = app;
        canvasHostRef.current.appendChild(app.canvas);
        app.canvas.style.width = '100%';
        app.canvas.style.height = '100%';
        app.canvas.style.display = 'block';

        const scene = new Container();
        sceneRef.current = scene;
        app.stage.addChild(scene);

        const particleLayer = new Container();
        particleLayerRef.current = particleLayer;
        scene.addChild(particleLayer);

        let texture;
        try {
          texture = await Assets.load('/peru-map-placeholder.png');
        } catch (error) {
          console.error('Failed to load map image:', error);
          setStatus('image-error');
          return;
        }

        if (destroyed) return;

        const mapSprite = new Sprite(texture);
        mapSprite.anchor.set(0.5);
        mapSpriteRef.current = mapSprite;
        scene.addChild(mapSprite);

        const markerLayer = new Container();
        markerLayerRef.current = markerLayer;
        scene.addChild(markerLayer);

        rebuildScene();
        setStatus('ready');

        const handleResize = () => {
          if (resizeTimeoutRef.current) {
            clearTimeout(resizeTimeoutRef.current);
          }

          resizeTimeoutRef.current = setTimeout(() => {
            rebuildScene();
          }, 120);
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    };

    let removeResizeListener: (() => void) | undefined;

    init().then((cleanupFn) => {
      removeResizeListener = cleanupFn;
    });

    return () => {
      destroyed = true;

      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      if (removeResizeListener) {
        removeResizeListener();
      }

      killOwnedScrollTriggers();
      killTimeline();
      destroyMarkers();
      destroyParticles();

      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }
    };
  }, []);

  return (
    <div className="scrolly-layout phase-two-layout" ref={rootRef}>
      <div className="sticky-stage">
        <div className="canvas-host" ref={canvasHostRef} />
        <div className="vignette-overlay" />

        {status !== 'ready' && (
          <div className="status-pill">Status: {status}</div>
        )}

        <div className="chapter-indicator">
          {regions.map((region, index) => {
            const active = activeRegion.id === region.id;

            return (
              <button
                key={region.id}
                type="button"
                className={`chapter-dot ${active ? 'is-active' : ''}`}
                onClick={() => jumpToRegion(region.id)}
                aria-label={`Go to ${region.name}`}
              >
                <span className="chapter-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="chapter-name">{region.name}</span>
              </button>
            );
          })}
        </div>

        <div className="info-panel premium-panel light-theme-panel" ref={panelRef}>
          <div className="panel-topline">
            <p className="eyebrow">Region Focus</p>
            <span className="panel-index">
              {String(
                Math.max(
                  1,
                  regions.findIndex((r) => r.id === activeRegion.id) + 1
                )
              ).padStart(2, '0')}
            </span>
          </div>

          <div className="panel-title-wrap">
            <h2>{activeRegion.name}</h2>
            <div className="panel-rule" />
          </div>

          <div className="panel-media">
            <img
              src={activeRegion.image}
              alt={activeRegion.imageAlt || activeRegion.name}
            />
          </div>

          <div className="panel-meta-row">
            {(activeRegion.chips || []).map((chip) => (
              <span key={chip} className="panel-chip">
                {chip}
              </span>
            ))}
          </div>

          <div className="panel-highlight">
            <span className="panel-highlight-label">Featured Dance</span>
            <p className="panel-highlight-value">{activeRegion.dance}</p>
          </div>

          <div className="panel-description-block">
            <p className="panel-description">{activeRegion.description}</p>
          </div>

          <div className="panel-footer">
            <span className="panel-footer-label">Scroll to continue</span>
            <div className="panel-footer-line" />
          </div>
        </div>
      </div>

      <div className="story-column phase-two-story">
        {regions.map((region, index) => (
          <section key={region.id} className="story-step phase-two-step">
            <div className="story-card">
              <p className="step-label">
                Stop {String(index + 1).padStart(2, '0')}
              </p>
              <h3>{region.name}</h3>
              <p>
                <strong>{region.dance}</strong>
              </p>
              <p>{region.description}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}