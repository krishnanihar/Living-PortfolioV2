const fs = require('fs');
const content = fs.readFileSync('src/components/sections/AboutSectionV2.tsx', 'utf8');
const lines = content.split('\n');

// Insert React import after 'use client'
lines.splice(2, 0, "import React from 'react';");

// Insert Image import after Link import
const linkIndex = lines.findIndex(l => l.includes("import Link from 'next/link'"));
if (linkIndex !== -1) {
  lines.splice(linkIndex + 1, 0, "import Image from 'next/image';");
}

fs.writeFileSync('src/components/sections/AboutSectionV2.tsx', lines.join('\n'), 'utf8');
console.log('Imports added');
