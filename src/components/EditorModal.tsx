import React, { useState } from "react";
import { Plus, Trash2, Edit2, RotateCcw, Save, X, Settings2, Image, MessageSquare, Copy, Check } from "lucide-react";
import { PostcardData, GallerySettings } from "../types";

interface EditorModalProps {
  postcards: PostcardData[];
  settings: GallerySettings;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newPostcards: PostcardData[], newSettings: GallerySettings) => void;
  onReset: () => void;
}

export default function EditorModal({
  postcards,
  settings,
  isOpen,
  onClose,
  onSave,
  onReset,
}: EditorModalProps) {
  const [activeTab, setActiveTab] = useState<"postcards" | "settings" | "export">("postcards");
  const [editedSettings, setEditedSettings] = useState<GallerySettings>({ ...settings });
  const [editedPostcards, setEditedPostcards] = useState<PostcardData[]>([...postcards]);
  
  // Postcard sub-form state (for adding/editing a specific card)
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [cardForm, setCardForm] = useState<Partial<PostcardData>>({
    title: "",
    date: "",
    location: "",
    imageUrl: "",
    message: "",
  });
  const [isEditingCard, setIsEditingCard] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Open the card form for adding/editing
  const openCardForm = (card?: PostcardData) => {
    if (card) {
      setSelectedCardId(card.id);
      setCardForm({ ...card });
    } else {
      setSelectedCardId(null);
      setCardForm({
        title: "",
        date: "",
        location: "",
        imageUrl: "",
        message: "",
      });
    }
    setIsEditingCard(true);
  };

  const handleSaveCard = () => {
    if (!cardForm.title || !cardForm.imageUrl || !cardForm.message) {
      alert("Please fill in Title, Image URL, and the Secret Message!");
      return;
    }

    if (selectedCardId) {
      // Editing existing
      setEditedPostcards(
        editedPostcards.map((c) =>
          c.id === selectedCardId ? (cardForm as PostcardData) : c
        )
      );
    } else {
      // Adding new
      const newCard: PostcardData = {
        id: `pc-${Date.now()}`,
        title: cardForm.title || "Our Memory",
        date: cardForm.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        location: cardForm.location || "Somewhere Beautiful",
        imageUrl: cardForm.imageUrl || "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2",
        message: cardForm.message || "I love you!",
      };
      setEditedPostcards([...editedPostcards, newCard]);
    }
    setIsEditingCard(false);
  };

  const handleDeleteCard = (id: string) => {
    if (confirm("Are you sure you want to remove this memory?")) {
      setEditedPostcards(editedPostcards.filter((c) => c.id !== id));
    }
  };

  const handleApplyChanges = () => {
    onSave(editedPostcards, editedSettings);
    onClose();
  };

  const handleCopyJSON = () => {
    const backupData = {
      postcards: editedPostcards,
      settings: editedSettings,
    };
    navigator.clipboard.writeText(JSON.stringify(backupData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 select-none">
      <div className="bg-[#0f0a0c] rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-white/10 text-[#e0d8d0]">
        
        {/* Header bar */}
        <div className="bg-[#150e11] px-6 py-4.5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-rose-500 animate-pulse" />
            <span className="font-serif text-lg font-light italic text-[#e0d8d0]">Customize Love Gallery</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/5 text-[#e0d8d0]/45 hover:text-[#e0d8d0] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#0c080a] space-y-6">
          <div className="bg-[#150e11] p-4.5 rounded-lg border border-white/5 text-left slot">
            <h4 className="font-serif italic text-rose-350 text-sm mb-1">Only unlocked using our secret code hehe, welcome bebe!</h4>
          </div>

          <div className="space-y-5 text-left">
            {/* Gallery Title */}
            <div className="bg-[#120b0d] p-5 rounded-xl border border-white/[0.04] shadow-xs">
              <label className="block text-xs uppercase tracking-widest font-sans font-bold text-rose-450 mb-2">
                Gallery Main Title
              </label>
              <input
                type="text"
                value={editedSettings.galleryTitle}
                onChange={(e) => setEditedSettings({ ...editedSettings, galleryTitle: e.target.value })}
                className="w-full text-sm px-4 py-2.5 rounded bg-black/45 border border-white/10 text-[#e0d8d0] focus:outline-hidden focus:border-rose-900/60 focus:ring-1 focus:ring-rose-900/40"
              />
            </div>

            {/* Subtitle */}
            <div className="bg-[#120b0d] p-5 rounded-xl border border-white/[0.04] shadow-xs">
              <label className="block text-xs uppercase tracking-widest font-sans font-bold text-rose-450 mb-2">
                Gallery Explainer Subtitle
              </label>
              <textarea
                value={editedSettings.gallerySubtitle}
                onChange={(e) => setEditedSettings({ ...editedSettings, gallerySubtitle: e.target.value })}
                rows={2.5}
                className="w-full text-sm px-4 py-2.5 rounded bg-black/45 border border-white/10 text-[#e0d8d0] focus:outline-hidden focus:border-rose-900/60 focus:ring-1 focus:ring-rose-900/40"
              />
            </div>

            {/* Music Track URL */}
            <div className="bg-[#120b0d] p-5 rounded-xl border border-white/[0.04] shadow-xs">
              <label className="block text-xs uppercase tracking-widest font-sans font-bold text-rose-450 mb-2">
                Ambient MP3 Stream URL
              </label>
              <input
                type="url"
                value={editedSettings.musicUrl}
                onChange={(e) => setEditedSettings({ ...editedSettings, musicUrl: e.target.value })}
                className="w-full text-sm px-4 py-2.5 rounded bg-black/45 border border-white/10 text-[#e0d8d0] focus:outline-hidden focus:border-rose-900/60 focus:ring-1 focus:ring-rose-900/40"
              />
              <p className="text-[10px] text-[#e0d8d0]/40 mt-2.5 font-sans tracking-wide">
                Provide an MP3 streaming link to set the mood!
              </p>
            </div>
          </div>

          {/* Reset to Default */}
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => {
                if (confirm("Are you sure you want to restore default template settings?")) {
                  onReset();
                  onClose();
                }
              }}
              className="text-xs text-rose-400 flex items-center gap-1.5 hover:text-rose-300 transition font-sans uppercase tracking-widest font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset to default settings
            </button>
          </div>

        </div>

        {/* Footer controls */}
        <div className="bg-[#120c0e] px-6 py-4.5 border-t border-white/5 flex justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 hover:bg-white/5 text-[#e0d8d0]/60 rounded text-xs font-sans uppercase tracking-widest font-semibold transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApplyChanges}
            className="px-5 py-2.5 bg-rose-950 hover:bg-rose-900 border border-rose-900/50 text-rose-100 rounded text-xs font-sans uppercase tracking-widest font-bold flex items-center gap-1.5 shadow-lg active:scale-95 transition cursor-pointer"
          >
            <Save className="w-4 h-4 text-rose-400" />
            Apply Changes
          </button>
        </div>

      </div>
    </div>
  );
}
