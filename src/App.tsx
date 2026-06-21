/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { DEFAULT_POSTCARDS, DEFAULT_SETTINGS, PostcardData, GallerySettings } from "./types";
import LockScreen from "./components/LockScreen";
import GalleryView from "./components/GalleryView";
import EditorModal from "./components/EditorModal";

export default function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [postcards, setPostcards] = useState<PostcardData[]>(DEFAULT_POSTCARDS);
  const [settings, setSettings] = useState<GallerySettings>(DEFAULT_SETTINGS);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // Initialize/hydrate states from localStorage on mount
  useEffect(() => {
    localStorage.removeItem("loveshare_postcards");
    setPostcards(DEFAULT_POSTCARDS);

    const cachedSettings = localStorage.getItem("loveshare_settings");

    if (cachedSettings) {
      try {
        const parsed = JSON.parse(cachedSettings);
        // Force the passcode to always be statically locked
        parsed.passcode = DEFAULT_SETTINGS.passcode;
        parsed.passcodeHint = DEFAULT_SETTINGS.passcodeHint;
        setSettings(parsed);
      } catch (e) {
        setSettings(DEFAULT_SETTINGS);
      }
    } else {
      setSettings(DEFAULT_SETTINGS);
    }
  }, []);

  const handleSave = (newPostcards: PostcardData[], newSettings: GallerySettings) => {
    const cleanSettings = {
      ...newSettings,
      passcode: DEFAULT_SETTINGS.passcode,
      passcodeHint: DEFAULT_SETTINGS.passcodeHint,
    };
    // Postcards are hardcoded and not editable, so they remain DEFAULT_POSTCARDS
    setPostcards(DEFAULT_POSTCARDS);
    setSettings(cleanSettings);
    localStorage.setItem("loveshare_settings", JSON.stringify(cleanSettings));
  };

  const handleReset = () => {
    setPostcards(DEFAULT_POSTCARDS);
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem("loveshare_settings");
  };

  return (
    <div className="min-h-screen text-slate-800">
      {/* 1. Core Gatekeeper Screen */}
      {!isUnlocked ? (
        <LockScreen
          correctCode={settings.passcode}
          hint={settings.passcodeHint}
          onUnlock={() => setIsUnlocked(true)}
        />
      ) : (
        /* 2. Main Picture Gallery Postcard View */
        <GalleryView
          postcards={postcards}
          settings={settings}
          onLock={() => setIsUnlocked(false)}
          onOpenEditor={() => setIsEditorOpen(true)}
        />
      )}

      {/* 3. Postcard customization Form Overlay */}
      <EditorModal
        postcards={postcards}
        settings={settings}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSave}
        onReset={handleReset}
      />
    </div>
  );
}
