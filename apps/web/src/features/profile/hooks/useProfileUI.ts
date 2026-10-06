"use client";

import { useState } from "react";

export function useProfileUI() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isServiceEditOpen, setIsServiceEditOpen] = useState(false);
  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [postPage, setPostPage] = useState(1);
  const [isSectionEditorOpen, setIsSectionEditorOpen] = useState(false);

  const openServiceEditor = (index: number) => {
    setEditingServiceIndex(index);
    setIsServiceEditOpen(true);
  };

  const closeGallery = () => setGalleryIndex(null);

  return {
    isEditOpen,
    setIsEditOpen,
    isServiceEditOpen,
    setIsServiceEditOpen,
    editingServiceIndex,
    setEditingServiceIndex,
    galleryIndex,
    setGalleryIndex,
    showAllPosts,
    setShowAllPosts,
    postPage,
    setPostPage,
    isSectionEditorOpen,
    setIsSectionEditorOpen,
    openServiceEditor,
    closeGallery,
  };
}