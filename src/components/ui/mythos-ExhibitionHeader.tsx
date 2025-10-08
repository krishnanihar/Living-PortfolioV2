'use client';

import React from 'react';
import { Exhibition } from '@/types/mythos';
import { Icons } from '@/components/ui/mythos-Icons';

interface ExhibitionHeaderProps {
    exhibition: Exhibition;
    onEnterImmersive: () => void;
    onClearExhibition: () => void;
    onCreateCapstone: () => void;
    isGeneratingCapstone: boolean;
    onGenerateDream: () => void;
    isGeneratingDream: boolean;
}

const CriteriaItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | string[] }) => (
    <div>
        <div className="flex items-center gap-2 text-sm text-white/50 mb-1">
            {icon}
            <span>{label}</span>
        </div>
        <p className="font-medium text-white/90">
            {Array.isArray(value) ? value.join(', ') : value}
        </p>
    </div>
);

const ActionButton = ({ onClick, disabled, icon, children }: { onClick: () => void, disabled: boolean, icon: React.ReactNode, children: React.ReactNode }) => (
     <button 
        onClick={onClick}
        disabled={disabled}
        className="px-5 py-2 text-sm font-semibold text-white bg-[#DA0E29] rounded-md hover:bg-red-500 transition-colors flex items-center justify-center gap-2 disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed"
    >
        {disabled ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        ) : icon}
        <span>{children}</span>
    </button>
);


export const ExhibitionHeader = ({ exhibition, onEnterImmersive, onClearExhibition, onCreateCapstone, isGeneratingCapstone, onGenerateDream, isGeneratingDream }: ExhibitionHeaderProps) => {
    const { title, subtitle, statement, criteria, reasoning } = exhibition;
    const isCreativeActionDisabled = isGeneratingCapstone || isGeneratingDream;

    return (
        <div className="mb-12 bg-white/[.04] backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden animate-fade-in-up" style={{ animationDuration: '0.6s' }}>
            <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    <div className="md:col-span-2">
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{title}</h2>
                        <p className="mt-2 text-xl text-[#E0D8C8] italic">{subtitle}</p>
                        <p className="mt-6 text-white/70 leading-relaxed">{statement}</p>
                        <p className="mt-4 text-sm text-white/50 italic border-l-2 border-white/20 pl-4">{reasoning}</p>
                    </div>
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Mythos's Criteria</h3>
                        <CriteriaItem icon={<Icons.sparkles className="w-4 h-4" />} label="Motifs" value={criteria.motifs} />
                        <CriteriaItem icon={<Icons.key className="w-4 h-4" />} label="Themes" value={criteria.themes} />
                        <CriteriaItem icon={<Icons.heart className="w-4 h-4" />} label="Mood" value={criteria.mood} />
                        <CriteriaItem icon={<Icons.calendar className="w-4 h-4" />} label="Centuries" value={criteria.centuries.map(c => `${c}th`).join(', ')} />
                    </div>
                </div>
            </div>
            <div className="bg-black/20 px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                     <ActionButton onClick={onCreateCapstone} disabled={isCreativeActionDisabled} icon={<Icons.wand className="w-5 h-5"/>}>
                        {isGeneratingCapstone ? "Creating..." : "Create a Capstone"}
                    </ActionButton>
                     <ActionButton onClick={onGenerateDream} disabled={isCreativeActionDisabled} icon={<Icons.video className="w-5 h-5"/>}>
                        {isGeneratingDream ? "Dreaming..." : "Witness the Dream"}
                    </ActionButton>
                    <button 
                        onClick={onEnterImmersive}
                        disabled={isCreativeActionDisabled}
                        className="px-5 py-2 text-sm font-semibold text-white bg-white/5 rounded-md hover:bg-white/10 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        <Icons.view3d className="w-5 h-5"/> Enter Immersive Gallery
                    </button>
                </div>
                <button 
                    onClick={onClearExhibition}
                    className="px-4 py-2 text-sm font-medium text-white/70 bg-white/5 rounded-md hover:bg-white/10 transition-colors"
                >
                    Clear Vision
                </button>
            </div>
        </div>
    );
};