"use client";

import { useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type {
  ProfileSectionKey,
  ProfileSectionOrderKey,
} from "../types/profile.types";

export function useProfileSectionOrder(
  publicView: boolean,
  isSectionEditorOpen: boolean,
  sectionOrder: ProfileSectionOrderKey[],
  setSectionOrder: Dispatch<SetStateAction<ProfileSectionOrderKey[]>>,
  visibleSections: Record<ProfileSectionKey, boolean>,
) {
  const [draggedSection, setDraggedSection] =
    useState<ProfileSectionOrderKey | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [dragOffsetY, setDragOffsetY] = useState(0);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const dragRef = useRef<{
    key: ProfileSectionOrderKey;
    startY: number;
    active: boolean;
    height: number;
  } | null>(null);

  const getVisibleSectionOrder = () =>
    sectionOrder.filter((key) => key === "publications" || visibleSections[key]);

  const getSectionTransform = (key: ProfileSectionOrderKey) => {
    if (!draggedSection || !dragRef.current) return undefined;

    const visibleOrder = getVisibleSectionOrder();
    const sourceIndex = visibleOrder.indexOf(draggedSection);
    if (sourceIndex === -1) return undefined;

    const remainingOrder = visibleOrder.filter((item) => item !== draggedSection);
    const targetIndex =
      dropIndex === null
        ? sourceIndex
        : Math.max(0, Math.min(dropIndex, remainingOrder.length));
    const shift = dragRef.current.height + 18;

    if (key === draggedSection) {
      return {
        transform: `translateY(${dragOffsetY}px) scale(1.012)`,
        zIndex: 20,
      };
    }

    const currentIndex = visibleOrder.indexOf(key);

    if (
      targetIndex < sourceIndex &&
      currentIndex >= targetIndex &&
      currentIndex < sourceIndex
    ) {
      return { transform: `translateY(${shift}px)` };
    }

    if (
      targetIndex > sourceIndex &&
      currentIndex > sourceIndex &&
      currentIndex <= targetIndex
    ) {
      return { transform: `translateY(-${shift}px)` };
    }

    return undefined;
  };

  const getSectionClassName = (
    key: ProfileSectionOrderKey,
    styles: Record<string, string>,
  ) => {
    const visibleOrder = getVisibleSectionOrder();
    const remainingOrder = visibleOrder.filter((item) => item !== draggedSection);
    const targetKey = dropIndex !== null ? remainingOrder[dropIndex] : undefined;
    const isLastDropTarget =
      dropIndex === remainingOrder.length &&
      remainingOrder[remainingOrder.length - 1] === key;

    return [
      styles.sortableSection,
      draggedSection === key ? styles.sortableSectionDragging : "",
      targetKey === key ? styles.sortableSectionDropTarget : "",
      isLastDropTarget ? styles.sortableSectionDropAfter : "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  const handleSectionPointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
    key: ProfileSectionOrderKey,
  ) => {
    if (publicView || !isSectionEditorOpen) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const target = event.target as HTMLElement;
    if (target.closest("button, a, input, textarea, select")) return;

    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();

    dragRef.current = {
      key,
      startY: event.clientY,
      active: false,
      height: rect.height,
    };

    setDraggedSection(key);
    setDropIndex(getVisibleSectionOrder().indexOf(key));
    setDragOffsetY(0);
    element.setPointerCapture?.(event.pointerId);
  };

  useEffect(() => {
    if (!draggedSection) return;

    const handlePointerMove = (event: PointerEvent) => {
      const current = dragRef.current;
      if (!current) return;

      const deltaY = event.clientY - current.startY;

      if (!current.active) {
        if (Math.abs(deltaY) < 6) return;
        current.active = true;
      }

      event.preventDefault();
      setDragOffsetY(deltaY);

      const remainingOrder = getVisibleSectionOrder().filter(
        (item) => item !== current.key,
      );
      let nextIndex = remainingOrder.length;

      for (let index = 0; index < remainingOrder.length; index += 1) {
        const element = sectionRefs.current[remainingOrder[index]];
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        if (event.clientY < rect.top + rect.height / 2) {
          nextIndex = index;
          break;
        }
      }

      setDropIndex(nextIndex);
    };

    const finishDrag = () => {
      const current = dragRef.current;
      if (!current) return;

      const visibleOrder = getVisibleSectionOrder();
      const remainingOrder = visibleOrder.filter((item) => item !== current.key);
      const finalIndex =
        current.active && dropIndex !== null
          ? Math.max(0, Math.min(dropIndex, remainingOrder.length))
          : visibleOrder.indexOf(current.key);

      const reorderedVisible = [
        ...remainingOrder.slice(0, finalIndex),
        current.key,
        ...remainingOrder.slice(finalIndex),
      ];

      const hiddenOrder = sectionOrder.filter(
        (item) => !visibleOrder.includes(item),
      );
      const nextOrder = [...reorderedVisible, ...hiddenOrder];

      if (current.active) setSectionOrder(nextOrder);

      dragRef.current = null;
      setDraggedSection(null);
      setDropIndex(null);
      setDragOffsetY(0);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: false });
    window.addEventListener("pointerup", finishDrag);
    window.addEventListener("pointercancel", finishDrag);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", finishDrag);
      window.removeEventListener("pointercancel", finishDrag);
    };
  }, [
    draggedSection,
    dropIndex,
    sectionOrder,
    visibleSections,
    publicView,
    isSectionEditorOpen,
    setSectionOrder,
  ]);

  return {
    draggedSection,
    dropIndex,
    dragOffsetY,
    sectionRefs,
    getSectionTransform,
    getSectionClassName,
    handleSectionPointerDown,
  };
}