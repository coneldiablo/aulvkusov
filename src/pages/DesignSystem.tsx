import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Download, Layers, Palette, Clock, Settings } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const DesignSystem: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(15); // 15 seconds animation
  const [selectedPalette, setSelectedPalette] = useState('minimal');
  
  // Color palettes
  const colorPalettes = {
    minimal: {
      name: 'Minimalist',
      primary: '#2A2A2A',
      secondary: '#F5F5F5',
      accent1: '#E63946',
      accent2: '#A8DADC',
      accent3: '#457B9D',
      background: '#FFFFFF'
    },
    organic: {
      name: 'Organic',
      primary: '#344E41',
      secondary: '#3A5A40',
      accent1: '#A3B18A',
      accent2: '#DAD7CD',
      accent3: '#588157',
      background: '#F8F9FA'
    },
    bold: {
      name: 'Bold',
      primary: '#1A1A2E',
      secondary: '#16213E',
      accent1: '#E94560',
      accent2: '#0F3460',
      accent3: '#FFF8E5',
      background: '#0F0F0F'
    },
    geometric: {
      name: 'Geometric',
      primary: '#2B2D42',
      secondary: '#8D99AE',
      accent1: '#EF233C',
      accent2: '#D90429',
      accent3: '#EDF2F4',
      background: '#FFFFFF'
    }
  };
  
  const currentPalette = colorPalettes[selectedPalette as keyof typeof colorPalettes];
  
  // Animation elements
  const animationElements = [
    {
      id: 'circle',
      name: 'Circle',
      variants: {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1, transition: { duration: 1.5, ease: "easeOut" } },
        exit: { scale: 0, opacity: 0, transition: { duration: 1, ease: "easeIn" } }
      }
    },
    {
      id: 'square',
      name: 'Square',
      variants: {
        initial: { rotate: -90, opacity: 0 },
        animate: { rotate: 0, opacity: 1, transition: { duration: 1.2, ease: "easeOut", delay: 0.3 } },
        exit: { rotate: 90, opacity: 0, transition: { duration: 0.8, ease: "easeIn" } }
      }
    },
    {
      id: 'triangle',
      name: 'Triangle',
      variants: {
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1, transition: { duration: 1, ease: "easeOut", delay: 0.6 } },
        exit: { y: -50, opacity: 0, transition: { duration: 0.8, ease: "easeIn" } }
      }
    },
    {
      id: 'text',
      name: 'Typography',
      variants: {
        initial: { x: -50, opacity: 0 },
        animate: { x: 0, opacity: 1, transition: { duration: 1, ease: "easeOut", delay: 0.9 } },
        exit: { x: 50, opacity: 0, transition: { duration: 0.8, ease: "easeIn" } }
      }
    }
  ];
  
  // Play/pause animation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, duration]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time % 1) * 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds}`;
  };
  
  return (
    <div className="container mx-auto px-4 py-8" style={{ background: currentPalette.background }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: currentPalette.primary }}>
          Digital Animation Design System
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          A comprehensive system for creating visually stunning animations with attention to detail and harmonious elements
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Animation Preview</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{formatTime(currentTime)} / {formatTime(duration)}</span>
              </div>
            </div>
            
            <div className="relative" style={{ height: '500px', background: currentPalette.background }}>
              {/* Animation Canvas */}
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={isPlaying ? "animate" : "initial"}
              >
                {/* Circle */}
                <motion.div
                  className="absolute"
                  variants={animationElements[0].variants}
                  style={{ 
                    width: '200px', 
                    height: '200px', 
                    borderRadius: '50%', 
                    background: currentPalette.accent1 
                  }}
                />
                
                {/* Square */}
                <motion.div
                  className="absolute"
                  variants={animationElements[1].variants}
                  style={{ 
                    width: '150px', 
                    height: '150px', 
                    background: currentPalette.accent2 
                  }}
                />
                
                {/* Triangle */}
                <motion.div
                  className="absolute"
                  variants={animationElements[2].variants}
                  style={{ 
                    width: 0,
                    height: 0,
                    borderLeft: '75px solid transparent',
                    borderRight: '75px solid transparent',
                    borderBottom: '130px solid ' + currentPalette.accent3
                  }}
                />
                
                {/* Typography */}
                <motion.div
                  className="absolute"
                  variants={animationElements[3].variants}
                  style={{ 
                    fontFamily: 'sans-serif',
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: currentPalette.primary,
                    zIndex: 10
                  }}
                >
                  DESIGN SYSTEM
                </motion.div>
              </motion.div>
              
              {/* Timeline Indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200">
                <motion.div 
                  className="h-full bg-blue-500"
                  style={{ 
                    width: `${(currentTime / duration) * 100}%`,
                    background: currentPalette.accent1 
                  }}
                />
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 flex justify-between items-center">
              <div className="flex space-x-2">
                <Button
                  variant="primary"
                  onClick={handlePlayPause}
                  icon={isPlaying ? <Pause size={16} /> : <Play size={16} />}
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  icon={<RotateCcw size={16} />}
                >
                  Reset
                </Button>
              </div>
              <Button
                variant="secondary"
                icon={<Download size={16} />}
              >
                Export Animation
              </Button>
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <div className="p-4 border-b border-gray-200 flex items-center">
              <Palette size={18} className="mr-2 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-800">Color Palette</h2>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Style
                </label>
                <select
                  value={selectedPalette}
                  onChange={(e) => setSelectedPalette(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="minimal">Minimalist</option>
                  <option value="organic">Organic</option>
                  <option value="bold">Bold</option>
                  <option value="geometric">Geometric</option>
                </select>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Primary</span>
                    <span>{currentPalette.primary}</span>
                  </div>
                  <div 
                    className="h-8 rounded-md" 
                    style={{ background: currentPalette.primary }}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Secondary</span>
                    <span>{currentPalette.secondary}</span>
                  </div>
                  <div 
                    className="h-8 rounded-md" 
                    style={{ background: currentPalette.secondary }}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <div className="text-xs mb-1 font-medium">Accent 1</div>
                    <div 
                      className="h-8 rounded-md" 
                      style={{ background: currentPalette.accent1 }}
                    />
                  </div>
                  <div>
                    <div className="text-xs mb-1 font-medium">Accent 2</div>
                    <div 
                      className="h-8 rounded-md" 
                      style={{ background: currentPalette.accent2 }}
                    />
                  </div>
                  <div>
                    <div className="text-xs mb-1 font-medium">Accent 3</div>
                    <div 
                      className="h-8 rounded-md" 
                      style={{ background: currentPalette.accent3 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="mb-6">
            <div className="p-4 border-b border-gray-200 flex items-center">
              <Layers size={18} className="mr-2 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-800">Animation Elements</h2>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                {animationElements.map((element) => (
                  <li key={element.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                    <span className="font-medium">{element.name}</span>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">Active</span>
                      <div className="relative inline-block w-10 h-5">
                        <input
                          type="checkbox"
                          id={`toggle-${element.id}`}
                          className="opacity-0 w-0 h-0"
                          defaultChecked
                        />
                        <label
                          htmlFor={`toggle-${element.id}`}
                          className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full bg-gray-300"
                        >
                          <span className="absolute left-0.5 bottom-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-300 transform translate-x-5"></span>
                        </label>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
          
          <Card>
            <div className="p-4 border-b border-gray-200 flex items-center">
              <Settings size={18} className="mr-2 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-800">Technical Specifications</h2>
            </div>
            <div className="p-4">
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-600">Resolution</span>
                  <span className="font-medium">1920x1080 (Full HD)</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Frame Rate</span>
                  <span className="font-medium">60fps</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{duration} seconds</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Format</span>
                  <span className="font-medium">MP4 (H.264)</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Design Files</span>
                  <span className="font-medium">AI/PSD</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Typography System</h2>
          </div>
          <div className="p-4">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Heading 1</span>
                  <span className="text-sm text-gray-500">48px / 700 / 1.1</span>
                </div>
                <div className="text-4xl font-bold" style={{ color: currentPalette.primary }}>
                  Design System
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Heading 2</span>
                  <span className="text-sm text-gray-500">36px / 600 / 1.2</span>
                </div>
                <div className="text-3xl font-semibold" style={{ color: currentPalette.primary }}>
                  Animation Elements
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Heading 3</span>
                  <span className="text-sm text-gray-500">24px / 600 / 1.3</span>
                </div>
                <div className="text-2xl font-semibold" style={{ color: currentPalette.primary }}>
                  Visual Hierarchy
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Body</span>
                  <span className="text-sm text-gray-500">16px / 400 / 1.5</span>
                </div>
                <div className="text-base" style={{ color: currentPalette.primary }}>
                  This is body text that provides detailed information about the design system and its components. It should be legible and have proper spacing.
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Caption</span>
                  <span className="text-sm text-gray-500">14px / 400 / 1.4</span>
                </div>
                <div className="text-sm" style={{ color: currentPalette.primary }}>
                  Caption text for additional information and details
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Animation Principles</h2>
          </div>
          <div className="p-4">
            <ul className="space-y-4">
              <li>
                <h3 className="font-medium mb-1" style={{ color: currentPalette.primary }}>Timing & Easing</h3>
                <p className="text-sm text-gray-600">
                  Natural easing functions create organic motion. Elements accelerate and decelerate naturally, avoiding linear movements.
                </p>
              </li>
              <li>
                <h3 className="font-medium mb-1" style={{ color: currentPalette.primary }}>Staggered Animations</h3>
                <p className="text-sm text-gray-600">
                  Elements enter and exit with slight delays between them, creating a choreographed sequence rather than simultaneous movement.
                </p>
              </li>
              <li>
                <h3 className="font-medium mb-1" style={{ color: currentPalette.primary }}>Spatial Relationships</h3>
                <p className="text-sm text-gray-600">
                  Elements maintain consistent spatial relationships, with proper hierarchy and focal points guiding the viewer's attention.
                </p>
              </li>
              <li>
                <h3 className="font-medium mb-1" style={{ color: currentPalette.primary }}>Anticipation & Follow-through</h3>
                <p className="text-sm text-gray-600">
                  Movements include subtle anticipation before action and follow-through after, adding weight and realism to animations.
                </p>
              </li>
              <li>
                <h3 className="font-medium mb-1" style={{ color: currentPalette.primary }}>Composition & Balance</h3>
                <p className="text-sm text-gray-600">
                  Maintain visual balance throughout the animation, with careful attention to negative space and element distribution.
                </p>
              </li>
            </ul>
          </div>
        </Card>
      </div>
      
      <Card>
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Animation Timeline</h2>
        </div>
        <div className="p-4 overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="flex mb-2">
              <div className="w-24 flex-shrink-0"></div>
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="flex-1 text-center text-xs text-gray-500">
                  {i + 1}s
                </div>
              ))}
            </div>
            
            {animationElements.map((element, index) => (
              <div key={element.id} className="flex items-center mb-3">
                <div className="w-24 text-sm font-medium pr-2">{element.name}</div>
                <div className="flex-grow h-8 bg-gray-100 relative">
                  <div 
                    className="absolute h-full rounded-sm"
                    style={{ 
                      left: `${index * 5}%`, 
                      width: `${30 - index * 3}%`, 
                      background: index === 0 ? currentPalette.accent1 : 
                                index === 1 ? currentPalette.accent2 : 
                                index === 2 ? currentPalette.accent3 : 
                                currentPalette.primary,
                      opacity: 0.8
                    }}
                  />
                </div>
              </div>
            ))}
            
            <div className="flex items-center">
              <div className="w-24 text-sm font-medium pr-2">Transitions</div>
              <div className="flex-grow h-8 bg-gray-100 relative">
                <div 
                  className="absolute h-full rounded-sm"
                  style={{ 
                    left: '40%', 
                    width: '30%', 
                    background: currentPalette.secondary,
                    opacity: 0.8
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DesignSystem;