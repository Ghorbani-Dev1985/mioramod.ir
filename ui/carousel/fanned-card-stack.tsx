'use client';

import * as React from 'react';
import { cn } from '@/core/utils/shadcn.utils';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

/**
 * Props for the FannedCardStack component.
 */
interface FannedCardStackProps<T> {
  /** The array of data items to render in the stack. */
  items: T[];
  /** Function to render the content of each card. */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Rotation degree difference between stacked cards (default: 4). */
  rotateFactor?: number;
  /** Scale reduction difference between stacked cards (default: 0.05). */
  scaleFactor?: number;
  /** The transform origin point (percentage) for rotation (default: { x: 50, y: 100 }). */
  pivot?: { x: number; y: number };
  /** Callback fired when the stack order changes after a swipe. */
  onReorder?: (newItems: T[]) => void;
  /** Whether the top card should auto-swipe to the bottom on an interval (default: true). */
  autoPlay?: boolean;
  /** Delay in ms between auto-swipes (default: 3000). */
  autoPlayInterval?: number;
  /** Whether to render navigation dots below the stack (default: true). */
  showDots?: boolean;
  /** Optional class names for the container. */
  className?: string;
}

/**
 * Renders a stack of items as fanned-out cards.
 * Users can drag the top card to "swipe" it to the bottom of the stack.
 */
export function FannedCardStack<T>({
  items: initialItems,
  renderItem,
  rotateFactor = 4,
  scaleFactor = 0.05,
  pivot = { x: 50, y: 100 },
  onReorder,
  autoPlay = true,
  autoPlayInterval = 3000,
  showDots = true,
  className,
}: FannedCardStackProps<T>) {
  const [items, setItems] = React.useState(initialItems);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const isAnimating = React.useRef(false);
  const isDragging = React.useRef(false);
  const hasLoaded = React.useRef(false);

  React.useEffect(() => {
    setItems(initialItems);
    setActiveIndex(0);
  }, [initialItems]);

  const getCardStyle = React.useCallback(
    (index: number) => {
      return {
        rotation: index * rotateFactor,
        scale: 1 - index * scaleFactor,
        zIndex: items.length - index,
        x: 0,
        y: 0,
        opacity: 1,
      };
    },
    [items.length, rotateFactor, scaleFactor]
  );

  const swipeTopCard = React.useCallback(
    (kickX: number, kickY: number) => {
      const topCard = cardRefs.current[0];
      if (!topCard || isAnimating.current || isDragging.current) return;
      if (!hasLoaded.current || items.length < 2) return;

      isAnimating.current = true;
      const lastIndex = items.length - 1;
      const targetStyle = getCardStyle(lastIndex);

      const timeline = gsap.timeline({
        onComplete: () => {
          const newItems = [...items];
          const movedItem = newItems.shift();
          if (movedItem) newItems.push(movedItem);
          setItems(newItems);
          const nextTop = newItems[0];
          if (nextTop) setActiveIndex(initialItems.indexOf(nextTop));
          if (onReorder) onReorder(newItems);
          isAnimating.current = false;
        },
      });

      // Choreography: Throw card out -> Move to back (z-index) -> Slide back into stack
      timeline
        .to(topCard, {
          x: kickX,
          y: kickY,
          scale: 0.8,
          duration: 0.2,
          ease: 'power1.out',
        })
        .set(topCard, { zIndex: 0 })
        .to(topCard, {
          x: 0,
          y: 0,
          rotation: targetStyle.rotation,
          scale: targetStyle.scale,
          duration: 0.5,
          ease: 'back.out(1.2)',
        });

      items.forEach((_, i) => {
        if (i === 0) return;
        const el = cardRefs.current[i];
        if (!el) return;
        const nextStyle = getCardStyle(i - 1);
        timeline.to(
          el,
          {
            rotation: nextStyle.rotation,
            scale: nextStyle.scale,
            duration: 0.5,
            ease: 'power2.out',
          },
          0.15
        );
      });
    },
    [items, getCardStyle, onReorder, initialItems]
  );

  React.useEffect(() => {
    if (!autoPlay || items.length < 2) return;

    const id = window.setInterval(() => {
      swipeTopCard(60, 80);
    }, autoPlayInterval);

    return () => window.clearInterval(id);
  }, [autoPlay, autoPlayInterval, items.length, swipeTopCard]);

  const goTo = React.useCallback(
    (index: number) => {
      if (isAnimating.current) return;

      const target = initialItems[index];
      const pos = items.indexOf(target);
      if (pos <= 0) return;

      const newItems = [...items.slice(pos), ...items.slice(0, pos)];
      setItems(newItems);
      setActiveIndex(index);
      if (onReorder) onReorder(newItems);
    },
    [items, initialItems, onReorder]
  );

  useGSAP(() => {
    // DECISION: We split logic into "Entrance" (initial load) and "Maintenance" (re-renders).
    // The entrance ensures a clean 'deal' animation, while maintenance updates positions instantly
    // to keep the stack visually consistent during React state updates.
    if (!hasLoaded.current) {
      items.forEach((_, index) => {
        const el = cardRefs.current[index];
        if (el) {
          gsap.set(el, {
            transformOrigin: `${pivot.x}% ${pivot.y}%`,
            rotation: 0,
            x: 0,
            y: 50,
            scale: 0.9,
            opacity: 0,
            zIndex: items.length - index,
          });
        }
      });

      gsap.to(cardRefs.current, {
        rotation: (i) => getCardStyle(i).rotation,
        scale: (i) => getCardStyle(i).scale,
        y: 0,
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'back.out(1.2)',
        onComplete: () => {
          hasLoaded.current = true;
        },
      });
    } else {
      items.forEach((_, index) => {
        const el = cardRefs.current[index];
        if (!el) return;
        const style = getCardStyle(index);

        gsap.set(el, {
          transformOrigin: `${pivot.x}% ${pivot.y}%`,
          rotation: style.rotation,
          scale: style.scale,
          x: 0,
          y: 0,
          zIndex: style.zIndex,
          opacity: 1,
          overwrite: 'auto',
        });
      });
    }

    const topCard = cardRefs.current[0];
    if (!topCard) return;

    const draggable = Draggable.create(topCard, {
      type: 'x,y',
      zIndexBoost: false,
      onPress: function () {
        if (isAnimating.current) {
          this.endDrag();
          return;
        }
        isDragging.current = true;
        // STOP: Kill any ongoing "snap back" animations if the user grabs the card mid-air.
        gsap.killTweensOf(this.target);
      },
      onRelease: function () {
        isDragging.current = false;
        const dist = Math.sqrt(this.x * this.x + this.y * this.y);
        const THRESHOLD = 60;

        if (dist > THRESHOLD) {
          // HACK: Multiply the drag distance to create a visual "kick" or momentum effect
          // before the card loops back to the bottom of the stack.
          swipeTopCard(this.x * 1.5, this.y * 1.5);
        } else {
          gsap.to(this.target, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: 'back.out(1.5)',
          });
        }
      },
    })[0];

    return () => {
      draggable.kill();
    };
  }, [items, rotateFactor, scaleFactor, pivot]);

  return (
    <div className={cn('flex w-full flex-col items-center', className)}>
      <div className={cn('relative flex-center', 'h-45 w-full')}>
        {items.map((item, index) => {
          return (
            <div
              key={JSON.stringify(item)}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={cn(
                'absolute inset-0 flex-center',
                'rounded-2xl',
                // HACK: Prevent FOUC (Flash of Unstyled Content) by starting opacity-0.
                // GSAP handles the fade-in during the initial entrance animation.
                'opacity-0',
                index === 0
                  ? 'cursor-grab active:cursor-grabbing'
                  : 'pointer-events-none'
              )}
              style={{
                zIndex: items.length - index,
              }}
            >
              <div className='h-full w-full overflow-hidden rounded-2xl select-none pointer-events-none'>
                {renderItem(item, index)}
              </div>
            </div>
          );
        })}
      </div>

      {showDots && items.length > 1 && (
        <div className='flex-center gap-1.5'>
          {initialItems.map((_, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goTo(index)}
                className={cn([
                  'h-2 rounded-full transition-all duration-300',
                  isActive
                    ? 'w-7 bg-primary-500'
                    : 'w-2 bg-neutral-300 hover:bg-neutral-400',
                ])}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}